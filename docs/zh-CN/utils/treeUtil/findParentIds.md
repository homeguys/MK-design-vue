<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:48:32
 * @FilePath: \docs\zh-CN\utils\treeUtil\findParentIds.md
 * @Descripttion:
-->

# findParentIds

### 根据树子节点ID查找所有父节点ID

根据传入的子节点id，查找上级到顶级所有的id，返回的数组顺序按照从下往上冒泡的顺序排列。

#### 使用

```js
/**
 * @param {array} dataSource 树形结构数据源
 * @param {number | string} id 子节点ID
 * @param {string} key id别名
 * @returns {array} 包含所有父节点ID的数组，按照从根节点到直接父节点的顺序排序
 */
findParentIds(dataSource: any[] = [], id: string | number = '', key = 'id')
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
const parentIds = findParentIds(dataSource, targetId);

console.log(parentIds);
// => [2, 1]
```
