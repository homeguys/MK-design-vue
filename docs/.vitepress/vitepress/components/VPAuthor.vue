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
.component-page-class {
  .vp-author {
    margin-top: 50px;

    .vp-author-title {
      margin-bottom: 8px;
      font-size: 12px;
      opacity: 0.5;
    }

    ul {
      box-sizing: border-box;
      display: flex;
      flex-flow: wrap;
      padding: 0;
      margin: 0;
      list-style: none;

      &:hover {
        li {
          margin-inline-end: 3px;
        }
      }

      li {
        width: 26px;
        height: 26px;
        margin-inline-end: -8px;
        cursor: pointer;
        transition: all 0.3s;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
