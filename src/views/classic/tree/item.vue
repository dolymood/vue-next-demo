<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      {{model.name}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-if="isFolder" v-show="open">
      <tree-item
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </tree-item>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
import { set, get } from 'vue-reactivity-polyfill'

export default defineComponent({
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: Object
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFolder () {
      return get(this.model, 'children.length')
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },

    addChild () {
      /* eslint-disable vue/no-mutating-props */
      this.model.children.push({ name: 'new stuff' })
    },

    changeType () {
      if (!this.isFolder) {
        set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    }
  }
})
</script>
