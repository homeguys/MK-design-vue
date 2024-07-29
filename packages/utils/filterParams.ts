/*
 * @Author: wanglei
 * @Date: 2024-07-26 14:09:44
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 14:26:24
 * @FilePath: \packages\utils\filterParams.ts
 * @Descripttion: 将对象中指定的字段过滤掉
 */
interface IObj {
  [key: string]: any;
}

/**
 * @param {object} obj 要过滤字段的对象
 * @param {array} filterKeys 要过滤的字段数组
 * @return {object} 过滤字段之后的对象
 */
const filterParams = (obj: IObj, filterKeys: string[]) => {
  const remainParams: any = {};
  Object.keys(obj).forEach((i) => {
    if (!filterKeys.includes(i)) {
      remainParams[i] = obj[i];
    }
  });

  return remainParams;
};

export default filterParams;
