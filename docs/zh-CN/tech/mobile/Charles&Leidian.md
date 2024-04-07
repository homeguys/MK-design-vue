---
editLink: true
---

# 雷电模拟器 + Charles解决App抓包

## 背景

大气产品、火情产品以及火情项目有很多apk，比如大气产品、火情产品、长沙火情、郑州火情、赣榆火情等等。在使用过程中经常会有app登陆不上或者其他问题，产品经理、项目经理或者测试都会找过来让定位是什么问题，大多数情况不是前端问题，所以并不想启动本地项目调试。

## 前端怎么定位这写问题大概有这些方式：

1. 安卓手机上安装Charles证书，用Charles查看请求，
2. 本地启动对应项目，本地调试，
3. windows上安装雷电模拟器，配合Charles查看请求。

## 这几种方式都试过：

1. 第一种咱们测试机是小米手机，安装Charles证书有点问题，咱们手头有时也没有安卓机，
2. 第二种工作中经常用的，但是每次都需要本地起项目很麻烦，
3. 最后一种是本次的重点。

## 雷电模拟器 + Charles抓包

### 一、安装Charles并注册

1. 直接去[Charles官网](https://www.charlesproxy.com)下载安装包（当前版本是`4.6.5`）
2. 注册Charles，点击Charles->Help->Registered to弹出如下界面

![](./images/1.png)

输入以下注册码，注册后`重启`就可以解除30天使用限制

```js
Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4

charles 激活码在线生成
https://charles.wrbug.com

```

### 二、配置Charles

#### （一）安装证书到本地计算机

1. 点击Charles->Help->SSL Proxying->Install Charles Root Certificate弹出如下界面：

![](./images/2.png)

![](./images/3.png)

![](./images/4.png)

![](./images/5.png)

![](./images/6.png)

![](./images/7.png)

![](./images/8.png)

![](./images/9.png)

#### （二）查看证书

1. 还是选择安装证书

![](./images/10.png)

![](./images/11.png)

:::tip
至此说明证书安装没有问题
:::

#### （三）导出证书

1. 点击Charles->Help->SSL Proxying->Save Charles Root Certificate

![](./images/12.png)

![](./images/13.png)

:::tip
证书生成好备用
:::

#### （四）Charles端口配置

1. Proxy->Proxy Settings，配置如下，端口号自定义

![](./images/14.png)

2. 端口自定义，需要socks协议的可以勾选打开

![](./images/15.png)

3. Proxy->SSL Proxying Settings，配置如下，端口号自定义

![](./images/16.png)

![](./images/17.png)

4. 两个输入框都输入\*，保存即可

![](./images/18.png)

![](./images/19.png)

:::tip
到此，Charles配置完成，接下来安装和配置雷电模拟器
:::

### 三、安装雷电模拟器

1. 直接去[雷电官网](https://www.ldmnq.com)下载安装包（当前版本是`9.0`）
2. 安装过程不赘述，最后会生成两个图标，我们用雷电模拟器9就行

![](./images/20.png)

3. 这是打开界面，里面装了一下app

![](./images/21.png)

### 四、配置雷电模拟器

#### （一）雷电模拟器基础设置

1. 打开设置

![](./images/22.png)

2. 性能设置 > 磁盘共享 > System.vmdk可写入

![](./images/23.png)

3. 网络设置 > 网络桥接模式 > 开启（此处可能要下载插件并重启）

![](./images/24.png)

4. 其他设置 > 开启ROOT权限和ADB调试

![](./images/25.png)

#### （二）雷电模拟器安装Charles证书

1. 把上面第二大步中的第三小步中Charles中导出的证书安装在雷电模拟器中，直接把证书拖到雷电模拟器中，文件进入雷电的文件系统，双击证书文件，会弹出一下弹出框

![](./images/26.png)

2. 随意输入证书名称

![](./images/27.png)

![](./images/28.png)

#### （三）移动Charles证书到雷电系统根目录

1. 雷电安装好的证书在`/data/misc/user/0/cacerts-added`目录下

![](./images/29.png)

![](./images/30.png)

2. 依次按照`/data/misc/user/0/cacerts-added`目录找进来，就看到本次安装的证书，`.0`后缀的文件

![](./images/31.png)

3. 选中这个文件（雷电里没有复制按钮，`选中`即复制）

![](./images/32.png)

4. 同样的切换到`/system/etc/security/cacerts`目录

![](./images/33.png)

5. 顺着`/system/etc/security/cacerts`路径找进来

![](./images/34.png)

6. 点击左下角的三个点

![](./images/35.png)

![](./images/36.png)

7. 提示操作已完成

![](./images/37.png)

8. 好了到了最后一步配置了

![](./images/38.png)

![](./images/39.png)

![](./images/40.png)

![](./images/41.png)

![](./images/42.png)

![](./images/43.png)

![](./images/44.png)

![](./images/45.png)

:::tip
点击保存之后至此，所有配置结束
:::

### 五、成功抓到雷电模拟器上安装App的请求

![](./images/46.png)
