<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-4xl flex mt-8 space-x-4">
      <!-- Markdown Input Area -->
      <textarea v-model="markdown" 
                class="w-1/2 p-4 border border-gray-300 rounded-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Markdown text"></textarea>
      
      <!-- Markdown Preview Area -->
      <div v-html="compiledMarkdown" 
           class="w-1/2 p-4 border border-gray-300 rounded-lg shadow bg-white markdown-preview prose prose-lg"></div>
    </div>
    <div class="w-full max-w-4xl mt-4">
      <input v-model="title" 
             class="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
             placeholder="Document Title" />
      <button @click="saveDocument" 
              class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Save Document
      </button>
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800">Saved Documents</h3>
        <ul class="list-none mt-2">
          <li v-for="doc in documents" :key="doc.id" 
              @click="loadDocument(doc)"
              class="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100">
            {{ doc.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
  data() {
    return {
      markdown: '',
      title: '',
      documents: []
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
  },
  async created() {
    const response = await fetch('http://localhost:5000/documents');
    this.documents = await response.json();
  },
  methods: {
    loadDocument(doc) {
      this.markdown = doc.content;
      this.title = doc.title;
    },
    async saveDocument() {
      const response = await fetch('http://localhost:5000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.title,
          content: this.markdown
        })
      });
      const newDoc = await response.json();
      this.documents.unshift(newDoc);
      this.title = '';
      this.markdown = '';
    }
  }
};
</script>

<style scoped>
/* GitHub-like markdown styling */
.markdown-preview h1 {
  font-size: 2em;
  font-weight: 600;
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 0.3em;
  margin-bottom: 1em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  font-weight: 600;
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 0.3em;
  margin-bottom: 1em;
}

.markdown-preview h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin-bottom: 1em;
}

.markdown-preview h4, .markdown-preview h5, .markdown-preview h6 {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.markdown-preview p {
  margin-bottom: 1.25em;
  line-height: 1.6;
}

.markdown-preview code {
  background-color: rgba(27,31,35,0.05);
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  border-radius: 3px;
}

.markdown-preview pre {
  background-color: #f6f8fa;
  padding: 16px;
  font-size: 85%;
  line-height: 1.45;
  border-radius: 3px;
  overflow: auto;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
}

.markdown-preview blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin-bottom: 1.25em;
}

.markdown-preview a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-preview a:hover {
  text-decoration: underline;
}

.markdown-preview ul, .markdown-preview ol {
  margin-bottom: 1.25em;
  padding-left: 2em;
}

.markdown-preview ul > li {
  list-style-type: disc;
}

.markdown-preview ol > li {
  list-style-type: decimal;
}
</style>
