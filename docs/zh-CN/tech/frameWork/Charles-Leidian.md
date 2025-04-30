---
editLink: true
---

# 雷电模拟器 + Charles解决App抓包

<VPAuthor :members="[
    { avatar: 'https://img-nj.piesat.cn/static/Frontend/avatar/wl.png', name: '王磊' }
  ]"
/>

## 背景

大气产品、火情产品以及火情项目有很多apk，比如大气产品、火情产品、长沙火情、郑州火情、赣榆火情等等。在使用过程中经常会有app登陆不上或者其他问题，产品经理、项目经理或者测试都会找过来让定位是什么问题，大多数情况不是前端问题，所以并不想启动本地项目调试。

## 前端定位这些问题大概有这些方式：

1. 安卓手机上安装Charles证书，用Charles查看请求;
2. 本地启动对应项目，本地调试;
3. windows上安装雷电模拟器，配合Charles查看请求。

## 这几种方式都试过：

1. 第一种咱们测试机是小米手机，安装Charles证书有点问题，咱们手头有时也没有安卓机;
2. 第二种工作中经常用的，但是每次都需要本地起项目很麻烦;
3. 最后一种是本次的重点。

## 雷电模拟器 + Charles抓包

### 一、安装Charles并注册

1. 直接去[Charles官网](https://www.charlesproxy.com)下载安装包（当前版本是`4.6.5`）
2. 注册Charles，点击Charles->Help->Registered to弹出如下界面

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/1.png)

输入以下注册码，注册后`重启`就可以解除30天使用限制

```
Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4

charles 激活码在线生成
https://charles.wrbug.com

```

### 二、配置Charles

#### （一）安装证书到本地计算机

1. 点击Charles->Help->SSL Proxying->Install Charles Root Certificate弹出如下界面：

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/2.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/3.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/4.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/5.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/6.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/7.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/8.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/9.png)

#### （二）查看证书

1. 还是选择安装证书

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/10.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/11.png)

:::tip
至此说明证书安装没有问题
:::

#### （三）导出证书

1. 点击Charles->Help->SSL Proxying->Save Charles Root Certificate

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/12.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/13.png)

:::tip
证书生成好备用
:::

#### （四）Charles端口配置

1. Proxy->Proxy Settings，配置如下

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/14.png)

2. 端口自定义，需要socks协议的可以勾选打开

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/15.png)

3. Proxy->SSL Proxying Settings，配置如下

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/16.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/17.png)

4. 两个输入框都输入\*，保存即可

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/18.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/19.png)

:::tip
到此，Charles配置完成，接下来安装和配置雷电模拟器
:::

### 三、安装雷电模拟器

1. 直接去[雷电官网](https://www.ldmnq.com)下载安装包（当前版本是`9.0`）
2. 安装过程不赘述，最后会生成两个图标，我们用雷电模拟器9就行

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/20.png)

3. 这是打开界面，里面装了一下app

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/21.png)

### 四、配置雷电模拟器

#### （一）雷电模拟器基础设置

1. 打开设置

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/22.png)

2. 性能设置 > 磁盘共享 > System.vmdk可写入

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/23.png)

3. 网络设置 > 网络桥接模式 > 开启（此处可能要下载插件并重启）

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/24.png)

4. 其他设置 > 开启ROOT权限和ADB调试

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/25.png)

#### （二）雷电模拟器安装Charles证书

1. 把上面第二大步中的第三小步中Charles中导出的证书安装在雷电模拟器中，直接把证书拖到雷电模拟器中，文件进入雷电的文件系统，双击证书文件，会弹出一下弹出框

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/26.png)

2. 随意输入证书名称

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/27.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/28.png)

#### （三）移动Charles证书到雷电系统根目录

1. 雷电安装好的证书在`/data/misc/user/0/cacerts-added`目录下

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/29.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/30.png)

2. 依次按照`/data/misc/user/0/cacerts-added`目录找进来，就看到本次安装的证书，`.0`后缀的文件

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/31.png)

3. 选中这个文件（雷电里没有复制按钮，`选中`即复制）

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/32.png)

4. 同样的切换到`/system/etc/security/cacerts`目录

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/33.png)

5. 顺着`/system/etc/security/cacerts`路径找进来

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/34.png)

6. 点击左下角的三个点

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/35.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/36.png)

7. 提示操作已完成

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/37.png)

8. 好了到了最后一步配置了

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/38.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/39.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/40.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/41.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/42.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/43.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/44.png)

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/45.png)

:::tip
点击保存，至此所有配置结束
:::

### 五、成功抓到雷电模拟器上安装App的请求

![](https://img-nj.piesat.cn/static/Frontend/blog/mobile/leidianCharles/46.png)
