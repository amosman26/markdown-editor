<template>
    <div class="editor-container">
      <textarea v-model="markdown" placeholder="Enter Markdown text"></textarea>
      <div v-html="compiledMarkdown" class="preview"></div>
    </div>
    <input v-model="title" placeholder="Document Title" />
    <button @click="saveDocument">Save Document</button>
    <div class="document-list">
      <h3>Saved Documents</h3>
      <ul>
        <li v-for="doc in documents" :key="doc.id" @click="loadDocument(doc)">
          {{ doc.title }}
        </li>
      </ul>
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
  