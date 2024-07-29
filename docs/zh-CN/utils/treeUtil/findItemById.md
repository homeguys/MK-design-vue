<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:51:22
 * @FilePath: \docs\zh-CN\utils\treeUtil\findItemById.md
 * @Descripttion:
-->

# findItemById

### 根据ID查找树结构节点

根据传入的子节点id，查找树结构中该节点的对象信息

#### 使用

```js
/**
 * @param {array} dataSource 树形结构数据源
 * @param {number | string} id 子节点ID
 * @param {string} key id别名
 * @returns {object} 查找到的节点
 */
findItemById(dataSource: any[] = [], id: string | number = '', key = 'id')
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

const targetId = 4;
const foundItem = findItemById(dataSource, targetId);

console.log(foundItem);
// => { id: 4, name: 'Child 1-1-2' }
```
