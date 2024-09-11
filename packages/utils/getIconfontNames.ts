/*
 * @Author: wanglei
 * @Date: 2024-08-09 13:50:47
 * @LastEditors: wanglei
 * @LastEditTime: 2024-08-09 14:56:47
 * @FilePath: \packages\utils\getIconfontNames.ts
 * @Descripttion: 获取iconfont矢量图标项目库所有icon的名称
 */
/**
 * @param {string} cssUrl iconfont矢量图标
 * @return {arr} iconfont矢量图标项目库所有icon的名称
 */
async function getIconfontNames(cssUrl: string) {
  try {
    const response = await fetch(cssUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();

    // 正则表达式用于匹配 .icon-*:before 的图标类名
    const regex = /\.icon-(.*?):before/g;
    const iconNames = [];
    let match = regex.exec(data);

    while (match !== null) {
      iconNames.push(match[1]);
      match = regex.exec(data);
    }

    return iconNames;
  } catch (error) {
    console.error('Error fetching or parsing CSS:', error);
    return [];
  }
}

export default getIconfontNames;
