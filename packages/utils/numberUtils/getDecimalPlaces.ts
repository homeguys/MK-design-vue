/*
 * @Author: wanglei
 * @Date: 2024-10-29 13:11:42
 * @LastEditors: wanglei
 * @LastEditTime: 2024-10-29 13:23:41
 * @FilePath: \packages\utils\numberUtils\getDecimalPlaces.ts
 * @Descripttion: 获取数字的小数位数
 */
/**
 * @param {number} num 需要计算的小数位数的数字，可以是整数、小数或科学计数法表示的数字
 * @returns {number} 数字的小数位数
 * @example
 * getDecimalPlaces(1.234);      // 返回 3
 * getDecimalPlaces(1.234e-5);   // 返回 8
 * getDecimalPlaces(123);        // 返回 0
 */
function getDecimalPlaces(num: number): number {
  const numStr = num.toString().toLowerCase();
  if (numStr.includes('e')) {
    const [base, exponent] = numStr.split('e');
    const decimalDigits = (base.split('.')[1] || '').length;
    const exponentValue = parseInt(exponent, 10);
    return Math.max(0, decimalDigits - exponentValue);
  }
  return (numStr.split('.')[1] || '').length;
}

export default getDecimalPlaces;
