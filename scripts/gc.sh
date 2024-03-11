#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)
DOC_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$(echo "${NAME:1}")

# 使用tr命令将$NAME变量转换为小写
LOWER_KEBAB_NAME=$(echo "$NAME" | sed 's/\(.\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')
LOWER_NAME=$(echo "$INPUT_NAME" |  tr '[:upper:]' '[:lower:]')

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"
mkdir -p "$DIRNAME/style"
mkdir -p "$DOC_PATH/examples/$NAME"
mkdir -p "$DOC_PATH/zh-CN/components/$NAME"

cat > $DIRNAME/src/index.vue <<EOF
<template>
  <section class="$LOWER_KEBAB_NAME">
    ${NAME}
  </section>
</template>

<script lang="ts" setup>
import { ${NAME}Props } from './index'

import '../style/index.scss'

defineOptions({
  name: '${NAME}',
})

const props = defineProps(${NAME}Props)
</script>
EOF

cat > $DIRNAME/src/index.ts <<EOF
/**
 * 定义props类型
 */
export const ${NAME}Props = {
}
EOF

cat <<EOF >"$DIRNAME/index.ts"
import { withInstall } from '@htht/utils'
import $INPUT_NAME from './src/index.vue'

export const $NAME = withInstall($INPUT_NAME)
export default $NAME

export * from './src/index'
export * from './src/index.vue'
EOF

cat <<EOF >"$DIRNAME/style/index.scss"
.$LOWER_KEBAB_NAME {}
EOF

cat <<EOF >"$DOC_PATH/examples/$NAME/index.vue"
<template>
  <$NAME />
</template>

<script setup>
import { $NAME } from "@htht/components";
import '@htht/components/$NAME/style/index.scss'
</script>
EOF

cat <<EOF >"$DOC_PATH/zh-CN/components/$NAME/index.md"
# $NAME

:::demo 

$NAME/index

:::

## $NAME API

### $NAME Attributes

| 参数     | 描述                   | 类型         | 默认值           | 版本     |
| -------- | --------------------- | ----------- | --------------- |---------|
| xxxxx    | xxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxxx | —               |  1.0.0  |
EOF

