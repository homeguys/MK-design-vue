<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:53:17
 * @FilePath: \docs\zh-CN\utils\treeUtil\modifyTreeKeys.md
 * @Descripttion:
-->

# modifyTreeKeys

### 将对象中指定的字段过滤掉

```js
type TAnyFunction = (...args: any[]) => void;

interface IKeyMapping {
  [originKey: string]: string | TAnyFunction;
}

interface IExtra {
  childrenKey?: string | undefined;
  showOtherParam?: boolean | undefined;
}

/**
 * 批量修改树结构数据key
 * @param {array} dataSource 要修改key的树结构数据
 * @param {object} keyMapping 要过滤的字段
 * {
 *    key: '',    // 为空表示删除某个字段
 *    label: 'value', // 正常重命名原有字段
 *    component: (item) => {}, // 如果是函数，则是新增字段, 根据传入的item自定义值
 *  }
 * @param {object} extra
 * {
 *    childrenKey: 'children', // children的别名
 *    showOtherParam: 'false', // 是否展示其他键值
 *  }
 * @param {boolean} showOtherParam
 */
modifyTreeKeys(
  dataSource: any[],
  keyMapping: IKeyMapping = {},
  extra: IExtra = {
    childrenKey: 'children',
    showOtherParam: false,
  },
)
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

const modifiedTree = modifyTreeKeys(dataSource, keyMapping, { showOtherParam: true });
console.log(JSON.stringify(modifiedTree, null, 2));

/*
[
  {
    "identifier": 1,
    "label": "Root 1",
    "subNodes": [
      {
        "identifier": 2,
        "label": "Child 1-1",
        "subNodes": [
          {
            "identifier": 3,
            "label": "Child 1-1-1"
          },
          {
            "identifier": 4,
            "label": "Child 1-1-2"
          }
        ]
      },
      {
        "identifier": 5,
        "label": "Child 1-2"
      }
    ]
  },
  {
    "identifier": 6,
    "label": "Root 2",
    "subNodes": [
      {
        "identifier": 7,
        "label": "Child 2-1"
      }
    ]
  }
]
*/
```
