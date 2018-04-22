# 基于Docker+Consul+Registrator+Nodejs实现服务治理（一）

## 前言

服务治理分为两篇文章，上篇介绍用Docker+Consul+Registrator实现服务注册，下篇介绍使用Nodejs实现服务发现。

## 服务治理

服务治理是微服务中最基础也是最核心的功能。
在刚开始构建微服务的时候，服务并不是特别的多，可以通过静态配置方式来完成服务调用。比如A服务调用B服务某个业务，为了保证B服务的可用性，不管采用服务端负载还是客户端的负载，都需要手动维护B服务的实例的清单。随着业务越来越复杂，功能越来越多，我们的静态配置就会变得越来越难，越来越难维护、扩展。所以需要寻求一种机制，让每个服务能动态的创建地址，同时调用方要能获取到这些信息、且感知地址的动态变化。

为了解决微服务维护实例问题，产生了大量的服务治理框架和产品。这些产品与框架的实现都是围绕**服务注册**与**服务发现机制**来实现服务治理的。

先看整体流程：

![services register](images/registerFlow.png?raw=true)

**注册中心**：每个**服务提供者**向注册中心登记自己提供的服务，将服务名与主机IP、端口等一些附加信息告知服务中心，注册中心按服务名分类组织服务清单。如A服务运行在192.168.1.82:3000，192.168.1.83：3000实例上。那么维护的内容如下：
服务 | 实例
---- | ---
 A服务 | 192.168.1.82:3000，192.168.1.83：3000
同时注册中心也会还会以心跳的方式去检查服务是否可用，如果不可用，则从服务实例中剔除。

**服务消费者**：在微服务的治理框架，服务之间的调用不再通过具体实例地址访问，而是向服务名发起调用实现。如上述例子，在注册中心注册A服务后，访问A服务的的调用方法就变为`http://A服务/xxxx`,通过以下的步骤，在真正发起请求时，把A服务替换为服务实例地址。

1. 服务消费者从服务消费者从订阅注册中心获取A服务所有实例地址；

2. 根据获取的实例地址通过负载均衡（后续有时间会写文章详细说明）的策略获取合适的Ip地址与端口，假设获取到的实例地址为：192.168.1.82:3000；

3. 把A服务地址替换为192.168.1.82:3000。

核心功能已介绍完成，下面我们就开始构建我们的注册中心。

## 技术说明

**Registrator**：一个由Go语言编写的，针对docker使用的，通过检查本机容器进程在线或者停止运行状态，去注册服务的工具。所以我们要做的实验，所有的工具都是在docker上运行的，就是因为**registrator是通过检查docker容器的状态来判断服务状态的，这样就和我们的代码实现完全解耦了，对上层透明化，无感知。** 它有如下特点：

- 通过docker socket直接监听容器event，根据容器启动/停止等event来注册/注销服务；

- 每个容器的每个exposed端口对应不同的服务；

- 支持可插拔的registry backend，默认支持Consul, etcd and SkyDNS；
- 自身也是docker化的，可以容器方式启动；

- 用户可自定义配置，如服务TTL（time-to-live）、服务名称、服务tag等。

