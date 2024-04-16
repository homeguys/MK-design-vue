/*
 * @Author: wanglei
 * @Date: 2023-12-05 22:13:56
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-16 17:15:48
 * @FilePath: \docs\.vitepress\config.mts
 * @Descripttion:
 */
import { defineConfig } from 'vitepress';
import { mdPlugin } from './configs/plugins';
import { head, nav, sidebar } from './configs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/htht-design-vue',
  title: '前端技术文档库',
  description: '前端开发组件文档、分享技术文档、常见问题以及实用工具链接',
  head,
  appearance: false,
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    config: (md) => mdPlugin(md),
  },
  themeConfig: {
    i18nRouting: false,
    logo: '/logo.png',
    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '展示详情',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
        miniSearch: {
          searchOptions: {
            fields: ['title', 'text', 'link'],
          },
        },
      },
    },
    // editLink: {
    //   pattern: 'https://git.piesat.cn:10004/wanglei/htht-design/tree/master/docs/:path',
    //   text: 'Edit this page on GitLab',
    // },
    // socialLinks: [
    //   {
    //     icon: 'github',
    //     link: 'https://github.com/maomao1996/vitepress-fe-nav',
    //   },
    // ],
    footer: {
      message: '',
      copyright:
        'Copyright © 2024 航天宏图信息技术股份有限公司 版权所有 | 京ICP备08011069号 | 京公网安备 11010802035123号',
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
  outDir: '../build/docs',
});
