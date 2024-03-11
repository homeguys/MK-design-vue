/*
 * @Author: 王佳宾
 * @Date: 2024-02-28 17:23:13
 * @LastEditors: 王佳宾
 * @LastEditTime: 2024-02-28 17:27:34
 * @Description:
 * @FilePath: \src\components\HCommonTable\src\HCommonTable.ts
 */
import type { TableProps } from 'ant-design-vue';

/**
 * 表格props类型
 */
export interface HTableProps {
  /**
   * antd-vue table的props的参数
   * @type TableProps
   */
  tableProps: TableProps;
  /**
   * 序号类型
   * @type noPage = 不加分页参数，一直是1开头
   * @type page = 加分页参数，计算分页与序号
   * @default noPage
   */
  indexType?: 'noPage' | 'page';
}
