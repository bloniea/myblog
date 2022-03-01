<template>
  <div
    class="md-to-html"
    v-html="data.nHtml"
  >

  </div>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { watch, ref, reactive } from '@vue/runtime-core';
const props = defineProps({
  html: String
})
const data = reactive({
  nHtml: String
})
const mdToHtml = (html) => {
  return marked.parse(props.html, {
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  })
}
data.nHtml = mdToHtml(props.html)

watch(() => props.html,
  (html) => data.nHtml = mdToHtml(html))


</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>