/*
 * @Author: wanglei
 * @Date: 2024-10-29 13:11:42
 * @LastEditors: wanglei
 * @LastEditTime: 2024-10-29 13:58:32
 * @FilePath: \packages\utils\numberUtils\perciseNum.ts
 * @Descripttion: 处理数字的库 Math.js | decimal.js | big.js
 */
import getDecimalPlaces from './getDecimalPlaces';

/**
 * 精确加法函数
 *
 * 该函数通过将两个数字的精度标准化来避免浮点数运算中的误差。
 *
 * @param {number} a 第一个加数，可以是整数或小数
 * @param {number} b 第二个加数，可以是整数或小数
 * @returns {number} 两个数字的精确和
 *
 * @example
 * preciseAdd(0.1, 0.2); // 返回 0.3
 * preciseAdd(1.234, 2.456); // 返回 3.69
 */
function preciseAdd(a: number, b: number): number {
  const factor = 10 ** Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
  return (a * factor + b * factor) / factor;
}

/**
 * 精确减法函数
 *
 * 该函数通过将两个数字的精度标准化来避免浮点数运算中的误差。
 *
 * @param {number} a 被减数，可以是整数或小数
 * @param {number} b 减数，可以是整数或小数
 * @returns {number} 被减数和减数的精确差
 *
 * @example
 * preciseSubtract(0.3, 0.1); // 返回 0.2
 * preciseSubtract(2.456, 1.234); // 返回 1.222
 */
function preciseSubtract(a: number, b: number): number {
  const factor = 10 ** Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
  return (a * factor - b * factor) / factor;
}

// /**
//  * 精确乘法函数
//  *
//  * 该函数通过将两个数字的精度标准化来避免浮点数运算中的误差。
//  *
//  * @param {number} a 第一个乘数，可以是整数或小数
//  * @param {number} b 第二个乘数，可以是整数或小数
//  * @returns {number} 两个数字的精确积
//  *
//  * @example
//  * preciseMultiply(0.1, 0.2); // 返回 0.02
//  * preciseMultiply(1.1, 2.2); // 返回 2.42
//  */
// function preciseMultiply(a: number, b: number): number {
//   const factor = 10 ** (getDecimalPlaces(a) + getDecimalPlaces(b));
//   return (a * factor * b * factor) / (factor * factor);
// }

// /**
//  * 精确除法函数
//  *
//  * 该函数通过将两个数字的精度标准化来避免浮点数运算中的误差。
//  *
//  * @param {number} a 被除数，可以是整数或小数
//  * @param {number} b 除数，可以是整数或小数
//  * @returns {number} 被除数和除数的精确商
//  *
//  * @throws Error 当除数为零时
//  *
//  * @example
//  * preciseDivide(0.3, 0.1); // 返回 3
//  * preciseDivide(1.234, 0.4); // 返回 3.085
//  */
// function preciseDivide(a: number, b: number): number {
//   if (b === 0) {
//     throw new Error('除数不能为零');
//   }

//   const factor = 10 ** Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
//   return (a * factor) / (b * factor);
// }

export default {
  preciseAdd,
  preciseSubtract,
  // preciseMultiply, preciseDivide
};
