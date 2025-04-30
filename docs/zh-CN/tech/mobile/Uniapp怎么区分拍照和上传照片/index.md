---
editLink: true
---

# Uniapp怎么区分拍照和上传照片

<VPAuthor :members="[
    { avatar: 'https://img-nj.piesat.cn/static/Frontend/avatar/wl.png', name: '王磊' }
  ]"
/>

## 背景

在使用Uniapp uni-file-picker组件做图片的拍照或者上传的时候，无法判断用户是拍照上传还是上传了相册的照片，
找来找去官方也没有提供相应api来判断。

## 解决方式

后来通过组件api返回的两种结果如下：

![alt text](image-1.png)

![alt text](image-2.png)

```
那么只能通过`tempFiles`中返回文件的前缀是`file://`还是`_doc/`来判断了，
从相册选择就是开头`file://`，拍照上传就是以`_doc/`开头的链接。
```
