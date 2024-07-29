<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:51:48
 * @FilePath: \docs\zh-CN\utils\treeUtil\flatTree.md
 * @Descripttion:
-->

# flatTree

### 扁平化树结构

将多维数组拉平成一维数组，便于循环遍历。

#### 使用

```js
/**
 * @param {array} dataSource 树形结构数据源
 * @param {number} childList 字节点数组
 * @returns {array} 扁平化后的leaf节点数据
 */
flatTree(dataSource: any[] = [], childList: any[] = [])
```

#### 例子

```js
const dataSource = [
  {
    id: 1,
    name: 'Root 1',
    children: [
      {
        id: 2,
        name: 'Child 1-1',
        children: [
          {
            id: 3,
            name: 'Child 1-1-1',
          },
          {
            id: 4,
            name: 'Child 1-1-2',
          },
        ],
      },
      {
        id: 5,
        name: 'Child 1-2',
      },
    ],
  },
  {
    id: 6,
    name: 'Root 2',
    children: [
      {
        id: 7,
        name: 'Child 2-1',
      },
    ],
  },
];

const flatList = flatTree(dataSource);
console.log(flatList);

// =>
// [
//   { id: 1, name: 'Root 1', children: [ [Object], [Object] ] },
//   { id: 2, name: 'Child 1-1', children: [ [Object], [Object] ] },
//   { id: 3, name: 'Child 1-1-1' },
//   { id: 4, name: 'Child 1-1-2' },
//   { id: 5, name: 'Child 1-2' },
//   { id: 6, name: 'Root 2', children: [ [Object] ] },
//   { id: 7, name: 'Child 2-1' }
// ]
```
