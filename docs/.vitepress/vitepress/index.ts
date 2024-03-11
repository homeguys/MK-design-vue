/*
 * @Author: wanglei
 * @Date: 2023-12-06 17:25:15
 * @LastEditors: wanglei
 * @LastEditTime: 2024-02-03 17:18:28
 * @FilePath: /docs/.vitepress/vitepress/index.ts
 * @Descripttion:
 */
import VPDemo from './components/vp-demo.vue';
import ApiTyping from './components/globals/vp-api-typing.vue';
import VPApp from './components/vp-app.vue';
import VPPdf from './components/vp-pdf.vue';
import type { Component } from 'vue';

import '@htht/components/theme/theme.scss';
import './styles/code.scss';

export default VPApp;

export { default as NotFound } from './components/vp-not-found.vue';

export const globals: [string, Component][] = [
  ['Demo', VPDemo],
  ['ApiTyping', ApiTyping],
  ['vp-pdf', VPPdf],
];
