<script setup lang="ts">
import { shallowRef, onMounted, defineAsyncComponent, ref, computed } from 'vue';
import { getModule } from '../../utils/module';
import { isClient, useClipboard, useToggle } from '@vueuse/core';
import { CaretTop, Expand, CopyDocument } from '@element-plus/icons-vue';
import { $message } from '../../utils/message';
import SourceCode from './vp-source-code.vue';
import { ElTooltip, ElIcon, ElCollapseTransition } from 'element-plus';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale/zh_CN';

import type { Component } from 'vue';

const props = defineProps<{
  demos?: object;
  source: string;
  path: string;
  rawSource: string;
  description?: string;
}>();

const demo = shallowRef<Component>();
const sourceCodeRef = ref<HTMLButtonElement>();

const decodedDescription = computed(() => decodeURIComponent(props.description!));

const { text, isSupported, copy } = useClipboard({
  source: decodeURIComponent(props.rawSource),
});
const [sourceVisible, toggleSourceVisible] = useToggle();

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault();
    toggleSourceVisible(false);
    sourceCodeRef.value?.focus();
  }
};

/**
 * copy code
 */
const copyCode = async () => {
  if (!isSupported.value) {
    $message.error('复制失败');
    return;
  }
  try {
    await copy(decodeURIComponent(props.rawSource));
    $message.success('复制成功');
  } catch (e: any) {
    $message.error(e.message);
  }
};

onMounted(async () => {
  demo.value = defineAsyncComponent(getModule(props.path));
});
</script>
<template>
  <ConfigProvider :locale="zhCN">
    <ClientOnly>
      <p text="sm" v-html="decodedDescription" />
      <component :is="demo" v-if="demo" v-bind="$attrs" />
      <div class="op-btns">
        <ElTooltip
          content="复制代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <ElIcon
            :size="16"
            aria-label="复制代码"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <CopyDocument />
          </ElIcon>
        </ElTooltip>
        <ElTooltip
          content="查看代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? '隐藏代码' : '查看代码'"
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <Expand />
            </ElIcon>
          </button>
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ '隐藏代码' }}</span>
        </div>
      </Transition>
    </ClientOnly>
  </ConfigProvider>
</template>
<style scoped lang="scss">
.m-0 {
  margin: 0 !important;
}

.op-btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  padding: 0.5rem;

  .el-icon {
    &:hover {
      color: var(--text-color);
    }
  }

  .op-btn {
    margin: 0 0.5rem;
    color: var(--text-color-lighter);
    cursor: pointer;
    transition: 0.2s;
  }
}

.example-float-control {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin-top: -1px;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  background-color: var(--bg-color, #fff);
  border-top: 1px solid var(--border-color);
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;

  span {
    margin-left: 10px;
    font-size: 14px;
  }

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
