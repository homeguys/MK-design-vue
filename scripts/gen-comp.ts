//@ts-nocheck
import { execSync } from 'child_process';
import path from 'path';
import inquirer from 'inquirer';
import _ from 'lodash-es';
import { sidebar } from '@htht/docs/.vitepress/configs/sidebar';
import {
  chalkConsole,
  getDirname,
  commonEditFile,
  commonRemoveFile,
  getFolderNames,
} from './utils';

const __dirname = getDirname();
const componentsPath = path.resolve(__dirname, '../packages/components');
const docsPath = path.resolve(__dirname, '../docs');
const componentsEntrancePath = `${componentsPath}/entrance`;
const installsJsPath = `${componentsEntrancePath}/installs.ts`;
const componentsJsPath = `${componentsEntrancePath}/components.ts`;
const stylePath = `${componentsEntrancePath}/style.scss`;
const examplesPath = `${docsPath}/examples`;
const zhCNPath = `${docsPath}/zh-CN`;
const sidebarPath = `${docsPath}/.vitepress/configs/sidebar.ts`;

async function promptGenComp1() {
  const questions = [
    {
      type: 'list',
      name: 'operateType',
      message: '请选择操作类型:',
      choices: [
        { name: '新增组件', value: 1 },
        { name: '删除组件', value: 2 },
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function promptGenComp2(questions) {
  const answers = await inquirer.prompt(questions);

  return answers;
}

async function run() {
  const promptRes1 = await promptGenComp1();
  let promptQuestions: any = [];
  const { operateType } = promptRes1 || {};

  if (operateType === 1) {
    promptQuestions = [
      {
        type: 'input',
        name: 'name',
        message: '请输入组件英文名称(如:query-filter):',
      },
      {
        type: 'input',
        name: 'nameCN',
        message: '请输入组件中文名称(如：表格查询筛选):',
      },
    ];
  } else {
    const folderNames = getFolderNames(componentsPath).filter((item) => _.startsWith(item, 'H'));

    promptQuestions = [
      {
        type: 'list',
        name: 'name',
        message: '请选择组件名称:',
        choices: folderNames,
      },
    ];
  }

  promptQuestions.push({
    type: 'confirm',
    name: 'isSure',
    message: '是否确认？',
  });

  const promptRes2 = await promptGenComp2(promptQuestions);
  const { name, nameCN, isSure } = promptRes2 || {};

  if (!isSure) {
    return;
  }

  const promptName = _.startsWith(name, 'H') ? name.substring(1) : name;
  const upperName = _.upperFirst(_.camelCase(promptName));
  const componentName = `H${upperName}`;

  if (operateType === 1) {
    try {
      execSync(`bash ./scripts/gc.sh ${componentName}`, { stdio: 'inherit' });
      chalkConsole('green', `创建组件 ${componentName} 成功~`);
    } catch (error) {
      chalkConsole('red', `创建组件 ${componentName} 失败：`, error);
      return;
    }

    try {
      await commonEditFile(installsJsPath, (data) => {
        const newImportStatement = `import ${componentName} from '../${componentName}';`;
        let updatedContent = data.replace(
          /(import .*? from ['"].*?['"];)(?![\s\S]*import .*? from ['"].*?['"])/,
          `$1\n${newImportStatement}`,
        );

        updatedContent = updatedContent.replace(
          /(export default \[([\s\S]*?)\];)/,
          (match, p1, p2) => {
            const elements = p2
              .trim()
              .split(',')
              .map((e) => e.trim());
            elements.push(componentName);
            return `export default [\n${elements.join(',\n')}\n];`;
          },
        );

        return updatedContent;
      });
    } catch (err) {}

    try {
      await commonEditFile(componentsJsPath, (data) => {
        const newExportStatement = `export * from '../${componentName}';`;
        const updatedContent = `${data}${newExportStatement}`;

        return updatedContent;
      });
    } catch (err) {}

    try {
      await commonEditFile(stylePath, (data) => {
        const newExportStatement = `@import "../${componentName}/style/index.scss";`;
        const updatedContent = `${data}${newExportStatement}`;

        return updatedContent;
      });
    } catch (err) {}

    try {
      if (sidebar) {
        const newRouteLink = {
          text: `${componentName} - ${nameCN}`,
          link: `/zh-CN/components/${componentName}/index.md`,
        };
        sidebar['/zh-CN/components/'][1].items.push(newRouteLink);

        await commonEditFile(sidebarPath, () => {
          const str = `import type { DefaultTheme } from 'vitepress';\n
          export const sidebar: DefaultTheme.Config['sidebar'] = `;
          const updateContent = `${str}${JSON.stringify(sidebar)}`;

          return updateContent;
        });
      }
    } catch (error) {}
  } else {
    const componentPath = `${componentsPath}/${componentName}`;
    const examplesCompPath = `${examplesPath}/${componentName}`;
    const zhCNCompPath = `${zhCNPath}/components/${componentName}`;

    try {
      await commonRemoveFile(componentPath);
      await commonRemoveFile(examplesCompPath);
      await commonRemoveFile(zhCNCompPath);

      await commonEditFile(installsJsPath, (data) => {
        const importToRemoveRegex = new RegExp(
          `import ${componentName} from '../${componentName}';\\n`,
        );

        let updatedContent = data.replace(importToRemoveRegex, '');

        updatedContent = updatedContent.replace(
          /(export default \[([\s\S]*?)\];)/,
          (match, p1, p2) => {
            let elements = p2
              .trim()
              .split(',')
              .map((e) => e.trim());

            elements = elements.filter((item) => item !== componentName);
            return `export default [\n${elements.join(',\n')}\n];`;
          },
        );

        return updatedContent;
      });

      await commonEditFile(componentsJsPath, (data) => {
        const exportToRemoveRegex = new RegExp(`export \\* from '../${componentName}';\\n`);
        const updatedContent = data.replace(exportToRemoveRegex, '');

        return updatedContent;
      });

      await commonEditFile(stylePath, (data) => {
        const importToRemoveRegex = new RegExp(
          `@import '../${componentName}/style/index.scss';\\n`,
        );

        const updatedContent = data.replace(importToRemoveRegex, '');

        return updatedContent;
      });

      try {
        if (sidebar) {
          sidebar['/zh-CN/components/'][1].items = sidebar['/zh-CN/components/'][1].items.filter(
            (item) => {
              return !item.text.includes(componentName);
            },
          );

          await commonEditFile(sidebarPath, () => {
            const str = `import type { DefaultTheme } from 'vitepress';\n
            export const sidebar: DefaultTheme.Config['sidebar'] = `;
            const updateContent = `${str}${JSON.stringify(sidebar)}`;

            return updateContent;
          });
        }
      } catch (error) {}

      chalkConsole('green', `组件 ${componentName} 删除成功，入口文件已恢复`);
    } catch (err) {
      chalkConsole('red', `组件 ${componentName} 删除失败：`, err);
    }
  }
}

run();
