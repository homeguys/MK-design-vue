---
editLink: true
---

# Git使用中的常见问题

<VPAuthor :members="[
    { avatar: 'https://img-nj.piesat.cn/static/Frontend/avatar/wl.png', name: '王磊' }
  ]"
/>

## 问题一：git项目重新set-url后切换分支提示没有获取到这个引用

![alt text](image.png)

### 问题原因

项目仓库地址改变，由ssh方式改成https方式

### 解决方式

先切换到master分支，然后删除除了master之外的所有分支，然后重新checkout分支

```
git checkout master && git branch | grep -v "master" | xargs git branch -D
```

## 问题二：git提交代码失败，error: RPC failed

### 问题原因

```
Git报错: error: RPC failed； curl 56 HTTP/2 stream 5 was reset；
send-pack: unexpected disconnect
```

### 解决方式

1. 先按照博客调整一下,[博客地址](https://blog.csdn.net/weixin_44817884/article/details/135487775)

2. 如果还是不行的话，就降低git版本

```
从2.41->2.27
```

## 问题三：git忽略大小写

### 问题原因

修改文件夹大小写之后，被认为是同一个文件

### 解决方式

需要关闭git默认的忽略文件大小写，否则修改文件大小写后，被认为是同一个文件。

```
git config core.ignorecase false
```
