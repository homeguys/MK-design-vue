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
  '/zh-CN/tech/gis': [
    { text: 'Gis文档', items: [{ text: '简介', link: '/zh-CN/tech/gis/' }] },
  ],
  '/zh-CN/tech/share': [
    {
      text: '技术分享',
      collapsed: true,
      items: [{ text: '简介', link: '/zh-CN/tech/share/' }],
    },
    {
      text: '技术分享1',
      collapsed: true,
      items: [{ text: '简介', link: '/zh-CN/tech/share/' }],
    },
  ],
  '/zh-CN/utils/': [{ text: '工具总览', link: '/zh-CN/utils/index.md' }],
};
