<!--
 * @Author: wanglei
 * @Date: 2024-04-03 16:46:39
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-03 17:41:51
 * @FilePath: \docs\.vitepress\vitepress\components\HNavLinks.vue
 * @Descripttion:
-->
<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="vp-nav-links">
    <MNavLink v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { slugify } from '@mdit-vue/shared';

import MNavLink from './VPNavLink.vue';
import type { NavLink } from '../types';

const props = defineProps<{
  title: string;
  noIcon?: boolean;
  items: NavLink[];
}>();

const formatTitle = computed(() => {
  return slugify(props.title);
});
</script>

<style lang="scss" scoped>
.vp-nav-links {
  --m-nav-gap: 10px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-auto-flow: row dense;
  grid-gap: var(--m-nav-gap) var(--m-nav-gap);
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  /* stylelint-disable-next-line media-query-no-invalid */
  @media (min-width: $media) {
    .vp-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (width >= 960px) {
  .vp-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
