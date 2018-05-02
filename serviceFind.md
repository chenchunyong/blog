# 基于Docker+Consul+Registrator+Nodejs实现服务治理（二）

## 前言

基于上一篇[基于Docker+Consul+Registrator+Nodejs实现服务治理（一）](https://github.com/chenchunyong/microservices/blob/master/serviceRegister.md)
我们已经实现服务注册。本篇文章我们着重实现服务发现。

## 服务发现

![services register](images/registerFlow.png?raw=true)

根据上篇的流程图，服务发现实现的功能包括：

- 服务订阅
  - 动态获取服务列表
  - 获取服务节点信息（IP、Port）

- 本地缓存
  - 缓存服务路由表
- 服务调用
  - 服务请求的负载均衡策略
- 变更通知
  - 监听服务节点变化
  - 更新服务路由表

## 示例

本示例的整体流程图如下：

![services register](images/serviceFind.png?raw=true)

registratior监控service web，一旦service web 状态发生变化，通知consul cluster做出相应处理，api gateway 订阅consul cluster 的服务，根据负载均衡的策略，把请求转发到对应web处理。 api网关的功能比较丰富，包括路由、认证、降级、熔断等功能，