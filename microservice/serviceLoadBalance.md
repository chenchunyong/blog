# 基于Docker实现服务治理（三）

## 前言

我们已实现了服务的注册与发现。不过目前还存在的问题是：

1. 负载均衡的业务逻辑跟应用层混在一起；
2. 采用客服端实现的方式实现，如果采用java实现，那么还需要开发一套客户端的逻辑，与具体的语言耦合在一起
3. 缓存中的服务列表无法共享，造成每个应用都需要去获取服务列表、监控服务列表的变化。

针对上述存在的问题，引入nginx服务发现机制，在不需要人工干预的情况下，实现nginx动态更新配置。

## nginx服务发现机制

对[基于Docker实现服务治理（二）](https://github.com/chenchunyong/blog/blob/master/microservice/serviceFind.md)中的部署图改造成以下这样：

![loadbalance](../images/newServiceFind.png?raw=true)

registrator来监控每个service web的状态。当有新的service web启动的时候，registrator会把它注册到consul这个注册中心上。由于consul_template已经订阅了该注册中心上的服务消息，此时consul注册中心会将新的service web信息推送给consul_template，consul_template则会去修改nginx.conf的配置文件，然后让nginx重新载入配置以达到自动修改负载均衡的目的。同样当一个service web挂了，registrator也能感知到，进而通知consul做出响应。

整个过程不需要运维人工的干预，自动完成。

## Consul-template 说明

Consul-Template是基于Consul的自动替换配置文件的应用。在Consul-Template没出现之前，大家构建服务发现系统大多采用的是Zookeeper、Etcd+Confd这样类似的系统。

Consul-Template提供了一个便捷的方式从Consul中获取存储的值，Consul-Template守护进程会查询Consul实例来更新系统上指定的任何模板。当更新完成后，模板还可以选择运行一些任意的命令。

使用场景：可以查询Consul中的服务目录、Key、Key-values等。这种强大的抽象功能和查询语言模板可以使Consul-Template特别适合动态的创建配置文件。例如：创建Apache/Nginx Proxy Balancers、Haproxy Backends、Varnish Servers、Application Configurations等。

Consul-Template特性

- Quiescence：Consul-Template内置静止平衡功能，可以智能的发现Consul实例中的更改信息。这个功能可以防止频繁的更新模板而引起系统的波动。
- Dry Mode：不确定当前架构的状态，担心模板的变化会破坏子系统？无须担心。因为Consul-Template还有Dry模式。在Dry模式，Consul-Template会将结果呈现在STDOUT，所以操作员可以检查输出是否正常，以决定更换模板是否安全。
- CLI and Config：Consul-Template同时支持命令行和配置文件。
- Verbose Debugging：即使每件事你都做的近乎完美，但是有时候还是会有失败发生。Consul-Template可以提供更详细的Debug日志信息。

## 示例

根据上述的部署图，对第二篇文章的`docker-compose.yml`改造成以下这样：

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
  # nginx负载均衡
  lb:
    image: windavid/nginx-consul-template:latest
    hostname: lb
    links:
    - consulserver:consul
    ports:
    - "80:80"
    networks:
      - app
networks:
  app:
```

新增了nginx-consul-template的服务配置，其中`lb`中的image的具体配置见：[nginx-consul-template](https://github.com/chenchunyong/docker-nginx-consul-template)。

运行以下命令，启动服务：

```bash
docker-compose up -d --scale serviceweb=3
```

可以看到相关服务已经运行起来了:

![consulloadbalance](../images/consullb1.png?raw=true)

启动服务后，进入`nginx-consul-template`的容器中，运行以下命令，查看当前app.conf的配置。

```bash
cat /etc/nginx/conf.d/app.conf
```

发现定义在[nginx.conf](https://github.com/chenchunyong/docker-nginx-consul-template/blob/master/nginx.conf)
中负载均衡配置的`upstream app`由

```nginx
upstream app {
  {{range service "service-web"}}server {{.Address}}:{{.Port}} max_fails=3 fail_timeout=60 weight=1;
  {{else}}server 127.0.0.1:65535; # force a 502{{end}}
}
```

变成了

```nginx
upstream app {
  server 172.26.0.6:3000 max_fails=3 fail_timeout=60 weight=1;
  server 172.26.0.8:3000 max_fails=3 fail_timeout=60 weight=1;
  server 172.26.0.4:3000 max_fails=3 fail_timeout=60 weight=1;

}
```

upstream的ip与注册到consul的servic-web ip是一致的。
说明nginx的动态配置功能是已经实现了。
下面让我们来验证服务治理的功能。

## 验证功能

### 1.验证服务发现

多次运行以下代码来验证结果：

```bash
curl http://127.0.0.1/getRemoteIp
```

多次运行的结果为以下随机一个：

```json
{"ip":"172.26.0.6"}，
{"ip":"172.26.0.8"},
{"ip":"172.26.0.4"}
```

说明服务发现以及负载均衡的功能验证通过。

### 2. 验证服务下线情况

通过`docker stop` 的方式，下线ip为`172.26.0.8`的`service-web`的服务。

进入`nginx-consul-template`的容器中，运行以下命令，查看当前app.conf的配置。

```bash
cat /etc/nginx/conf.d/app.conf
```

结果如下：

```nginx
upstream app {
  server 172.26.0.6:3000 max_fails=3 fail_timeout=60 weight=1;
  server 172.26.0.4:3000 max_fails=3 fail_timeout=60 weight=1;
}
```

发现ip为`172.26.0.8`的service-web已经从服务列表中删除了。

验证服务下线通知功能通过

## 总结 && 参考

相比client 端的服务发现，nginx实现服务治理对业务的无侵入性、对运维友好性、更符合架构的设计原则的优点。

参考：
[https://www.jianshu.com/p/a4c04a3eeb57](https://www.jianshu.com/p/a4c04a3eeb57)
