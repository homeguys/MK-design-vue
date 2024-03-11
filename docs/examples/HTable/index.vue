<!--
 * @Author: wanglei
 * @Date: 2024-02-28 18:18:02
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-08 10:18:26
 * @FilePath: /docs/examples/HTable/index.vue
 * @Descripttion: 
-->
<template>
  <HTable :table-props="tableConfig" index-type="page">
    <template #headerRight>
      <Button class="primary-dark" type="primary" :icon="h(PlusOutlined)" @click="handleAddConnect"
        >新增</Button
      >
    </template>
    <template #action="{ record }">
      <Button type="link" @click="handleEdit(record)">编辑</Button>
      <Divider type="vertical" />
      <Button type="link" @click="handleTest(record)">测试</Button>
      <Divider type="vertical" />
      <Button type="link" class="danger" @click="handleBeforeDelete(record)">删除</Button>
    </template>
  </HTable>
</template>

<script setup lang="ts">
import { reactive, computed, h } from 'vue';
import { Button, type TableProps, message, Divider } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

// 分页相关参数
const pageInfo: any = reactive({
  limit: 10,
  page: 1,
});

// 监听表格change事件
const handleTableChange = (option: any) => {
  const { current, pageSize } = option;
  // pagination切换分页
  pageInfo.page = current;
  pageInfo.limit = pageSize;
};

const tableConfig = reactive({
  dataSource: [],
  columns: [
    {
      title: '序号',
      key: 'index',
      width: '50px',
      align: 'center',
    },
    {
      title: '数据源名称',
      dataIndex: 'name',
      key: 'name',
      width: '80px',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '数据源类型',
      dataIndex: ['config', 'connectorType'],
      key: 'connectorType',
      width: '50px',
      align: 'center',
    },
    {
      title: 'ip',
      dataIndex: ['config', 'ip'],
      key: 'ip',
      width: '80px',
      align: 'center',
    },
    {
      title: '来源',
      dataIndex: ['config', 'resource'],
      key: 'resource',
      width: '80px',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: ['config', 'remark'],
      key: 'remark',
      width: '80px',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'time',
      width: '80px',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      width: '80px',
      align: 'center',
    },
  ],
  pagination: {
    total: 0,
    pageSize: computed(() => pageInfo.limit) as any,
    current: computed(() => pageInfo.page) as any,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条记录`,
  },
  onChange: handleTableChange,
}) as TableProps;

const handleAddConnect = (record: any) => {};
const handleEdit = (record: any) => {};
const handleTest = (record: any) => {};
const handleBeforeDelete = (record: any) => {};
</script>
