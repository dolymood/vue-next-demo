<template>
  <div>
    <p>(You can double click on an item to turn it into a folder.)</p>

    <!-- the app root element -->
    <ul id="demo">
      <tree-item class="item" :model="treeData"></tree-item>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import TreeItem from './tree/item'

const treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat2' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

export default defineComponent({
  components: {
    TreeItem
  },
  data: () => {
    return {
      treeData
    }
  }
})
</script>
<style scoped>
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
