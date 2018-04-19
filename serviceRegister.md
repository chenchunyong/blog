# 基于Docker+Consul+Registrator实现服务自动注册

服务治理是微服务中最基础也是最核心的功能。
在刚开始构建微服务的时候，服务并不是特别的多，可以通过静态配置方式来完成服务调用。比如A服务调用B服务某个业务，为了保证B服务的可用性，不管采用服务端负载还是客户端的负载，都需要手动维护B服务的实例的清单。随着业务越来越复杂，功能越来越多，我们的静态配置就会变得越来越难，越来越难维护、扩展。所以需要寻求一种机制，让每个服务能动态的创建地址，同时调用方要能获取到这些信息、且感知地址的动态变化。

为了解决微服务维护实例问题，产生了大量的服务治理框架和产品。这些产品与框架的实现都是围绕**服务注册**与**服务发现机制**来实现服务治理的。

本文采用了Docker+Consul+Registrator来实现**服务注册**，Nodejs实现**服务发现**（下篇文章介绍）。

先看整体流程：

![services register](images/registerFlow.png?raw=true)

**注册中心**：每个**服务提供者**向注册中心登记自己提供的服务，将服务名与主机IP、端口等一些附加信息告知服务中心，注册中心按服务名分类组织服务清单。如A服务运行在192.168.1.82:3000，192.168.1.83：3000实例上。那么维护的内容如下：
服务 | 实例
---- | ---
 A服务 | 192.168.1.82:3000，192.168.1.83：3000
同时注册中心也会还会以心跳的方式去检查服务是否可用，如果不可用，则从服务实例中剔除。

**服务消费者**：在微服务的治理框架，服务之间的调用不再通过具体的实例地址访问，而是向服务名发起调用实现。如上述例子，在注册中心注册A服务后，访问A服务的的调用方法就变为`http://A服务/xxxx`,通过以下的步骤，在真正发起请求时，把A服务替换为服务实例地址。

1. 服务消费者从服务消费者从订阅注册中心获取A服务所有实例地址

2. 根据获取的实例地址通过负载均衡（后续有时间会写文章详细说明）的策略获取合适的Ip地址与端口，假设获取到的实例地址为：192.168.1.82:3000

3. 把A服务地址替换为192.168.1.82:3000

## 技术说明

**Registrator**：一个由Go语言编写的，针对docker使用的，通过检查本机容器进程在线或者停止运行状态，去注册服务的工具。所以我们要做的实验，所有的工具都是在docker上运行的，就是因为**registrator是通过检查docker容器的状态来判断服务状态的，这样就和我们的代码实现完全解耦了，对上层透明化，无感知。** 它有如下特点：

- 通过docker socket直接监听容器event，根据容器启动/停止等event来注册/注销服务

- 每个容器的每个exposed端口对应不同的服务

- 支持可插拔的registry backend，默认支持Consul, etcd and SkyDNS
- 自身也是docker化的，可以容器方式启动

- 用户可自定义配置，如服务TTL（time-to-live）、服务名称、服务tag等

**Consul**：采用Go开发的高可用的服务注册与配置服务，本文的注册中心采用Consul实现

**Docker**：耳熟能详，不解释

## 服务注册

本文服务注册的架构如下：

![services register](images/serviceRegister.png?raw=true)

利用Registrator来监控每个web server的状态，当有新的service web加入的时候，registator会把service web注册到注册中心，当web server下线的时，reigstrator也会通知注册中心下线服务，整个过程自动化的，无须人工干预。

## 单机示例

示例环境：
系统：macos
docker: 17.09.1-ce
docker-compose:1.17.1

### 1. 搭建consul集群、Registrator监控

随便找个目录，创建模板文件`docker-compose.yml`

```Dockerfile
version: '3.0'

services:
  # consul server，对外暴露的ui接口为8500，只有在3台consul服务器的情况下集群才起作用
  consulserver:
    image: progrium/consul:latest
    hostname: consulserver
    ports:
      - "8300"
      - "8400"
      - "8500:8500"
      - "53"
    command: -server -ui-dir /ui -data-dir /tmp/consul --bootstrap-expect=3

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
  # 监听容器中暴露的端口，一定有新的端口，注册到注册中心
  registrator:
    image: gliderlabs/registrator:master
    hostname: registrator
    depends_on: 
      - "consulserver"
    volumes:
      - "/var/run/docker.sock:/tmp/docker.sock"
    command: -internal consul://consulserver:8500





```