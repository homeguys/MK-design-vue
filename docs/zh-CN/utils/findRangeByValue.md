<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-11 11:02:01
 * @FilePath: \docs\zh-CN\utils\findRangeByValue.md
 * @Descripttion:
-->

# findRangeByValue

### 通过给定的值来查找该值落在哪个区间，一般用于图例查找值的颜色

```
const data = [
  { label: '100', color: '#00E700' },
  { label: '100-200', color: '#FFFE05' },
  { label: '200-300', color: '#FF7D00' },
  { label: '300-400', color: '#FE0000' },
  { label: '400', color: '#81007F' },
];
```

类似这种数组中每一个对象都是一个区间范围，一个区间对应一个颜色或者其他属性，都可以用这个方法找到对应的对象。

#### 使用

```ts
/**
 * @param {object} value 数值
 * @param {string} data 区间范围的数组
 */
findRangeByValue(value: number, data: IData[])
```

#### 例子

```js
const data = [
  { label: '100', color: '#00E700' },
  { label: '100-200', color: '#FFFE05' },
  { label: '200-300', color: '#FF7D00' },
  { label: '300-400', color: '#FE0000' },
  { label: '400', color: '#81007F' },
];

getItemByValue(-100, data);
// => {min: -Infinity, max: 100, label: '100', color: '#00E700'}

getItemByValue(66, data);
// => {min: -Infinity, max: 100, label: '100', color: '#00E700'}

getItemByValue(100, data);
// => {min: 100, max: 200, label: '100-200', color: '#FFFE05'}

getItemByValue(220, data);
// => {min: 200, max: 300, label: '200-300', color: '#FF7D00'}

getItemByValue(400, data);
// => {min: 400, max: Infinity, label: '400', color: '#81007F'}
```
