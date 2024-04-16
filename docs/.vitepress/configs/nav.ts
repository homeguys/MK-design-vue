/*
 * @Author: wanglei
 * @Date: 2023-12-06 10:14:14
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-16 10:52:03
 * @FilePath: \docs\.vitepress\configs\nav.ts
 * @Descripttion:
 */
import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/zh-CN/nav/index', activeMatch: '^/zh-CN/nav' },
  {
    text: '组件',
    link: '/zh-CN/components/index',
    activeMatch: '^/zh-CN/components',
  },
  {
    text: '工具类',
    link: '/zh-CN/utils/index',
    activeMatch: '^/zh-CN/utils',
  },
  {
    text: '技术文档',
    activeMatch: '^/zh-CN/tech',
    items: [
      {
        text: 'Gis文档',
        link: '/zh-CN/tech/gis/',
        activeMatch: '^/zh-CN/tech/gis',
      },
      {
        text: '移动端',
        link: '/zh-CN/tech/mobile/',
        activeMatch: '^/zh-CN/tech/mobile',
      },
    ],
  },
];
