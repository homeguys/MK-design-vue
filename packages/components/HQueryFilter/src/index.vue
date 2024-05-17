<!--
 * @Author: 王佳宾
 * @Date: 2023-03-27 15:21:25
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-19 17:38:34
 * @Description: 通用搜索栏组件
 * @FilePath: \packages\components\HQueryFilter\src\index.vue
-->
<template>
  <section class="h-query-filter">
    <section class="h-query-filter-form">
      <template v-for="(item, index) in dataSource" :key="item.key">
        <section class="h-query-filter-form-item" v-if="isFormItemShow(index)">
          <span class="label" v-if="showLabel && item.label">{{ item.label }}</span>
          <Select
            v-if="item.type === 'select'"
            :allowClear="true"
            :style="{ width: `${defaultWidth}px` }"
            v-model:value="item.value"
            show-search
            :filter-option="filterOption"
            v-bind="item.option"
          />
          <Input
            v-if="item.type === 'input'"
            :style="{ width: `${defaultWidth}px` }"
            :allowClear="true"
            v-model:value="item.value"
            placeholder="请输入"
            v-bind="item.option"
            @keydown.enter="() => searchEvent()"
          />
          <RangePicker
            v-if="item.type === 'rangePicker'"
            :style="{ width: `${defaultWidth}px` }"
            v-model:value="item.value"
            v-bind="item.option"
          />
          <DatePicker
            v-if="item.type === 'datePicker'"
            :style="{ width: `${defaultWidth}px` }"
            v-model:value="item.value"
            v-bind="item.option"
          />
        </section>
      </template>
    </section>

    <section class="h-query-filter-btns" ref="searchRightRef">
      <template v-if="_showCollapsed">
        <svg
          t="1708996344556"
          class="h-icon-dropdown"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4414"
          :class="{ collapsed: _collapsed }"
          :title="_collapsed ? '展开' : '收起'"
          @click="changeCollapsed"
        >
          <path
            d="M807.822222 492.088889L514.844444 785.066667 221.866667 492.088889c-5.688889-5.688889-11.377778-8.533333-19.911111-8.533333-8.533333 0-14.222222 2.844444-19.911112 8.533333-11.377778 11.377778-11.377778 28.444444 0 39.822222l332.8 332.8 332.8-332.8c8.533333-11.377778 8.533333-25.6 0-36.977778-11.377778-11.377778-28.444444-14.222222-39.822222-2.844444z"
            fill="currentColor"
            p-id="4415"
          ></path>
          <path
            d="M514.844444 551.822222L847.644444 219.022222c8.533333-11.377778 8.533333-25.6 0-36.977778-11.377778-11.377778-28.444444-14.222222-39.822222-2.844444L514.844444 472.177778 221.866667 179.2c-5.688889-5.688889-11.377778-8.533333-19.911111-8.533333-8.533333 0-14.222222 2.844444-19.911112 8.533333-11.377778 11.377778-11.377778 28.444444 0 39.822222l332.8 332.8z"
            fill="currentColor"
            p-id="4416"
          ></path>
        </svg>
      </template>
      <Button
        class="h-query-filter-btn search"
        type="primary"
        :loading="isLoading"
        v-if="isShowSearchBtn"
        @click="() => searchEvent()"
      >
        {{ searchText }}
      </Button>
      <Button class="h-query-filter-btn reset" v-if="isShowResetBtn" @click="resetEvent">
        {{ resetText }}
      </Button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { watch, toRefs, ref, onMounted, nextTick } from 'vue';
import { Select, Input, RangePicker, DatePicker, Button } from 'ant-design-vue';
import dayjs from 'dayjs';
import type { DataSource, HQueryFilter } from './index';

const searchRightRef = ref<HTMLElement>();

// 基于类型
const emits = defineEmits(['search', 'reset']);

const props = withDefaults(defineProps<HQueryFilter>(), {
  showLabel: false,
  showCollapsed: true,
  collapsed: true,
  isLoading: false,
  dataSource: () => [],
  defaultWidth: 180,
  searchText: '查询',
  resetText: '重置',
  isShowSearchBtn: true,
  isShowResetBtn: true,
});

const { dataSource, initRequest } = toRefs(props);
const defaultDataSource = ref<Array<DataSource>>([]);
const _showCollapsed = ref(props.showCollapsed); // 是否启用折叠功能
const _collapsed = ref(props.collapsed); // 是否默认折叠

// 表单项默认宽度，支持180 | '180px'
const _defaultWidth =
  typeof props.defaultWidth === 'number'
    ? props.defaultWidth
    : Number.parseInt(props.defaultWidth, 10);
const maxItemPerLine = ref<number>(0); // 一行最多放几个

/**
 * 表单项是否展示
 */
const isFormItemShow = (index: number) => {
  if (!_showCollapsed.value) {
    return true;
  }

  return _collapsed.value ? index + 1 <= maxItemPerLine.value : true;
};
/**
 * @description
 */
const initCollapsed = () => {
  if (searchRightRef.value && searchRightRef.value.parentElement) {
    // 取左侧条件选择的宽度，总宽 - 右侧操作栏宽
    const leftWidth =
      searchRightRef.value.parentElement.clientWidth - searchRightRef.value.clientWidth;

    maxItemPerLine.value = Math.floor(leftWidth / (_defaultWidth + 16));

    if (_showCollapsed.value) {
      const show = dataSource.value.length > maxItemPerLine.value;
      _showCollapsed.value = show;
    }
  }
};

/**
 * 展开，收起
 */
const changeCollapsed = () => {
  _collapsed.value = !_collapsed.value;
};

/**
 * select组件查询--
 * @param input
 * @param option
 */
const filterOption = (input: string, option: any) => {
  const label = option.label.toLowerCase();
  return label.indexOf(input.toLowerCase()) >= 0;
};

/**
 * 查询
 * @param isPageEvent { Boolean } 是否是分页事件
 */
const searchEvent = () => {
  const params: any = {};

  dataSource.value.forEach(({ type, key, value, option }) => {
    if (type === 'rangePicker' && value && Array.isArray(key)) {
      // 如果type为time，value = [startTime, endTime]， 并且key为 [xxxxx, xxx...], 使用key数组的字段
      key.forEach((timeKey, index) => {
        const {
          format = 'YYYY-MM-DD HH:mm:ss',
          startTimePadding = ' 00:00:00',
          endTimePadding = ' 59:59:59',
        } = option || {};
        let _format = format;
        if (index === 0) {
          _format += startTimePadding;
        } else {
          _format += endTimePadding;
        }

        params[timeKey] = dayjs(value[index]).format(_format);
      });
    } else if (typeof key === 'string') {
      params[key] = value;
    }
  });

  emits('search', params);
};

/**
 * @description 重置
 */
const resetEvent = () => {
  dataSource.value.forEach((item) => {
    const cloneItem = item;
    const current: any = defaultDataSource.value.find((i) => i.key === item.key);
    cloneItem.value = current?.value;
  });
  // 修改父元素的值
  // emit('update:dataSource', defaultDataSource.value);
  emits('reset');

  // 重置之后立即查询
  searchEvent();
};

watch(
  dataSource,
  (val) => {
    if (val) {
      defaultDataSource.value = JSON.parse(JSON.stringify(val));

      if (initRequest.value) {
        searchEvent();
      }
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  nextTick(() => {
    initCollapsed();
  });
});

defineExpose({
  searchEvent,
  resetEvent,
});
</script>

<style lang="scss"></style>
