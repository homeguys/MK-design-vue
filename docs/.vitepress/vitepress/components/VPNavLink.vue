<!--
 * @Author: wanglei
 * @Date: 2024-04-03 16:46:39
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-03 17:41:51
 * @FilePath: \docs\.vitepress\vitepress\components\HNavLink.vue
 * @Descripttion:
-->
<template>
  <a v-if="link" class="vp-nav-link" :href="link" :target="target" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"></div>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <img
              :src="withBase(icon)"
              :alt="title"
              onerror="this.parentElement.style.display='none'"
            />
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { withBase, useRoute } from 'vitepress';
import { slugify } from '@mdit-vue/shared';

import { NavLink } from '../types';

const props = defineProps<{
  noIcon?: boolean;
  icon?: NavLink['icon'];
  badge?: NavLink['badge'];
  title?: NavLink['title'];
  desc?: NavLink['desc'];
  link: NavLink['link'];
}>();

const target = ref('');

const formatTitle = computed(() => {
  if (!props.title) {
    return '';
  }
  return slugify(props.title);
});

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg;
  return '';
});

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' };
  }
  return props.badge;
});

onMounted(() => {
  const route = useRoute();
  const isNav = route.path.includes('zh-CN/nav');
  target.value = isNav ? '_blank' : '';
});
</script>

<style lang="scss" scoped>
.vp-nav-link {
  --h-nav-icon-box-size: 45px;
  --h-nav-icon-size: 35px;
  --h-nav-box-gap: 12px;

  display: block;
  height: 100%;
  text-decoration: none;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
  transition: all 0.25s;

  &:hover {
    text-decoration: initial;
    background-color: var(--vp-c-bg-soft-up);
    border-color: var(--vp-c-brand);
    box-shadow: var(--vp-shadow-2);
  }

  .box {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--h-nav-box-gap);
    color: var(--vp-c-text-1);

    &.has-badge {
      padding-top: calc(var(--h-nav-box-gap) + 2px);
    }

    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--h-nav-icon-box-size);
    height: var(--h-nav-icon-box-size);
    margin-right: calc(var(--h-nav-box-gap) - 2px);
    font-size: var(--h-nav-icon-size);
    background-color: var(--vp-c-bg-soft-down);
    border-radius: 6px;
    transition: background-color 0.25s;

    :deep(svg) {
      width: var(--h-nav-icon-size);
      fill: currentColor;
    }

    :deep(img) {
      width: var(--h-nav-icon-size);
      border-radius: 4px;
    }
  }

  .title {
    flex-grow: 1;
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:not(.no-icon) {
      line-height: var(--h-nav-icon-box-size);
    }
  }

  .badge {
    position: absolute;
    top: 2px;
    right: 0;
    transform: scale(0.8);
  }

  .desc {
    display: -webkit-box;
    flex-grow: 1;
    margin: calc(var(--h-nav-box-gap) - 2px) 0 0;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

@media (width <= 960px) {
  .vp-nav-link {
    --h-nav-icon-box-size: 36px;
    --h-nav-icon-size: 20px;
    --h-nav-box-gap: 8px;

    .title {
      font-size: 14px;
    }
  }
}
</style>
