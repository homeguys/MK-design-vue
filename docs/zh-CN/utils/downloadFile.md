<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:43:10
 * @FilePath: \docs\zh-CN\utils\downloadFile.md
 * @Descripttion:
-->

# downloadFile

### 下载文件

可以下载图片、json数据、二进制流数据等

#### 使用

```ts
/**
 * @param {object} content 下载的内容 text、json、blob
 * @param {string} fileName 下载文件名
 * @param {string} contentType 下载类型 （可以用mime-types库查询）
 */
downloadFile(content: any, fileName: string, contentType?: string)
```

#### 例子

```js
// 下载文本文件
downloadFile('Hello, world!', 'hello.txt', 'text/plain');

// 下载JSON文件
const jsonData = { name: 'John', age: 30, city: 'New York' };

downloadFile(JSON.stringify(jsonData), 'data.json', 'application/json');

// 下载二进制流（图片或者接口统计数据等）
axios
  .get('https://img-nj.piesat.cn/static/Frontend/avatar/wl.png', { responseType: 'blob' })
  .then((res) => {
    downloadFile(res.data, '统计.png', 'image/png');
  });
```
