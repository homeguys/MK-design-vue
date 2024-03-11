/*
 * @Date: 2024-01-03 11:08:34
 * @LastEditTime: 2024-03-09 17:16:25
 * @FilePath: /docs/vite.config.ts
 */
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { HResolver } from '@htht/resolver';

export default () => {
  return defineConfig({
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
            resolveIcons: true,
          }),
          HResolver({
            isDev: true,
          }),
        ],
        dts: false,
      }),
    ],
  });
};
