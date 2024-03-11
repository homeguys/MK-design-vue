/*
 * @Author: 王佳宾
 * @Date: 2023-03-29 10:07:35
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-09 17:26:45
 * @Description: 通用搜索组件类型
 * @FilePath: /packages/components/HQueryFilter/src/index.ts
 */

/**
 * 右侧按钮配置option
 */
export interface BtnOption {
  /**
   * 控制按钮显隐
   */
  visible: boolean /* 控制显隐 */;
  /**
   * 按钮的值
   */
  value?: string;
}

/**
 * 右侧按钮类型注解
 * @example
 * xx: BtnConfig = {
  [BtnKeys.reset]: {
    visible: true,
  },
  [BtnKeys.search]: {
    visible: true,
  },
  }
 */
export interface BtnConfig {
  /**
   * 查询
   * @type BtnOption|v-slot:search="{search}"
   */
  search?: BtnOption;
  /**
   * 重置
   * @type BtnOption|v-slot:reset="{reset}"
   */
  reset?: BtnOption;
}

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
  key: string;
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
   * 右方按钮列表
   */
  btnConfig?: BtnConfig;
  /**
   * 查询按钮是否loading
   * @default false
   */
  isLoading?: boolean;
  /**
   * 默认宽度
   */
  defaultWidth?: string;
}
