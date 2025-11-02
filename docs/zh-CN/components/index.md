<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: wanglei
 * @LastEditTime: 2025-11-02 21:20:27
 * @FilePath: /docs/zh-CN/components/index.md
 * @Descripttion:
-->

# 简介

`@MK/components` 是一套基于 Vue 3 的高质量 UI 组件库，专为中后台管理系统和企业级应用设计。组件风格简洁、交互友好，支持按需引入与主题定制，帮助开发者快速构建一致且高效的用户界面。

## 安装

使用npm或yarn安装

```
npm install @MK/components
```

```
yarn install @MK/components
```

## 快速上手

**全局引入（推荐用于快速原型）**

```
import { createApp } from 'vue'
import MKComponents from '@MK/components'
import '@MK/components/lib/style/index.css'

import App from './App.vue'

const app = createApp(App)
app.use(MKComponents)
app.mount('#app')
```

**按需引入（推荐用于生产环境）**
推荐使用 `unplugin-vue-components` 插件实现自动按需引入。

```
npm install -D unplugin-vue-components
```

在 `vite.config.js` 中配置：

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { MKResolver } from '@MK/components/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [MKResolver()]
    })
  ]
})
```

之后即可在模板中直接使用组件，无需手动 `import`：

```
<template>
  <h-button type="primary">按钮</-button>
  <h-card title="标题">内容区域</-card>
</template>
```

## 🌟 核心特性

- **Vue 3 + Composition API**：支持按需引入，Tree-Shaking 友好
- **TypeScript 支持**：完整TypeScript支持
- **主题定制**：支持 SCSS 变量覆盖，轻松实现品牌风格定制
- **浏览器支持**：现代浏览器支持好
