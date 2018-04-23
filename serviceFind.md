# 基于Docker+Consul+Registrator+Nodejs实现服务治理（二）

## 前言

![services register](images/registerFlow.png?raw=true)

基于上一篇[基于Docker+Consul+Registrator+Nodejs实现服务治理（一）](https://github.com/chenchunyong/microservices/blob/master/serviceRegister.md)
我们已经实现服务注册。本篇文章我们实现服务发现。

主要的功能点包括：

- 服务订阅
  - 动态获取服务列表
  - 获取服务节点信息（IP、Port）

- 本地缓存
  - 缓存服务路由表
- 服务调用
  - 服务请求的负载均衡策略
  - 反向代理
- 变更通知
  - 监听服务节点变化
  - 更新服务路由表

## 示例

本示例的整体流程图如下：

![services register](images/serviceFind.png?raw=true)

registratior监控service web，一旦service web 状态发生变化，通知consul cluster做出相应处理，service gateway 订阅consul cluster 的服务，根据负载均衡的策略，把请求转发到对应web处理。 service gateway充当了api网关的角色，当然api网关的功能不仅仅局限于路由机制。

