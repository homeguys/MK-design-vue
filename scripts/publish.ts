/*
 * @Author: wanglei
 * @Date: 2023-11-29 19:43:25
 * @LastEditors: wanglei
 * @LastEditTime: 2023-12-05 11:33:51
 * @FilePath: /scripts/publish.ts
 * @Descripttion: 公共发布包文件
 * 执行命令：pnpm run publish --type xxx
 * 发包之前得先打包文件
 * 默认不加--type是发布components包
 */
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import inquirer from 'inquirer';
import { chalkConsole, getDirname, parseCommandLineArgs } from './utils';

const __dirname = getDirname();
const require = createRequire(import.meta.url);

const argvs: any = parseCommandLineArgs(process.argv);
const operatetype = argvs.type || 'components';
const isComponentsType = operatetype === 'components';

async function promptPublish1() {
  const questions = [
    {
      type: 'confirm',
      name: 'isBuild',
      message: '是否打包？',
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function promptPublish2() {
  const questions = [
    {
      type: 'list',
      name: 'versionType',
      message: '请选择版本类型:',
      choices: ['major', 'minor', 'patch'],
    },
    {
      type: 'confirm',
      name: 'isPublish',
      message: '是否发版？',
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function run() {
  const promptRes1 = await promptPublish1();

  if (promptRes1.isBuild) {
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
      return;
    }
  }

  const promptRes2 = await promptPublish2();

  if (!promptRes2.isPublish) {
    return;
  }

  const targetDirectory = path.resolve(__dirname, `../packages/${operatetype}`);
  const publishDirectory = path.resolve(__dirname, `../build/${operatetype}`);
  const oldPackageJsonPath = path.resolve(targetDirectory, './package.json');
  const newPackageJsonPath = path.resolve(publishDirectory, './package.json');
  const oldPackageJson = require(oldPackageJsonPath);

  function restorePackageJson() {
    fs.readFile(oldPackageJsonPath, 'utf8', (err, data) => {
      if (err) {
        chalkConsole('red', '读取packageJson失败：', err);
        return;
      }

      const packageJsonObj = JSON.parse(data);
      packageJsonObj.version = oldPackageJson.version;

      const packageJsonStr = JSON.stringify(packageJsonObj, null, 2);

      fs.writeFile(oldPackageJsonPath, packageJsonStr, 'utf8', (err) => {
        if (err) {
          chalkConsole('red', '写入packageJson失败：', err);
          
        }
      });
    });
  }

  process.chdir(targetDirectory);

  let versionType = '';
  switch (promptRes2.versionType) {
    case 'major':
      versionType = 'major';
      break;
    case 'minor':
      versionType = 'minor';
      break;
    case 'patch':
      versionType = 'patch';
      break;
    default:
      break;
  }

  /**
   * 根据条件升级版本号
   * */
  try {
    execSync(`pnpm version ${versionType}`, { stdio: 'inherit' });
  } catch (err) {
    chalkConsole('red', '更新版本号失败：', err);
    restorePackageJson();
    return;
  }

  /**
   * 将components内部package.json文件拷贝至build目录
   * */
  try {
    fs.copyFileSync(oldPackageJsonPath, newPackageJsonPath);
  } catch (err) {
    chalkConsole('red', 'packageJson拷贝失败：', err);
    restorePackageJson();
    return;
  }

  process.chdir(publishDirectory);

  try {
    const newPackageJson = require(newPackageJsonPath);

    /**
     * components打包文件夹发布之前需要修改packageJson的main和module
     */
    if (operatetype === 'components') {
      newPackageJson.main = 'es/entrance/index.js';
      newPackageJson.module = 'es/entrance/index.js';

      fs.writeFileSync(newPackageJsonPath, JSON.stringify(newPackageJson, null, 2));
    }

    execSync('npm publish', { stdio: 'inherit' });
    chalkConsole('green', `npm包已成功发布，新版本号：${newPackageJson.version}`);
  } catch (error) {
    restorePackageJson();
  }
}

run();
