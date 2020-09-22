<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div v-html="output"></div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import _ from 'lodash'
import marked from 'marked'

const delay = window.location.hash === '#test' ? 16 : 300

export default defineComponent({
  setup () {
    const input = ref('# hello')
    const output = computed(() => marked(input.value, { sanitize: true }))
    const update = _.debounce(e => { input.value = e.target.value }, delay)

    return {
      input,
      output,
      update
    }
  }
})
</script>
<style scoped>
#editor {
  margin: 0;
  height: 400px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

#editor textarea, #editor div {
  display: inline-block;
  overflow: auto;
  width: 50%;
  height: 100%;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px;
}

#editor textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

#editor code {
  color: #f66;
}
</style>
