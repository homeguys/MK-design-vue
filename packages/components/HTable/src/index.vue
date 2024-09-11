<!--
 * @Author: 王佳宾
 * @Date: 2023-11-01 17:54:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-11 11:07:53
 * @Description: 通用表格
 * @FilePath: \packages\components\HTable\src\index.vue
-->
<template>
  <section class="ht-table-container">
    <section
      class="ht-table-header"
      v-if="parentSlots.includes('headerLeft') || parentSlots.includes('headerRight')"
    >
      <section class="ht-table-header-left">
        <slot name="headerLeft"></slot>
      </section>
      <!-- / 头部左侧 -->
      <section class="ht-table-header-right">
        <slot name="headerRight"></slot>
      </section>
      <!-- / 头部右侧 -->
    </section>
    <!-- / 表格头部 -->
    <Table
      class="ht-table"
      :class="{ 'ht-table-pagination': tableProps?.pagination }"
      :row-key="(record: any): string => record.id || record.key"
      :scroll="{ y: '90%' }"
      :pagination="false"
      v-bind="tableProps"
    >
      <template #bodyCell="scoped">
        <!-- 固定序号, 固定插槽可以按照这样写 -->
        <template v-if="scoped.column.key === 'index'">
          {{ getIndex(scoped.index) }}
        </template>

        <!-- 外部插槽
        <HCommonTable :table-props="tableConfig">
          <template #connectorType> 3333 </template>
        </HCommonTable>
      -->
        <slot
          v-else-if="scoped.column.key && parentSlots.includes(scoped.column.key.toString())"
          :name="scoped.column.key"
          v-bind="scoped"
        ></slot>
        <!-- 默认展示 -->
        <template v-else>
          <!-- 是否展示tip -->
          <span v-if="!String(scoped.text).length || (!scoped.text && scoped.text !== 0)"> - </span>
          <Tooltip v-else @mouseenter="showTooltip">
            <template #title>{{ scoped.text }}</template>
            <section :class="{ ellipsis: scoped.column.ellipsis }">
              <span>{{ scoped.text }}</span>
            </section>
          </Tooltip>
        </template>
      </template>
      <!-- / 插槽 -->
    </Table>
    <!-- / 表格内容 -->
  </section>
</template>

<script setup lang="ts">
import { useSlots, withDefaults } from 'vue';
import { Table, Tooltip } from 'ant-design-vue';
import type { HTableProps } from './index';

// 插槽的实例
const slots = useSlots();
// 所有插槽
const parentSlots = Object.keys(slots);

const props = withDefaults(defineProps<HTableProps>(), {
  indexType: 'noPage',
});

/**
 * 是否显示tooltip
 * @param e
 */
const showTooltip = (e: any) => {
  const cloneE = e;
  if (e.target.firstChild.offsetWidth < e.target.offsetWidth) {
    // 阻止鼠标事件
    cloneE.target.style.pointerEvents = 'none';
  }
};

/**
 * 获取序号
 * @param index 当前序号-未加当前page
 */
const getIndex = (index: number): number => {
  if (props.indexType === 'noPage') return index + 1;

  // 获取当前分页信息
  if (
    props.tableProps.pagination &&
    props.tableProps.pagination.current &&
    props.tableProps.pagination.pageSize
  ) {
    return (
      index + 1 + (props.tableProps.pagination.current - 1) * props.tableProps.pagination.pageSize
    );
  }
  return index;
};
</script>
.
