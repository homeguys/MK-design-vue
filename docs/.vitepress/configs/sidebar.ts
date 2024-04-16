/*
 * @Author: wanglei
 * @Date: 2024-04-07 16:24:46
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-16 13:31:21
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
          text: 'HQueryFilter - 表格查询筛选',
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
  '/zh-CN/utils/': [{ text: '工具总览', link: '/zh-CN/utils/index.md' }],
};
