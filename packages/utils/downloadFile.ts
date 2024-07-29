/*
 * @Author: wanglei
 * @Date: 2024-07-26 18:10:30
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 16:11:29
 * @FilePath: \packages\utils\downloadFile.ts
 * @Descripttion: 下载文件
 */
/**
 * @param {object} content 下载的内容 text、json、blob
 * @param {string} fileName 下载文件名
 * @param {string} contentType 下载类型 mime-types库 mime库 mime-db库
 */
function downloadFile(content: any, fileName: string, contentType?: string) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });

  const URL = window.URL || window.webkitURL;
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default downloadFile;
