/*
 * @Author: wanglei
 * @Date: 2023-11-29 19:43:25
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-05 13:17:21
 * @FilePath: /scripts/build.ts
 * @Descripttion: 组件打包
 */
import { execSync } from 'child_process';
import { chalkConsole, parseCommandLineArgs } from './utils';

const argvs: any = parseCommandLineArgs(process.argv);
const operatetype = argvs.type || 'components';
const isComponentsType = operatetype === 'components';

try {
  if (isComponentsType) {
    execSync('gulp --require @esbuild-kit/cjs-loader -f scripts/gulpfile-components.ts', {
      stdio: 'inherit',
    });
  } else {
    execSync(
      `gulp --require @esbuild-kit/cjs-loader -f scripts/gulpfile.ts --type=${operatetype}`,
      { stdio: 'inherit' },
    );
  }

  chalkConsole('green', `${operatetype} 打包完成～`);
} catch (err) {
  chalkConsole('red', `${operatetype} 打包失败：`, err);
}
