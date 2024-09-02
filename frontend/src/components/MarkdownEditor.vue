<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-7xl flex mt-8 space-x-4">
      <textarea v-model="markdown" class="w-1/2 p-4 border rounded-lg shadow" placeholder="Enter Markdown text"></textarea>
      <div v-html="compiledMarkdown" class="w-1/2 p-4 border rounded-lg shadow bg-gray-50 overflow-x-auto"></div>
    </div>
    <div class="w-full max-w-7xl mt-4">
      <input v-model="title" class="w-full p-2 border rounded-lg mb-2" placeholder="Document Title" />
      <button @click="saveDocument" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Save Document
      </button>
      <div class="mt-6">
        <h3 class="text-xl font-semibold">Saved Documents</h3>
        <ul class="list-none mt-2">
          <li v-for="doc in documents" :key="doc.id" @click="loadDocument(doc)"
              class="cursor-pointer p-2 border-b hover:bg-gray-100">
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
  .document-list {
    margin-top: 1rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    cursor: pointer;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  li:hover {
    background-color: #f0f0f0;
  }
  </style>
  