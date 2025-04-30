/*
 * @Author: wanglei
 * @Date: 2024-04-07 16:24:46
 * @LastEditors: wanglei
 * @LastEditTime: 2025-04-30 10:59:03
 * @FilePath: /docs/.vitepress/configs/sidebar.ts
 * @Descripttion:
 */
import type { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/zh-CN/components/': [
    { text: '组件总览', link: '/zh-CN/components/index.md' },
    {
      text: '组件',
      collapsed: false,
      items: [
        {
          text: 'HQueryFilter - 查询筛选',
          link: '/zh-CN/components/HQueryFilter/index.md',
        },
        { text: 'HTable - 表格', link: '/zh-CN/components/HTable/index.md' },
      ],
    },
  ],
  // '/zh-CN/tech/gis': [{ text: 'Gis文档', items: [{ text: '简介', link: '/zh-CN/tech/gis/' }] }],
  // '/zh-CN/tech/mobile': [
  //   {
  //     text: '移动端',
  //     collapsed: false,
  //     items: [
  //       { text: '概览', link: '/zh-CN/tech/mobile/' },
  //       { text: '雷电模拟器 + Charles App抓包', link: '/zh-CN/tech/mobile/Charles-Leidian' },
  //     ],
  //   },
  // ],
  // '/zh-CN/tech/frameWork': [
  //   {
  //     text: '',
  //     items: [
  //       { text: '概览', link: '/zh-CN/tech/frameWork/' },
  //       { text: 'Python2和Python3安装', link: '/zh-CN/tech/frameWork/Python-Install/index' },
  //       { text: 'Yarn安装依赖问题', link: '/zh-CN/tech/frameWork/Yarn-Install/index' },
  //       { text: 'macOS搭建本地gitlab', link: '/zh-CN/tech/frameWork/macOS搭建本地gitlab/index' },
  //     ],
  //   },
  // ],
  '/zh-CN/utils/': [
    { text: '简介', link: '/zh-CN/utils/index.md' },
    {
      text: '常规',
      collapsed: false,
      items: [
        { text: 'filterParams - 过滤参数', link: '/zh-CN/utils/filterParams' },
        { text: 'downloadFile - 下载文件', link: '/zh-CN/utils/downloadFile' },
        { text: 'formatLargeNum - 长数值', link: '/zh-CN/utils/formatLargeNum' },
        { text: 'findRangeByValue - 查找区间', link: '/zh-CN/utils/findRangeByValue' },
      ],
    },
    {
      text: '树结构【treeUtil】',
      collapsed: false,
      items: [
        { text: 'findParentIds - 查找父级id', link: '/zh-CN/utils/treeUtil/findParentIds' },
        { text: 'findItemById - 根据id查找项', link: '/zh-CN/utils/treeUtil/findItemById' },
        { text: 'flatTree - 扁平化树结构', link: '/zh-CN/utils/treeUtil/flatTree' },
        { text: 'modifyTreeKeys - 修改树结构键', link: '/zh-CN/utils/treeUtil/modifyTreeKeys' },
      ],
    },
  ],
  '/zh-CN/tech/': [
    { text: '概览', link: '/zh-CN/tech/index.md' },
    {
      text: '常规',
      collapsed: false,
      items: [
        { text: '同时安装Python2和Python3', link: '/zh-CN/tech/frameWork/Python-Install/' },
        { text: 'Yarn安装依赖问题', link: '/zh-CN/tech/frameWork/Yarn-Install/' },
        { text: '雷电模拟器 + Charles App抓包', link: '/zh-CN/tech/frameWork/Charles-Leidian' },
      ],
    },
    {
      text: 'Mobile',
      collapsed: false,
      items: [
        {
          text: 'Taro多端开发之跨端踩坑',
          link: '/zh-CN/tech/mobile/Taro多端开发之跨端踩坑',
        },
        {
          text: 'Taro里面滚动穿透的问题',
          link: '/zh-CN/tech/mobile/Taro里面滚动穿透的问题',
        },
        {
          text: 'Taro中常用Hook的用法',
          link: '/zh-CN/tech/mobile/Taro中常用Hook的用法',
        },
        {
          text: 'Taro框架中Redux的使用方法',
          link: '/zh-CN/tech/mobile/Taro框架中Redux的使用方法',
        },
        {
          text: 'Taro框架中装饰器的使用方法',
          link: '/zh-CN/tech/mobile/Taro框架中装饰器的使用方法',
        },
        {
          text: 'Taro框架中的事件冒泡',
          link: '/zh-CN/tech/mobile/Taro框架中的事件冒泡',
        },
        {
          text: 'Uniapp怎么区分拍照和上传照片',
          link: '/zh-CN/tech/mobile/Uniapp怎么区分拍照和上传照片/',
        },
      ],
    },
    {
      text: 'Vue / React',
      collapsed: true,
      items: [
        { text: '关于虚拟节点VNode', link: '/zh-CN/tech/vue&react/关于虚拟节点VNode' },
        {
          text: '关于setState、setData后数值不及时更新的问题',
          link: '/zh-CN/tech/vue&react/关于setState、setData后数值不及时更新的问题',
        },
        {
          text: '在循环中key值的作用',
          link: '/zh-CN/tech/vue&react/在循环中key值的作用',
        },
        {
          text: '自定义Hook分页加载的实现',
          link: '/zh-CN/tech/vue&react/自定义Hook分页加载的实现',
        },
      ],
    },
    {
      text: 'Git',
      collapsed: true,
      items: [
        { text: 'Git使用中的常见问题', link: '/zh-CN/tech/git/Git使用中的常见问题/' },
        { text: 'macOS搭建本地gitlab', link: '/zh-CN/tech/git/macOS搭建本地gitlab/' },
        { text: 'git相关技巧', link: '/zh-CN/tech/git/git相关技巧' },
      ],
    },
  ],
};
