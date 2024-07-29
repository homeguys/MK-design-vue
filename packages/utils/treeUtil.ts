/*
 * @Author: wanglei
 * @Date: 2024-04-28 15:43:23
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 16:52:57
 * @FilePath: \packages\utils\treeUtil.ts
 * @Descripttion:
 */
import { hasChildren, filterParams } from './index';

/**
 * 根据树子节点ID查找所有父节点ID
 * @param {array} dataSource 树形结构数据源
 * @param {number | string} id 子节点ID
 * @param {string} key id别名
 * @returns {array} 包含所有父节点ID的数组，按照从根节点到直接父节点的顺序排序
 */
function findParentIds(dataSource: any[] = [], id: string | number = '', key = 'id') {
  const parentIds: (string | number)[] = [];

  function traverse(item: any, itemId: string | number) {
    if (item[key] === itemId) {
      return true;
    }

    if (item.children) {
      for (const childNode of item.children) {
        if (traverse(childNode, itemId)) {
          parentIds.push(item[key]);
          return true;
        }
      }
    }

    return false;
  }

  for (const item of dataSource) {
    if (traverse(item, id)) {
      break;
    }
  }

  return parentIds;
}

/**
 * 根据ID查找树结构节点
 * @param {array} dataSource 树形结构数据源
 * @param {number | string} id 子节点ID
 * @param {string} key id别名
 * @returns {object} 查找到的节点
 */
function findItemById(dataSource: any[] = [], id: string | number = '', key = 'id') {
  for (const item of dataSource) {
    if (item[key] === id) {
      return item;
    }
    if (item.children) {
      const childItem: any = findItemById(item.children, id, key);
      if (childItem) {
        return childItem;
      }
    }
  }
  return null;
}

/**
 * 扁平化树结构
 * @param {array} dataSource 树形结构数据源
 * @param {number} childList 字节点数组
 * @returns {array} 扁平化后的leaf节点数据
 */
const flatTree = (dataSource: any[] = [], childList: any[] = []) => {
  const flatList: any[] = childList;

  dataSource.forEach((item: any) => {
    flatList.push(item);

    if (item.children && item.children.length) {
      flatTree(item.children, flatList);
    }
  });

  return flatList;
};

// eslint-disable-next-line no-unused-vars
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
const modifyTreeKeys = (
  dataSource: any[],
  keyMapping: IKeyMapping = {},
  extra: IExtra = {
    childrenKey: 'children',
    showOtherParam: false,
  },
) => {
  const { childrenKey = 'children', showOtherParam = false } = extra || {};
  const getTreeData = (item: any) => {
    const changedTree: any = {};

    Object.entries(keyMapping).forEach((ele) => {
      const [oldKey, newKey] = ele || [];

      if (typeof newKey === 'function') {
        changedTree[oldKey] = newKey(item);
      } else if (newKey && item[oldKey]) {
        changedTree[newKey] = item[oldKey];
      }
    });

    if (showOtherParam) {
      const modifyKeys = Object.keys(keyMapping);
      const remainParams = filterParams(item, modifyKeys);
      Object.assign(changedTree, remainParams);
    }

    if (hasChildren(item, childrenKey)) {
      const hasChildField = Object.prototype.hasOwnProperty.call(keyMapping, childrenKey);
      const childrenApplyKey = hasChildField ? keyMapping[childrenKey] : childrenKey;

      if (typeof childrenApplyKey === 'string') {
        changedTree[childrenApplyKey] = item[childrenKey].map((i: any) => getTreeData(i));
      }
    }

    return changedTree;
  };

  return dataSource.map((item: any) => getTreeData(item));
};

const getRouterTree = (dataSource: any[]) => {
  // const getTreeData = (item: any) => {
  //   const { menuName, routeUrl, meta } = item || {};
  //   let parsedMeta: any = {};
  //   try {
  //     parsedMeta = meta ? JSON.parse(meta) : {};
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.warn(error);
  //   }
  //   const changedTree: any = {
  //     name: menuName,
  //     path: routeUrl,
  //     meta: parsedMeta,
  //     component: () => import(`*${routeUrl}/index.vue`),
  //   };
  //   if (parsedMeta.redirect) {
  //     changedTree.redirect = parsedMeta.redirect;
  //   }
  //   if (hasChildren(item)) {
  //     changedTree.children = item.children.map((i: any) => getTreeData(i));
  //   }
  //   return changedTree;
  // };
  // return dataSource.map((item: any) => getTreeData(item));
};

export default { findParentIds, findItemById, flatTree, modifyTreeKeys, getRouterTree };
