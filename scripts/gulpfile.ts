/*
 * @Author: wanglei
 * @Date: 2023-11-29 19:43:25
 * @LastEditors: wanglei
 * @LastEditTime: 2024-03-06 18:55:39
 * @FilePath: /scripts/gulpfile.ts
 * @Descripttion: 公共打包文件
 * 执行命令pnpm run build --type=xxx
 * 默认不加--type是打包utils
 */
import path from 'path';
import gulp from 'gulp';
import { defineConfig, build } from 'vite';
import { commonRemoveFile, batchCopyFiles, getDirname, parseCommandLineArgs } from './utils';

const { series } = gulp;
const __dirname = getDirname();
const argvs: any = parseCommandLineArgs(process.argv);
const buildType = argvs.type || 'utils';
const buildPath = path.resolve(__dirname, `../build/${buildType}`);
const packagePath = path.resolve(__dirname, '../packages');

// 构建整体
const buildPackage = async (done) => {
  await build(
    defineConfig({
      build: {
        rollupOptions: {
          input: [`${packagePath}/${buildType}/index.ts`],
          output: [
            {
              format: 'cjs',
              entryFileNames: '[name].js',
              preserveModules: true,
              dir: buildPath,
              preserveModulesRoot: `${packagePath}/${buildType}`,
            },
          ],
        },
        lib: {
          entry: path.resolve(packagePath, `/${buildType}/index.ts`),
        },
      },
    }),
  );

  done();
};

// 删除构建的包
const removeBuild = async (done) => {
  try {
    await commonRemoveFile(buildPath);
    done();
  } catch (error) {
    done();
  }
};

// 复制配置文件到build文件夹
const copyConfigFiles = (done) => {
  const configFiles = [
    `${packagePath}/${buildType}/package.json`,
    `${packagePath}/${buildType}/README.md`,
    `${packagePath}/${buildType}/index.d.ts`,
  ];
  batchCopyFiles(configFiles, buildPath);
  done();
};

export default series(removeBuild, buildPackage, copyConfigFiles);
