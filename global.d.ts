/*
 * @Author: wanglei
 * @Date: 2023-11-17 22:17:41
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-09 17:28:13
 * @FilePath: /global.d.ts
 * @Descripttion:
 */
declare module '@htht/components' {
  export interface GlobalComponents {
    HQueryFilter: (typeof import('@htht/components'))['HQueryFilter'];
    HTable: (typeof import('@htht/components'))['HTable'];
  }

  interface ComponentCustomProperties {}
}

export {};

declare module '@htht/docs';
