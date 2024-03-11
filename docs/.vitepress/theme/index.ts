// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import { useData } from 'vitepress';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import { globals } from '../vitepress';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import './style.scss';

export default Object.assign({}, Theme, {
  Layout: () => {
    const props: Record<string, any> = {};
    /* 添加自定义 class */
    // props.class = 'aaaaaa';
    // https://vitepress.dev/guide/extending-default-theme#layout-slots
    return h(Theme.Layout, props);
  },
  enhanceApp: ({ app }: EnhanceAppContext) => {
    app.use(ElementPlus);
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  },
});
