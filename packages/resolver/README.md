<!--
 * @Author: wanglei
 * @Date: 2023-11-27 17:10:16
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-07 16:41:39
 * @FilePath: /packages/resolver/README.md
 * @Descripttion:
-->

### 组件库自动导入插件

#### 简介

使用unplugin-vue-components/vite插件自动导入组件，无需以下引入

```
<template>
  <HButton>我是 HButton</HButton>
</template>
<script setup>
  import { HButton } from '@htht/component'
</script>
```

直接使用HButton并且会按需引入组件和对应样式文件

```
<template>
  <h-button>我是 HButton</h-button>
  <HButton>或者大驼峰引入，我是 HButton</HButton>
</template>
```

#### 按需导入配置

```
import Components from 'unplugin-vue-components/vite';
import { HResolver } from '@htht/resolver';

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [
        // ...
        HResolver()
      ],
    }),
  ],
})
```
