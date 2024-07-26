/*
 * @Author: wanglei
 * @Date: 2024-07-26 11:17:36
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-26 13:44:22
 * @FilePath: \packages\utils\formatLargeNum.ts
 * @Descripttion:
 */
/**
 * 处理数值过大超长数字
 * @param {number} num 需要处理的数值
 * @param {number} decimal 需要保留的小数位（只有数值是小数才保留）
 * @returns {string | undefined} 处理后的数值 + 单位字符串
 */
function formatLargeNum(num: number, decimal = 2) {
  if (typeof num !== 'number') {
    return undefined;
  }

  // 函数用来判断是否有小数位
  const hasDecimals = (n: number) => n % 1 !== 0;

  // 处理小于千的数值
  if (num <= 1e4) {
    if (hasDecimals(num)) {
      return num.toFixed(decimal);
    }
    return num.toString();
  }

  const units = [
    { value: 1e4, symbol: '万' },
    { value: 1e6, symbol: '百万' },
    { value: 1e7, symbol: '千万' },
    { value: 1e8, symbol: '亿' },
  ];

  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      const formattedNum = num / units[i].value;
      if (hasDecimals(formattedNum)) {
        return formattedNum.toFixed(decimal) + units[i].symbol;
      }
      return formattedNum + units[i].symbol;
    }
  }

  return num.toString();
}

export default formatLargeNum;
