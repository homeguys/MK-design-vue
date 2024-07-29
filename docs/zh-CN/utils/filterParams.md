<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:42:37
 * @FilePath: \docs\zh-CN\utils\filterParams.md
 * @Descripttion:
-->

# filterParams

### 将对象中指定的字段过滤掉

通过传入字符串数组，将对象中指定的key值过滤掉。

#### 使用

```js
interface IObj{
  [key: string]: any;
}

/**
 * @param {object} obj 要过滤字段的对象
 * @param {array} filterKeys 要过滤的字段数组
 * @return {object} 过滤字段之后的对象
 */
filterParams(obj: IObj, filterKeys: string[])
```

#### 例子

```js
const obj = {
  name: 'wanglei',
  age: 18,
  sex: 'man',
  active: true,
};

const filterKeys = ['sex', 'active'];

filterParams(obj, filterKeys);
// => { name: 'wanglei', age: 18 }
```
