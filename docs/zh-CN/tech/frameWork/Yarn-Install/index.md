---
editLink: true
---

# 使用Yarn安装依赖时遇到的问题

<VPAuthor :members="[
    { avatar: 'https://img-nj.piesat.cn/static/Frontend/avatar/wl.png', name: '王磊' }
  ]"
/>

## 问题一：yarn install时提示证书过期

![alt text](image.png)

### 问题原因

证书过期应该有两种情况：

1. **依赖包的服务器证书过期：**

   当你运行 yarn 安装依赖时，yarn 需要连接到多个服务器。这些服务器可能托管你项目的依赖包,某些依赖包可能来自不同的注册表或镜像。如果其中某个服务器的证书过期了，yarn 会抛出这个错误。

2. **镜像服务器或代理的证书过期：**

   如果你在 .yarnrc 或 .npmrc 中配置了镜像服务器，或者你公司使用了代理服务器，这些服务的证书也可能过期，导致无法成功连接

### 解决方式

禁用 yarn 对 https 证书的严格校验

```
yarn config set strict-ssl false
```

## 问题二：yarn install时提示完整性校验失败

![alt text](image-1.png)

### 问题原因

这个完整性校验是yarn特有的，用npm是不会报这种错的。

1. **镜像源不一致：**

   yarn.lock中安装依赖的源地址和你现在安装用的源地址不一样，导致依赖的哈希值不匹配。比如lock文件中使用的是npm的源，你本次用的是淘宝的镜像源。还有一种情况就是私服镜像源安装也是同样的道理。

2. **缓存损坏：**

   如果yarn缓存损坏的包，那正确安装就会导致完整性校验失败。

### 解决方式

1. 先清除yarn的缓存

```
yarn cache clean
```

2. 如果校验和与其包的校验和不匹配，则更新yarn.lock文件中的校验和

```
yarn install --update-checksums
```
