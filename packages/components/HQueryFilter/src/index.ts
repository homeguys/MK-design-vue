/*
 * @Author: 王佳宾
 * @Date: 2023-03-29 10:07:35
 * @LastEditors: wanglei
 * @LastEditTime: 2024-04-19 10:12:30
 * @Description: 通用搜索组件类型
 * @FilePath: \packages\components\HQueryFilter\src\index.ts
 */

/**
 * 数据源列表配置
 * @example
 * reactive<DataSource[]>([
  {
    type: 'input',
    label: '规则名称:',
    value: '',
    key: 'ruleName',
    option: {
      placeholder: '请输入规则名称',
    },
  }])
 */
export interface DataSource {
  /**
   * 显示的文本
   */
  label?: string;
  /**
   * 双向绑定的值
   */
  value: any;
  /**
   * 唯一的key - 同时是请求后台的key
   */
  key: string | string[];
  /**
   * 类型控制标签
   */
  type: 'select' | 'input' | 'datePicker' | 'rangePicker';
  /**
   * 额外附加参数
   */
  option?: { [ele: string]: any };
}

/**
 * 组件Props
 */
export interface HQueryFilter {
  /**
   * 是否启用折叠功能
   * @default true
   */
  showCollapsed?: boolean;
  /**
   * 是否展开所有查询条件
   * @default false
   */
  collapsed?: boolean;
  /**
   * 是否显示左侧label
   * @default false
   */
  showLabel?: boolean;
  /**
   * 查询条件
   */
  dataSource: Array<DataSource>;
  /**
   * 是否在dataSource初始化之后发起查询事件
   * @default false
   */
  initRequest?: boolean;
  /**
   * 查询按钮是否loading
   * @default false
   */
  isLoading?: boolean;
  /**
   * 默认宽度
   */
  defaultWidth?: number | string;
  /**
   * 查询按钮文字
   * @default 查询
   */
  searchText?: string;
  /**
   * 重置按钮文字
   * @default 重置
   */
  resetText?: string;
  /**
   * 是否展示查询按钮
   * @default true
   */
  isShowSearchBtn?: boolean;
  /**
   * 是否展示重置按钮
   * @default true
   */
  isShowResetBtn?: boolean;
}
