# 基于Docker+Consul+Registrator+Nodejs实现服务治理（二）

## 前言

基于上一篇[基于Docker+Consul+Registrator+Nodejs实现服务治理（一）](https://github.com/chenchunyong/microservices/blob/master/serviceRegister.md)
我们已经实现服务注册。本篇文章我们着重实现服务发现。

## 服务发现

![services register](images/registerFlow.png?raw=true)

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

示例部署图如下：
![services register](images/serviceFind.png?raw=true)

registratior监控service web，一旦service web 状态发生变化，通知consul cluster做出相应处理，api gateway 订阅consul cluster 的服务，根据负载均衡的策略，把请求转发到对应web处理。 api网关的功能比较丰富，包括路由、认证、降级、熔断等功能，本例仅实现路由功能，其他功能后面有时间会在写文章介绍。

为了验证服务发现机制，api gateway对外提供getRemoteIp方法，用来获取service web的本地ip地址。如果返回不同ip地址即验证服务发现机制已经起作用。

获取service web本地ip的时序图如下：

![getRemoteIp](images/getRemoteIp.png?raw=true)

下面我们开始实现我们的功能。

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
Dockerfile ------ 制作image
docker-compose.yml ------ 服务编排
```

## 具体功能实现

下面会对上面提供的功能点依次进行实现（展示代码中只保留核心代码，详细请见代码）。

### 1. 服务发现

涉及到的js：`discovery.js`。

```js
const Consul = require('consul');
const debug = require('debug')('dev:discovery');
const utils = require('./utils');
const serviceLocalStorage = require('./serviceLocalStorage.js');
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

调用getService获取注册的服务信息，步骤如下：

1. 检查缓存中是否存在，如果存在，则从缓存中获取
2. 如果不存在，则获取最新的服务列表
3. 存储到缓存中
