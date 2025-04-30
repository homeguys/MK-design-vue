/*
 * @Author: wanglei
 * @Date: 2024-04-07 16:24:46
 * @LastEditors: wanglei
 * @LastEditTime: 2025-04-30 11:24:28
 * @FilePath: /docs/.vitepress/configs/head.ts
 * @Descripttion:
 */
import type { HeadConfig } from 'vitepress';

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: '/MK-design-vue/favicon.ico' }],
  ['link', { rel: 'icon', href: '/MK-design-vue/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/MK-design-vue/favicon.ico', color: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileImage', content: '/MK-design-vue/favicon.ico' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
];
