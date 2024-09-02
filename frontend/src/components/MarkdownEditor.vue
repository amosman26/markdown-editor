<template>
  <div class="editor-container">
    <textarea v-model="markdown" placeholder="Enter Markdown text"></textarea>
    <div v-html="compiledMarkdown" class="preview"></div>
  </div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
  data() {
    return {
      markdown: ''
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.markdown, {
        highlight: (code, lang) => {
          return hljs.highlightAuto(code, [lang]).value;
        },
      });
    }
  }
};
</script>

<style scoped>
.editor-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
textarea {
  width: 48%;
  height: 80vh;
}
.preview {
  width: 48%;
  height: 80vh;
  border: 1px solid #ddd;
  padding: 1rem;
  background: #f9f9f9;
}
</style>
