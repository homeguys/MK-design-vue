<!--
 * @Author: wanglei
 * @Date: 2023-12-06 10:33:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-11 10:39:39
 * @FilePath: \docs\zh-CN\utils\formatLargeNum.md
 * @Descripttion:
-->

# formatLargeNum

### 处理数值过大超长数字，优化展示效果

超长数字展示问题优化，通过万、百万、千万、亿优化展示。如果需要展示精确数值，通过tooltip展示或者其他交互方式。

#### 使用

```ts
/**
 * @param {number} num 需要处理的数值
 * @param {number} decimal 需要保留的小数位（只有数值是小数才保留）
 * @returns {string | undefined} 处理后的数值 + 单位字符串
 */
formatLargeNum(num: number, decimal = 2)
```

#### 例子

```js
formatLargeNum(1234567890);
// => "12.35亿"
formatLargeNum(12345678, 2);
// => "1234.57万"
formatLargeNum(1234567);
// => "123.46万"
formatLargeNum(1234);
// => "1234"
formatLargeNum(123);
// => "123"
formatLargeNum(1234567890.12, 3);
// => "12.346亿"
formatLargeNum(987654.321, 2);
// => "98.77万"
formatLargeNum(1.001, 2);
// => "1.00"
formatLargeNum(10001);
// => "1.00万"
formatLargeNum(1000000);
// => "100.00万"
formatLargeNum(10000000);
// => "1.00千万"
formatLargeNum(100000000);
// => "1.00亿"
```
