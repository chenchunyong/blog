# 基于Docker+Consul+Registrator+Nodejs实现服务治理（二）

## 前言

基于上一篇[基于Docker+Consul+Registrator+Nodejs实现服务治理（一）](https://github.com/chenchunyong/blog/blob/master/microservice/serviceRegister.md)
我们已经实现服务注册，本篇文章我们着重实现服务发现。

## 服务发现

![services register](../images/registerFlow.png?raw=true)

根据上篇的流程图，服务发现功能包括：

- 服务订阅
  - 动态获取服务列表
- 本地缓存
  - 缓存服务路由表
- 服务调用
  - 服务请求的负载均衡策略
- 变更通知
  - 监听服务节点变化
  - 更新服务路由表

## 示例

为了验证服务发现机制，api gateway对外提供`getRemoteIp`方法，用来获取service web的本地ip地址，获取service web的ip的作用有两个：

1. 成功返回ip地址，则验证服务发现起作用
2. 多次请求返回不同的ip地址，则验证api gateway 负载均衡起作用

先看示例部署图如下：

![services register](../images/serviceFind.png?raw=true)

registratior监控service web，一旦service web 状态发生变化，通知consul cluster做出相应处理，api gateway 订阅consul cluster 的服务，根据负载均衡的策略，把请求转发到对应web处理。

获取service web本地ip的时序图如下：

![getRemoteIp](../images/getRemoteIp.png?raw=true)

下面我们开始实现我们的功能。

### 源码代码地址与目录

源码地址： [gateway-test](https://github.com/chenchunyong/gateway-test)
目录如下：

```js
app.js ------ app启动入口，
discovery.js ------ 服务发现
router.js ------ 暴露getRemoteIp方法
serviceLocalStorage.js ------ 缓存服务地址
watch.js  ------ 监控注册中心的service 是否发生变化
startWatch.js ------ 启动监控，如果发生变化，则通知缓存更新service列表
Dockerfile ------ 制作docker image
docker-compose.yml ------ 服务编排
```

## 具体功能实现

下面会对上面提供的功能点依次进行实现（展示代码中只保留核心代码，详细请见代码）。

### 1. 服务发现，缓存服务地址

服务发现`discovery.js`，代码如下：

```js
class Discovery {
    connect(...args) {
        if (!this.consul) {
            debug(`与consul server连接中...`);
            //建立连接，
            //需要注意的时，由于需要动态获取docker内的consul server的地址，
            //所以host需要配置为consulserver（来自docker-compose配置的consulserver）
            //发起请求时会经过docker内置的dns server，即可把consulserver替换为具体的consul 服务器 ip
            this.consul =new Consul({
                host:'consulserver',
                ...args,
                promisify: utils.fromCallback //转化为promise类型
            });
        }
        return this;
    }
    /**
     * 根据名称获取服务
     * @param {*} opts
     */
    async getService(opts) {
        if (!this.consul) {
            throw new Error('请先用connect方法进行连接');
        }
        const {service} = opts;
        // 从缓存中获取列表
        const services = serviceLocalStorage.getItem(service);
        if (services.length > 0) {
            debug(`命中缓存，key:${service},value:${JSON.stringify(services)}`);
            return services;
        }
        //如果缓存不存在，则获取远程数据
        let result = await this
            .consul
            .catalog
            .service
            .nodes(opts);
        debug(`获取服务端数据，key：${service}：value:${JSON.stringify(result[0])}`);
        serviceLocalStorage.setItem(service, result[0])
        return result[0];
    }
}
```

调用`getService`获取注册服务信息，步骤如下：

1. 检查缓存中是否存在，如果存在，则从缓存中获取
2. 如果不存在，则获取最新的服务列表
3. 存储到缓存中

### 2. 变更通知 && 更新本地服务列表

监听服务节点，一旦发生变化，立即通知对应的订阅者，更新本地服务列表。

监听服务节点`watch.js`代码:

```js
class Watch {
    /**
     * 监控需要的服务
     * @param {*} services
     * @param {*} onChanged
     */
    watch(services, onChanged) {
        const consul = this.consul;
        if (services === undefined) {
            throw new Error('service 不能为空')
        }
        if (typeof services === 'string') {
            serviceWatch(services);
        } else if (services instanceof Array) {
            services.forEach(service => {
                serviceWatch(service);
            });
        }
        function serviceWatch(service) {
            const watch = consul.watch({method: consul.catalog.service.nodes, options: {
                    service
                }});
            watch.on('change', data => {
                const result = {
                    name: service,
                    data
                };
                debug(`监听${service}内容有变化：${JSON.stringify(result)}`);
                onChanged(null, result);
            });
            watch.on('error', error => {
                debug(`监听${service}错误,错误的内容为：${error}`);
                onChanged(error, null);
            });
        }
        return this;
    }
}
```

由于nodejs是单线程的，需要额外启动一个子进程来监听服务的变化，一旦服务列表有变化，则把服务列表更新到缓存中，请看`app.js`:

```js
const Application = require('koa');
const app = new Application();
const debug = require('debug');
const appDebug = debug('dev:app');
const forkDebug = debug('dev:workerProcess');
const child_process = require('child_process');
const router = require('./router');
const serviceLocalStorage = require('./serviceLocalStorage.js');
//监听3000端口
app.listen(3000, '0.0.0.0',() => {
    appDebug('Server running at 3000');
});
app
    .use(router.routes())
    .use(router.allowedMethods);

// fork一个子进程，用于监听服务节点变化
const workerProcess = child_process.fork('./startWatch.js');

// 子进程退出
workerProcess.on('exit', function (code) {
    forkDebug(`子进程已退出，退出码：${code}`);
});
workerProcess.on('error', function (error) {
    forkDebug(`error: ${error}`);
});

// 接收变化的服务列表，并更新到缓存中
workerProcess.on('message', msg => {
    if (msg) {
        appDebug(`从监控中数据变化：${JSON.stringify(msg)}`);
        //更新缓存中服务列表
        serviceLocalStorage.setItem(msg.name, msg.data);
    }
});

```

发送变更的服务列表给主进程，涉及到的代码`startWatch.js`:

```js
const watch = require('./watch');

// 监听服务节点，如果发现变化，则通知主进程的服务列表进行更新
watch.connect().watch(['service-web'],(error,data)=>{
   process.send(data);
});
```

### 3. 服务调用

结合前面说的服务发现，我们来看服务是如何被调用的，涉及到的代码`router.js`：

```js

router.get('/service-web/getRemoteIp', async(ctx, next) => {
    //获取具体ip信息
    const host = await getServiceHost('service-web');
    const fetchUrl = `http://${host}/getRemoteIp`;
    const result = await request.get(fetchUrl);
    debug(`getRemoteIp:${result.text}`);
    ctx.body = result.text;
});