**Consul**：采用Go开发的高可用的服务注册与配置服务，具体内容请参考官网：[consul](https://www.consul.io/docs/guides/index.html)，本文的注册中心采用Consul实现。

**Docker**：耳熟能详，不解释。

## 示例

示例中包含3台consul node构成consul cluster，1台registrator监控服务，3台service web 提供服务。
具体架构如下：

![services register](images/serviceRegister.png?raw=true)

利用Registrator来监控每个web server的状态，当有新的service web加入的时候，registator会把service web注册到consul cluster，当web server下线的时，reigstrator也会通知consul cluster下线服务，整个过程自动化的，无须人工干预。

示例环境：
系统：macos；
docker: 17.09.1-ce；
docker-compose:1.17.1。

### 1. 首先搭建consul cluster、Registrator监控

在示例目录下，创建模板文件`docker-compose.yml`，源码见：[docker-compose.consul.yml](https://github.com/chenchunyong/node-service-test-web/blob/master/docker-compose.consul.yml)

```Dockerfile
version: '3.0'

services:
  # consul server，对外暴露的ui接口为8500，可通过ui直接访问consulserver，并且配置在2台consul服务器的情况下集群才起作用
  consulserver:
    image: progrium/consul:latest
    hostname: consulserver
    ports:
      - "8300"
      - "8400"
      - "8500:8500"
      - "53"
    command: -server -ui-dir /ui -data-dir /tmp/consul --bootstrap-expect=2

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
  # 监听容器中暴露的端口，端口发生变化，通知注册中心作出相应处理
  registrator:
    image: gliderlabs/registrator:master
    hostname: registrator
    depends_on:
      - "consulserver"
    volumes:
      - "/var/run/docker.sock:/tmp/docker.sock"
    command: -internal consul://consulserver:8500
```

进入模板目录，运行 `docker-compose up -d` 启动服务。在浏览器输入`http://127.0.0.1:8500/ui/#/dc1/nodes`，可以看到consul server 服务起来了。

![consulUI1](images/consulServiceUI1.png?raw=true)

三台consul server 对应ip分别为：
name | ip
---- | ---
consulserver |172.22.0.2
consulserver1 |172.22.0.5
consulserver2 |172.22.0.4

### 2. 搭建service web服务

创建新的目录，创建`docker-compose.yml`文件，源码见：[docker-compose.web.yml](https://github.com/chenchunyong/node-service-test-web/blob/master/docker-compose.web.yml)

```Dockerfile
version: '3.0'
# 启动node-service-web节点服务
services:
  web:
    image: windavid/node-service-test-web
    environment:
      SERVICE_3000_NAME: service-web
    ports:
      - "3000"
```

image为`windavid/node-service-test-web`是我用nodejs实现，主要功能为获取本地ip地址，加这个功能是为方便后面服务发现测试。代码参考：[app.js](https://github.com/chenchunyong/node-service-test-web/blob/master/app.js)

运行`docker-compose -f docker-compose.web.yml up -d  --scale web=3`启动服务，其中`--scale web=3`表示启动3台服务器，可根据实际情况进行扩展。

此时可以看到3台`service-web`已注册到consul cluster中了。

![consulUI2](images/consulServiceUI2.png?raw=true)

至此我们的服务已经搭建完成，下一步我们简单验证服务注册的功能。

### 3. 验证服务注册功能

#### 验证service-web服务下线情况

1. 找到测试要下线的web，例如我们要下线nodeservicetestweb_web_1。

运行`docker ps`命令，3台service-web信息：
containerId | name
---- | ---| ---
6c7701d39184 |nodeservicetestweb_web_1
f16933416321 |nodeservicetestweb_web_2
bb55908aab39 |nodeservicetestweb_web_3

2. 下线nodeservicetestweb_web_1。

运行`docker stop 6c7701d39184` ，下线nodeservicetestweb_web_1，发现ip为`172.22.0.7`服务器信息已经从consul cluster中移除了 。

![consulUI3](images/consulServiceUI3.png?raw=true)

经过验证，下载服务后，consul cluster会把相应的服务对应的信息移除

#### 验证consul cluster可用性

1. 停止consul cluster主节点，本文中的leader节点为：consulserver。

运行`docker ps`命令，3台consul server对应容器Id以及name：

containerId | name
---- | ---
afaed8bfb66a |nodeservicetestweb_consulserver1_1
8a3b8d25d060 |nodeservicetestweb_consulserver2_1
be9508b34527 |nodeservicetestweb_consulserver_1

运行`docker stop be9508b34527`， ，暂停consulserver（leader）节点后，http://127.0.0.1:8500/ui 已经不能访问了，这是因为我们对外只暴露了consulserver的8500端口，consulserver1，consulserver2没有对外暴露可访问的端口。
虽然通过UI的方式无法查看consul cluster 的状态，不过我们可以进入容器查看集群的状态。

运行`docker logs afaed8bfb66a` 查看日志可得到虽然暂停consulserver服务，但是 consulserver1与consulserver2会进行重新选举，consulserver1被选为主节点。

```shell
    2018/04/20 12:22:50 [INFO] raft: Node at 172.22.0.5:8300 [Leader] entering Leader state
    2018/04/20 12:22:50 [INFO] consul: cluster leadership acquired
    2018/04/20 12:22:50 [INFO] raft: pipelining replication to peer 172.22.0.4:8300
    2018/04/20 12:22:50 [INFO] raft: pipelining replication to peer 172.22.0.2:8300
    2018/04/20 12:22:50 [INFO] consul: New leader elected: consulserver1
```

2. 验证service-web是否是可访问

运行`docker exec -it afaed8bfb66a /bin/bash`进入到consulserver1容器中，查看下service-web注册的服务是否可以用。
在consulserver1容器中运行命令`curl 127.0.0.1:8500/v1/catalog/service/service-web` 发现服务的节点仍然存在。结果如下：

```JSON
[{"Node":"consulserver","Address":"172.22.0.2","ServiceID":"registrator:nodeservicetestweb_web_2:3000","ServiceName":"service-web","ServiceTags":null,"ServiceAddress":"172.22.0.6","ServicePort":3000},{"Node":"consulserver","Address":"172.22.0.2","ServiceID":"registrator:nodeservicetestweb_web_3:3000","ServiceName":"service-web","ServiceTags":null,"ServiceAddress":"172.22.0.8","ServicePort":3000}]
```

经验证consul节点是高可用，不会单个节点问题，而影响集群功能。

## 总结 && 参考

通过上述的示例，我们已经在单机环境下服务注册功能，并验证consul 节点的高可用性。当然本示例比较简单，只是在单机环境下，且不涉及到 consul client的情况。在多机器的环境下配置的其实跟单机差别不是很大，建议大家自己配置。

参考：

[https://www.jianshu.com/p/f8746b81d65d](https://www.jianshu.com/p/f8746b81d65d)
[https://www.jianshu.com/p/a4c04a3eeb57](https://www.jianshu.com/p/a4c04a3eeb57)[https://segmentfault.com/a/1190000007601338](https://segmentfault.com/a/1190000007601338)
[https://blog.csdn.net/socho/article/details/75434733](https://blog.csdn.net/socho/article/details/75434733)
[https://www.consul.io/docs/guides/index.html](https://www.consul.io/docs/guides/index.html)

## 后续

下篇介绍使用Nodejs实现服务发现。