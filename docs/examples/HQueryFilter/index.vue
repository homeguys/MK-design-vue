<template>
  <HQueryFilter
    ref="commonSearchRef"
    :data-source="dataSource"
    :btn-config="btnConfig"
    :isLoading="false"
    @search="getList"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { type DataSource, type BtnConfig } from '@htht/components/HQueryFilter/index';

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
    type: 'input',
    label: '数据源名称:',
    value: '',
    key: 'name1',
    option: {
      placeholder: '请输入数据源名称',
    },
  },
  {
    type: 'input',
    label: '数据源名称:',
    value: '',
    key: 'name2',
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
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    type: 'rangePicker',
    label: '来源:',
    value: [],
    key: 'rangePicker',
    option: {
      style: { width: '376px' },
    },
  },
  {
    type: 'rangePicker',
    label: '来源:',
    value: [],
    key: 'rangePicker1',
    option: {
      style: { width: '376px' },
    },
  },
  {
    type: 'datePicker',
    label: '来源:',
    value: '',
    key: 'datePicker1',
    option: {
      placeholder: '请选择时间',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
]);

// 按钮功能
const btnConfig: BtnConfig = {
  reset: {
    visible: true,
  },
  search: {
    visible: true,
  },
};

// 获取参数调用列表查询接口
const getList = (params: any) => {
  console.warn('params', params);
  console.warn(typeof params.rangePicker);
};
</script>
