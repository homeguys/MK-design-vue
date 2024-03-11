import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import prettier from 'prettier';

/**
 * @description: 从文件路径中获取文件名和后缀名
 * @param {string} filePath 文件路径
 * @returns {object} 返回包含文件名、文件后缀和带文件后缀的文件名的对象
 */
function getFileNameAndExtension(filePath: string) {
  const { name, ext, base } = path.parse(filePath);
  return { fileName: name, fileExt: ext.slice(1), fileBase: base };
}

/**
 * @description: chalk打印
 * @param {string} color chalk打印颜色
 * @param {string} value 打印的信息内容
 * @param {object} err 报错信息
 * @returns {void} 控制台打印对应信息
 */
const chalkConsole = (color: string, value: string, err?: any) => {
  let icon = '';
  switch (color) {
    case 'green':
      icon = '✅';
      break;
    case 'red':
      icon = '❌';
      break;
    default:
      break;
  }

  console.log(`${icon} ${chalk[color].bold(`${value}`)}`);

  if (err) {
    console.log(chalk[color](err));
  }
};

/**
 * @description: 删除打包产物
 * @param {string} removePath 删除的目录路径
 * @returns {void}
 */
const commonRemoveFile = (removePath: string) => {
  return new Promise<void>((resolve, reject) => {
    const { fileBase } = getFileNameAndExtension(removePath);

    try {
      fs.accessSync(removePath, fs.constants.F_OK);
      fs.rm(removePath, { recursive: true }, (err) => {
        if (err) {
          chalkConsole('red', `${fileBase} 删除失败：`, err);
          reject(err);
        } else {
          chalkConsole('green', `${fileBase} 删除成功～`);
          resolve();
        }
      });
    } catch (err) {
      chalkConsole('red', `${fileBase} 删除失败：`, err);
      reject(err);
    }
  });
};

/**
 * @description: 复制文件
 * @param {string} oldFilePath 拷贝源目录路径
 * @param {string} newFilePath 目标目录路径
 * @returns {void}
 */
const commonCopyFile = (oldFilePath: string, newFilePath: string) => {
  const { fileBase } = getFileNameAndExtension(oldFilePath);
  try {
    fs.copyFileSync(oldFilePath, newFilePath);
  } catch (err) {
    chalkConsole('red', `${fileBase} 拷贝失败：`, err);
  }
};

/**
 * @description: 根据文件路径获取不同的prettier parser
 * @param {string} filePath 需要格式化文件的路径
 * @returns {void}
 */
const getParser = (filePath: string) => {
  const { fileExt } = getFileNameAndExtension(filePath);

  switch (fileExt) {
    case 'ts':
      return 'typescript';
    case 'scss':
      return 'scss';
    default:
      return 'typescript';
  }
};

type FnType = (data: string) => string;

/**
 * @description: 编辑文件
 * @param {string} filePath 需要编辑文件的路径
 * @param {FnType} callback 编辑完成后的回调函数
 * @returns {void}
 */
const commonEditFile = (filePath: string, callback: FnType) => {
  if (!filePath) {
    return;
  }
  return new Promise<void>((resolve, reject) => {
    fs.readFile(filePath, 'utf8', async (err, data) => {
      const { fileBase } = getFileNameAndExtension(filePath);

      if (err) {
        chalkConsole('red', `${fileBase} 读取失败：`, err);
        reject(err);
      }

      let updatedContent = callback(data);
      const parser = getParser(filePath);

      updatedContent = await prettier.format(updatedContent, {
        parser,
        semi: true,
        singleQuote: true,
      });

      // 写入编辑后的内容
      fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
          chalkConsole('red', `${fileBase} 编辑失败：`, err);
          reject(err);
        } else {
          chalkConsole('green', `${fileBase} 编辑成功～`);
          resolve();
        }
      });
    });
  });
};

/**
 * @description: 批量复制配置文件
 * @param {array} configFiles 需要复制的文件列表
 * @param {string} buildPath 需要把配置文件拷贝的打包目录路径
 * @returns {void}
 */
const batchCopyFiles = (configFiles: string[], buildPath: string) => {
  configFiles.forEach((item) => {
    const splitItems = item.split('/');
    const len = item.split('/').length;
    const newFilePath = `${buildPath}/${splitItems[len - 1]}`;
    commonCopyFile(item, newFilePath);
  });
};

/**
 * @description: 模拟nodejs环境__dirname
 * @returns {string} __dirname
 */
const getDirname = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return __dirname;
};

/**
 * @description: 解析命令行参数
 * @param {string[]} 命令行参数
 * @returns {object} 解析后的命令行参数对象
 */
function parseCommandLineArgs(argv) {
  const args = {};

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith('--')) {
      const keyValue = arg.slice(2).split('=');
      const key = keyValue[0];
      const value = keyValue.length > 1 ? keyValue[1] : true;
      args[key] = value;
    }
  }
  return args;
}

/**
 * @description: 获取文件夹下所有一级子文件夹的名称
 * @param {string} dirPath 文件夹路径
 * @returns {array} 所有一级子文件夹的名称
 */
function getFolderNames(dirPath) {
  const folders: string[] = [];

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      folders.push(file);
    }
  });

  return folders;
}

export {
  chalkConsole,
  getFileNameAndExtension,
  commonRemoveFile,
  commonCopyFile,
  commonEditFile,
  batchCopyFiles,
  getDirname,
  parseCommandLineArgs,
  getFolderNames,
};
