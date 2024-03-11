<!--
 * @Author: 王佳宾
 * @Date: 2023-03-27 15:21:25
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-09 17:26:39
 * @Description: 通用搜索栏组件
 * @FilePath: /packages/components/HQueryFilter/src/index.vue
-->
<template>
  <section class="h-query-filter">
    <section class="h-query-filter-form" ref="searchLeftRef">
      <template v-for="(item, index) in dataSource" :key="item.key">
        <section
          class="h-query-filter-form-item"
          v-if="showExpand ? (isExpand ? true : index + 1 <= expandMax) : true"
        >
          <span class="label" v-if="showLabel && item.label">{{ item.label }}</span>
          <Select
            v-if="item.type === 'select'"
            :allowClear="true"
            :style="{ width: defaultWidth }"
            v-model:value="item.value"
            show-search
            :filter-option="filterOption"
            v-bind="item.option"
          />
          <Input
            v-if="item.type === 'input'"
            :style="{ width: defaultWidth }"
            :allowClear="true"
            v-model:value="item.value"
            placeholder="请输入"
            v-bind="item.option"
            @keydown.enter="() => searchEvent()"
          />
          <RangePicker
            v-if="item.type === 'rangePicker'"
            :style="{ width: defaultWidth }"
            v-model:value="item.value"
            v-bind="Object.assign({ valueFormat: 'YYYY-MM-DD 00:00:00' }, item.option)"
          />
          <DatePicker
            v-if="item.type === 'datePicker'"
            :style="{ width: defaultWidth }"
            v-model:value="item.value"
            v-bind="Object.assign({ valueFormat: 'YYYY-MM-DD 00:00:00' }, item.option)"
          />
        </section>
      </template>
    </section>

    <section class="h-query-filter-btns" ref="searchRightRef">
      <template v-if="showExpand">
        <svg
          t="1708996344556"
          class="h-icon-dropdown"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4414"
          :class="{ expand: isExpand }"
          :title="isExpand ? '收起' : '展开'"
          @click="changeExpand"
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
        v-if="btnConfig.search?.visible"
        @click="() => searchEvent()"
      >
        {{ btnConfig.search?.value || '查询' }}
      </Button>
      <Button class="h-query-filter-btn reset" v-if="btnConfig.reset?.visible" @click="resetEvent">
        {{ btnConfig.reset?.value || '重置' }}
      </Button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { watch, toRefs, ref, onMounted, nextTick } from 'vue';
import { Select, Input, RangePicker, DatePicker, Button } from 'ant-design-vue';
import type { DataSource, HQueryFilter } from './index';

const searchLeftRef = ref<HTMLElement>();
const searchRightRef = ref<HTMLElement>();

// 基于类型
const emits = defineEmits(['search', 'reset']);

const props = withDefaults(defineProps<HQueryFilter>(), {
  showLabel: false,
  collapsed: true,
  isLoading: false,
  dataSource: () => [],
  defaultWidth: '180px',
  btnConfig: () => ({
    search: {
      visible: true,
      value: '查询',
    },
    reset: {
      visible: true,
      value: '重置',
    },
  }),
});

const { dataSource } = toRefs(props);
const defaultDataSource = ref<Array<DataSource>>([]);

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
 */
const searchEvent = () => {
  const params: any = {};

  dataSource.value.forEach(({ key, value }) => {
    params[key] = value;
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

// 显示还是隐藏下拉
const showExpand = ref(false);
// 展开还是收起
const isExpand = ref(false);
// 一行最多放几个
const expandMax = ref(0);
/**
 * @description
 */
const initExpand = () => {
  if (searchRightRef.value && searchRightRef.value.parentElement) {
    // 取左侧条件选择的宽度，总宽 - 右侧操作栏宽
    const leftWidth =
      searchRightRef.value.parentElement.clientWidth - searchRightRef.value.clientWidth;
    // 取到第一个子元素的宽为基准
    const firstWidth = searchLeftRef.value?.firstElementChild?.clientWidth;
    // 算出最大能放多少个元素
    const max = Math.floor(leftWidth / ((firstWidth || 0) + 16));
    expandMax.value = max;

    const show = dataSource.value.length > max;
    showExpand.value = show;
  }
};

/**
 * 展开，收起
 */
const changeExpand = () => {
  isExpand.value = !isExpand.value;
};

watch(
  dataSource,
  (val) => {
    if (val) {
      defaultDataSource.value = JSON.parse(JSON.stringify(val));
    }
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  nextTick(() => {
    initExpand();
  });
});

defineExpose({
  searchEvent,
  resetEvent,
  showExpand,
  isExpand,
});
</script>

<style lang="scss"></style>
