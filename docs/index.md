---
layout: home
layoutClass: 'ht-home-layout'

hero:
  name: 前端
  text: 技术文档库
  tagline: 积累知识，是攀登进步的坚实阶梯
  image:
    src: https://img-nj.piesat.cn/static/Frontend/avatar/wl_circle.png
    alt:
  actions:
    - text: 组件库
      link: /zh-CN/components/index
    - text: 文档库
      link: /zh-CN/tech/
features:
  - icon: 📖
    title: 前端组件
    details: 整理前端常用组件
    link: /zh-CN/components/index
    linkText: 组件
  - icon: 🧰
    title: 工具类
    details: 封装通用工具类库、地图类库
    link: /zh-CN/utils/index
    linkText: 工具
  - icon: 📘
    title: 技术文档
    details: 前端各种技术文档
    link: /zh-CN/tech/index
    linkText: 文档
---

<style lang="scss">
.ht-home-layout {
  .image-bg {
    background-image: var(--vp-home-hero-image-background-image);
    filter: var(--vp-home-hero-image-filter);
    transform: translate(-50%,-50%);
  }
}
</style>
