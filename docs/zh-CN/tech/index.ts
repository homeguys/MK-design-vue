/*
 * @Author: wanglei
 * @Date: 2024-04-16 09:54:00
 * @LastEditors: wanglei
 * @LastEditTime: 2025-04-30 10:59:18
 * @FilePath: /docs/zh-CN/tech/index.ts
 * @Descripttion:
 */
import { withBase } from 'vitepress';

export default [
  {
    title: '常规',
    items: [
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/python.ico',
        title: 'Python2和Python3安装',
        desc: '在windows上同时安装Python2和Python3',
        link: withBase('/zh-CN/tech/frameWork/Python-Install/index'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/yarn.png',
        title: 'Yarn安装依赖问题',
        desc: '使用Yarn安装依赖时遇到的各种问题',
        link: withBase('/zh-CN/tech/frameWork/Yarn-Install/index'),
      },

      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/leidian.svg',
        title: '雷电模拟器 + Charles解决App抓包',
        desc: '雷电模拟器 + Charles解决App抓包',
        link: withBase('/zh-CN/tech/frameWork/Charles-Leidian'),
      },
    ],
  },
  {
    title: 'Mobile',
    items: [
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro多端开发之跨端踩坑',
        desc: 'Taro多端开发之跨端踩坑',
        link: withBase('/zh-CN/tech/mobile/Taro多端开发之跨端踩坑'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro里面滚动穿透的问题',
        desc: 'Taro里面滚动穿透的问题',
        link: withBase('/zh-CN/tech/mobile/Taro里面滚动穿透的问题'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro中常用Hook的用法',
        desc: 'Taro中常用Hook的用法',
        link: withBase('/zh-CN/tech/mobile/Taro中常用Hook的用法'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro框架中Redux的使用方法',
        desc: 'Taro框架中Redux的使用方法',
        link: withBase('/zh-CN/tech/mobile/Taro框架中Redux的使用方法'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro框架中装饰器的使用方法',
        desc: 'Taro框架中装饰器的使用方法',
        link: withBase('/zh-CN/tech/mobile/Taro框架中装饰器的使用方法'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/taro.png',
        title: 'Taro框架中的事件冒泡',
        desc: 'Taro框架中的事件冒泡',
        link: withBase('/zh-CN/tech/mobile/Taro框架中的事件冒泡'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/uniapp.png',
        title: 'Uniapp怎么区分拍照和上传照片',
        desc: 'Uniapp怎么区分拍照和上传照片',
        link: withBase('/zh-CN/tech/mobile/Uniapp怎么区分拍照和上传照片/'),
      },
    ],
  },
  {
    title: 'Vue / React',
    items: [
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/react.svg',
        title: '关于虚拟节点VNode',
        desc: '关于虚拟节点VNode',
        link: withBase('/zh-CN/tech/vue&react/关于虚拟节点VNode'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/react.svg',
        title: '关于setState、setData后数值不及时更新的问题',
        desc: '关于setState、setData后数值不及时更新的问题',
        link: withBase('/zh-CN/tech/vue&react/关于setState、setData后数值不及时更新的问题'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/react.svg',
        title: '在循环中key值的作用',
        desc: '在循环中key值的作用',
        link: withBase('/zh-CN/tech/vue&react/关于虚拟节点VNode'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/react.svg',
        title: '自定义Hook分页加载的实现',
        desc: '自定义Hook分页加载的实现',
        link: withBase('/zh-CN/tech/vue&react/自定义Hook分页加载的实现'),
      },
    ],
  },
  {
    title: 'Git',
    items: [
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/gitlab.png',
        title: 'Git使用中的常见问题',
        desc: 'Git使用中的常见问题',
        link: withBase('/zh-CN/tech/git/Git使用中的常见问题/index'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/gitlab.png',
        title: 'macOS搭建本地gitlab',
        desc: 'macOS搭建本地gitlab',
        link: withBase('/zh-CN/tech/git/macOS搭建本地gitlab/index'),
      },
      {
        icon: 'https://img-nj.piesat.cn/static/Frontend/nav/icons/gitlab.png',
        title: 'git相关技巧',
        desc: 'git相关技巧',
        link: withBase('/zh-CN/tech/git/git相关技巧/index'),
      },
    ],
  },
];
