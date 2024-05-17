<template>
  <section class="vp-author">
    <section class="vp-author-title">贡献者</section>
    <ul>
      <li v-for="item in members">
        <Tooltip :title="item.name">
          <img :src="item.avatar" />
        </Tooltip>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Tooltip } from 'ant-design-vue';

interface IMember {
  avatar: string;
  name: string;
}

interface IProps {
  members: IMember[];
}

withDefaults(defineProps<IProps>(), {
  members: () => [],
});
</script>

<style lang="scss" scoped>
.vp-author {
  margin-top: 50px;

  .vp-author-title {
    margin-bottom: 8px;
    font-size: 13px;
    opacity: 0.5;
  }

  ul {
    box-sizing: border-box;
    display: flex !important;
    flex-flow: wrap;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    list-style: none !important;

    &:hover {
      li {
        margin-inline-end: 5px;
      }
    }

    li {
      width: 32px;
      height: 32px;
      margin-inline-end: -8px;
      margin-top: 0;
      cursor: pointer;
      transition: all 0.3s;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
