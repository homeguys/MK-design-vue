/*
 * @Author: wanglei
 * @Date: 2023-11-17 22:17:41
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-16 10:54:17
 * @FilePath: \global.d.ts
 * @Descripttion:
 */
declare module '@htht/components' {
  export interface GlobalComponents {
    HQueryFilter: (typeof import('@htht/components'))['HQueryFilter'];
    HTable: (typeof import('@htht/components'))['HTable'];
  }
}

export {};

declare module '@htht/docs';
