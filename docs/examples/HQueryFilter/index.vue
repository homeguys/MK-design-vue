<!--
 * @Author: wanglei
 * @Date: 2024-04-07 16:24:46
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-19 17:38:49
 * @FilePath: \docs\examples\HQueryFilter\index.vue
 * @Descripttion:
-->
<template>
  <HQueryFilter
    ref="commonSearchRef"
    :data-source="dataSource"
    :init-request="true"
    :isLoading="false"
    :showCollapsed="true"
    :collapsed="true"
    :isShowResetBtn="false"
    :defaultWidth="170"
    @search="getList"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { type DataSource } from '@htht/components/HQueryFilter/index';

// 搜索条件
const dataSource = reactive<DataSource[]>([
  {
    type: 'input',
    label: '数据源名称:',
    value: '',
    key: 'name',
    option: {
      placeholder: '请输入数据源名称',
    },
  },
  {
    type: 'select',
    label: '数据源类型:',
    value: 'MySQL',
    key: 'connectorType',
    option: {
      placeholder: '请选择数据源类型',
      options: [
        { label: 'MySQL', value: 'MySQL' },
        { label: 'Oracle', value: 'Oracle' },
        { label: 'PostgreSQL', value: 'PostgreSQL' },
        { label: 'API', value: 'API' },
      ],
    },
  },
  {
    type: 'input',
    label: 'IP:',
    value: '',
    key: 'ip',
    option: {
      placeholder: '请输入IP',
    },
  },
  {
    type: 'datePicker',
    label: '来源:',
    value: '',
    key: 'datePicker',
    option: {
      placeholder: '请选择时间',
      format: 'YYYY-MM-DD',
    },
  },
  {
    type: 'rangePicker',
    label: '来源:',
    value: [],
    key: ['startTime', 'endTime'],
    option: {
      style: { width: '356px' },
      format: 'YYYY-MM-DD HH',
    },
  },
]);

// 获取参数调用列表查询接口
const getList = (params: any) => {
  console.warn('params', params);
};
</script>
