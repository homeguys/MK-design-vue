/*
 * @Author: wanglei
 * @Date: 2023-12-06 10:14:14
 * @LastEditors: wanglei
 * @LastEditTime: 2025-04-29 17:47:06
 * @FilePath: /docs/.vitepress/configs/nav.ts
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
    link: '/zh-CN/tech/index',
    activeMatch: '^/zh-CN/tech',
  },
];
