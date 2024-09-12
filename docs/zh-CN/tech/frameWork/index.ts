/*
 * @Author: wanglei
 * @Date: 2024-04-16 09:54:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-12 09:50:42
 * @FilePath: \docs\zh-CN\tech\frameWork\index.ts
 * @Descripttion:
 */
import { withBase } from 'vitepress';

export default [
  {
    title: '环境安装',
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
    ],
  },
];
