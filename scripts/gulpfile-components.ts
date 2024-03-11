/*
 * @Author: wanglei
 * @Date: 2023-11-29 19:43:25
 * @LastEditors: wanglei
 * @LastEditTime: 2024-02-03 17:00:29
 * @FilePath: /scripts/gulpfile-components.ts
 * @Descripttion: 组件打包
 * 执行命令pnpm run build:components
 */
import path from 'path';
import gulp from 'gulp';
import { defineConfig, build } from 'vite';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { chalkConsole, commonRemoveFile, batchCopyFiles, getDirname } from './utils';

const __dirname = getDirname();
const rootPath = path.resolve(__dirname, '../');
const packagePath = path.resolve(__dirname, '../packages');
const buildPath = path.resolve(__dirname, '../build/components');
const distPath = path.resolve(__dirname, '../build/components/dist');

const buildTypeOutputDir = path.resolve(__dirname, '../build/components/types');
const buildAllOutputDir = path.resolve(__dirname, '../build/components/dist');
const buildSingleLibOutputDir = path.resolve(__dirname, '../build/components/lib');
const buildSingleEsOutputDir = path.resolve(__dirname, '../build/components/es');

const { src, dest } = gulp;
const sass = gulpSass(dartSass);

// 基础打包配置
const baseConfig = defineConfig({
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      build: {
        rollupOptions: {
          external: ['vue', 'ant-design-vue', 'dayjs'],
          output: {
            exports: 'named',
            globals: {
              vue: 'vue',
              'ant-design-vue': 'ant-design-vue',
            },
          },
        },
        lib: {
          entry: `${packagePath}/components/entrance/index.ts`,
          name: 'hDesign',
          formats: ['es', 'umd'],
        },
        outDir: buildAllOutputDir,
      },
      publicDir: false,
      plugins: [
        vue(),
        vueJsx(),
        dts({
          tsconfigPath: '../tsconfig.app.json',
          outDir: [buildTypeOutputDir],
          staticImport: true,
          rollupTypes: true,
          entryRoot: '../packages',
        }),
      ],
    }),
  );
};

// 单包构建
const buildSingle = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions: {
          external: ['vue', 'ant-design-vue', 'dayjs'],
          input: [`${packagePath}/components/entrance/index.ts`],
          output: [
            {
              format: 'es',
              exports: 'named',
              entryFileNames: '[name].js',
              preserveModules: true,
              dir: buildSingleEsOutputDir,
              preserveModulesRoot: `${packagePath}/components`,
            },
            {
              format: 'cjs',
              exports: 'named',
              entryFileNames: '[name].js',
              preserveModules: true,
              dir: buildSingleLibOutputDir,
              preserveModulesRoot: `${packagePath}/components`,
            },
          ],
        },
        lib: {
          entry: path.resolve(packagePath, '/components/entrance/index.ts'),
          name: 'hDesign',
        },
      },
    }),
  );
};

const buildLib = async () => {
  await buildAll();
  await buildSingle();
};

// 打包组件
const buildComponent = async (done) => {
  try {
    await buildLib();
    done();
  } catch (error) {
    chalkConsole('red', '打包失败：', error);
    done();
  }
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

// 构建整体css
const buildRootStyle = () => {
  return src(`${packagePath}/components/entrance/style.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${distPath}`));
};

// 构建每个组件下单独的css
const buildStyle = () => {
  return src(`${packagePath}/components/**/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${buildPath}/es`))
    .pipe(dest(`${buildPath}/lib`));
};

// 复制配置文件到build文件夹
const copyConfigFiles = (done) => {
  const configFiles = [
    `${packagePath}/components/package.json`,
    `${rootPath}/global.d.ts`,
    `${rootPath}/README.md`,
  ];

  batchCopyFiles(configFiles, buildPath);
  done();
};

export default gulp.series(
  removeBuild,
  buildComponent,
  buildStyle,
  buildRootStyle,
  copyConfigFiles,
);
