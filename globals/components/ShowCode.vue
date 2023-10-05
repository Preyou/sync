<template>
  <code-block
    highlightjs
    persistent-copy-button
    lang="html"
    height="100%"
    :theme="false"
    :code-block-radius="0"
    class="[&_*]:whitespace-pre-wrap"
  />
</template>
<script setup lang="ts">
import CodeBlock from 'vue3-code-block'
import { useDark } from '@vueuse/core'
import MarkdownTheme from './MarkdownTheme.vue'
// import 'highlight.js/styles/base16/onedark.css'

const isDark = useDark()

defineOptions({
  extends: [CodeBlock],
})
</script>

<style>
.v-code-block--code {
  height: 100%;
}
</style>
