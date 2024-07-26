/*
 * @Author: wanglei
 * @Date: 2024-07-26 13:50:47
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-26 13:51:05
 * @FilePath: \packages\utils\hasChildren.ts
 * @Descripttion: 判断对象中是否有children
 */
/**
 * @param {object} item 要判断的对象
 * @param {string} key children的别名
 * @return {boolean} 是否含有children
 */
const hasChildren = (item: any, key: string = 'children'): boolean => {
  return Array.isArray(item[key]) && item[key].length > 0;
};

export default hasChildren;
