/*
 * @Author: wanglei
 * @Date: 2024-07-26 18:10:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-11 11:01:31
 * @FilePath: \packages\utils\findRangeByValue.ts
 * @Descripttion: 根据提供的数值，判断数值所在区间的颜色
 */

// const data = [
//   { label: '100', color: '#00E700' },
//   { label: '100-200', color: '#FFFE05' },
//   { label: '200-300', color: '#FF7D00' },
//   { label: '300-400', color: '#FE0000' },
//   { label: '400', color: '#81007F' },
// ];

interface IData {
  label: string;
  color: string;
}

/**
 * @param {object} value 数值
 * @param {string} data 区间范围的数组
 */
function findRangeByValue(value: number, data: IData[]) {
  const parsedData = data.map((item, index) => {
    const range = item.label.split('-').map(Number);
    const min = range[0];
    const hasSecond = range[1] !== undefined;

    let max;
    if (hasSecond) {
      [, max] = range;
    } else {
      max = index === data.length - 1 ? Infinity : min;
    }

    return {
      min: index === 0 && !hasSecond ? -Infinity : min,
      max,
      ...item,
    };
  });

  const result = parsedData.find((item) => value >= item.min && value < item.max);
  return result || null;
}

export default findRangeByValue;
