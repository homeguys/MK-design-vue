/*
 * @Author: wanglei
 * @Date: 2024-04-07 16:24:46
 * @LastEditors: wanglei
 * @LastEditTime: 2024-07-29 17:05:40
 * @FilePath: \docs\.vitepress\configs\sidebar.ts
 * @Descripttion:
 */
import type { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/zh-CN/components/': [
    { text: '组件总览', link: '/zh-CN/components/index.md' },
    {
      text: '组件',
      collapsed: false,
      items: [
        {
          text: 'HQueryFilter - 查询筛选',
          link: '/zh-CN/components/HQueryFilter/index.md',
        },
        { text: 'HTable - 表格', link: '/zh-CN/components/HTable/index.md' },
      ],
    },
  ],
  '/zh-CN/tech/gis': [{ text: 'Gis文档', items: [{ text: '简介', link: '/zh-CN/tech/gis/' }] }],
  '/zh-CN/tech/mobile': [
    {
      text: '移动端',
      collapsed: false,
      items: [
        { text: '概览', link: '/zh-CN/tech/mobile/' },
        { text: '雷电模拟器 + Charles App抓包', link: '/zh-CN/tech/mobile/Charles-Leidian' },
      ],
    },
  ],
  '/zh-CN/utils/': [
    { text: '工具总览', link: '/zh-CN/utils/index.md' },
    {
      text: '常规',
      collapsed: false,
      items: [
        { text: 'filterParams - 过滤参数', link: '/zh-CN/utils/filterParams' },
        { text: 'downloadFile - 下载文件', link: '/zh-CN/utils/downloadFile' },
        { text: 'formatLargeNum - 长数值', link: '/zh-CN/utils/formatLargeNum' },
      ],
    },
    {
      text: '树结构【treeUtil】',
      collapsed: false,
      items: [
        { text: 'findParentIds - 查找父级id', link: '/zh-CN/utils/treeUtil/findParentIds' },
        { text: 'findItemById - 根据id查找项', link: '/zh-CN/utils/treeUtil/findItemById' },
        { text: 'flatTree - 扁平化树结构', link: '/zh-CN/utils/treeUtil/flatTree' },
        { text: 'modifyTreeKeys - 修改树结构键', link: '/zh-CN/utils/treeUtil/modifyTreeKeys' },
      ],
    },
  ],
};