/**
 * 根据service name 获取 service 对应host
 */
async function getServiceHost(name) {
    //根据服务名称获取注册的服务信息，如果缓存中存在，则从缓存中获取，如果不存在则获取数据
    const services = await discovery.getService({service: name});
    random = Math.floor(Math.random() * (services.length));
    //定义随机数，随机获取ip的负载均衡策略
    const host = services[random];
    debug(`service host ${services[random]}`)
    return host;
}
```

## 部署服务

根据前面提供部署图，完整的`docker-compose.yml`代码如下：

```Dockerfile

version: '3.0'

services:
  # consul server，对外暴露的ui接口为8500，只有在2台consul服务器的情况下集群才起作用
  consulserver:
    image: progrium/consul:latest
    hostname: consulserver
    ports:
      - "8300"
      - "8400"
      - "8500:8500"
      - "53"
    command: -server -ui-dir /ui -data-dir /tmp/consul --bootstrap-expect=2
    networks:
      - app

  # consul server1在consul server服务起来后，加入集群中
  consulserver1:
    image: progrium/consul:latest
    hostname: consulserver1
    depends_on:
      - "consulserver"
    ports:
      - "8300"
      - "8400"
      - "8500"
      - "53"
    command: -server -data-dir /tmp/consul -join consulserver
    networks:
      - app
  # consul server2在consul server服务起来后，加入集群中
  consulserver2:
    image: progrium/consul:latest
    hostname: consulserver2
    depends_on:
      - "consulserver"
    ports:
      - "8300"
      - "8400"
      - "8500"
      - "53"
    command: -server -data-dir /tmp/consul -join consulserver
    networks:
      - app
  # 监听容器中暴露的端口，一定有新的端口，注册到注册中心
  registrator:
    image: gliderlabs/registrator:master
    hostname: registrator
    depends_on:
      - "consulserver"
    volumes:
      - "/var/run/docker.sock:/tmp/docker.sock"
    command: -internal consul://consulserver:8500
    networks:
      - app
  serviceweb:
    image: windavid/node-service-test-web
    depends_on:
      - "consulserver"
    environment:
      SERVICE_3000_NAME: service-web
    ports:
      - "3000"
    networks:
      - app
  # app gatway 暴露对外访问3000端口
  gateway:
    image: windavid/gateway-test
    hostname: gateway
    ports:
      - "3000:3000"
    networks:
      - app
networks:
  app:
```

运行以下命令，启动服务：

```shell
docker-compose up -d --scale serviceweb=3
```

## 验证服务功能

启动服务后，我们在注册中心发现service-web 对应的服务器ip分别为：
172.21.0.6，172.21.0.7，172.21.0.9。

### 1. 验证服务发现

如前面时序图所述，api gateway对外暴露`/service-web/getRemoteIp`来获取本地ip信息。

多次运行以下代码来验证结果：

```bash
curl http://127.0.0.1:3000/service-web/getRemoteIp
```

多次运行的结果为以下随机一个：

```json
{"ip":"172.21.0.6"}，{"ip":"172.21.0.7"},{"ip":"172.21.0.9"}
```

说明服务发现以及负载均衡的功能验证通过。

### 2. 验证服务通知功能

下线某个service-web服务后，查看gateway-test日志：

```js
dev:watch 监听service-web内容有变化：{"name":"service-web","data":[{"Node":"consulserver","Address":"172.21.0.2","ServiceID":"registrator:gatewaytest_serviceweb_1:3000","ServiceName":"service-web","ServiceTags":null,"ServiceAddress":"172.21.0.7","ServicePort":3000},{"Node":"consulserver","Address":"172.21.0.2","ServiceID":"registrator:gatewaytest_serviceweb_3:3000","ServiceName":"service-web","ServiceTags":null,"ServiceAddress":"172.21.0.6","ServicePort":3000}]}
```

发现ip为172.21.0.9的服务已经下线，且通知到订阅者。

## 总结 && 参考

到此为止，我们已实现了服务的注册与发现。下篇我们介绍分布式服务中的服务跟踪。

参考：

- [https://www.consul.io/docs/guides/index.html](https://www.consul.io/docs/guides/index.html)
