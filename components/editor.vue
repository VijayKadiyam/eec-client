<template>
  <section>
    <ckeditor :editor="editor" v-model="html" :config="editorConfig"></ckeditor>
  </section>
</template>

<script type="text/javascript">
import Vue from 'vue'

export default {
  name: 'Editor',
  data: () => ({
    html: '',
    editor: '',
    editorConfig: {
      height: '800px',
      color: 'red',
      ckfinder: {
        uploadUrl: 'http://13.126.249.88:8088/ckfinder/connector?command=QuickUpload&type=Images&responseType=json'
      },
      
    },
  }),
  props: ['data'],
  watch: { 
    'html' : 'updateData',
    'data' : 'updateHtml'
  },
  created() {
    this.html = this.data
    var CKEDITOR = require("@ckeditor/ckeditor5-vue");
    Vue.use(CKEDITOR);

    var ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
    this.editor = ClassicEditor
  },
  methods: {
    updateData() {
      this.$emit('updateHtml', this.html)
    },
    updateHtml() {
      this.html = this.data
    },
  }
}
</script>