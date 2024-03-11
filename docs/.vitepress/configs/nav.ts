/*
 * @Author: wanglei
 * @Date: 2023-12-06 10:14:14
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-01 11:11:55
 * @FilePath: /docs/.vitepress/configs/nav.ts
 * @Descripttion:
 */
import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
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
        text: '技术分享',
        link: '/zh-CN/tech/share/',
        activeMatch: '^/zh-CN/tech/share',
      },
    ],
  },
];
