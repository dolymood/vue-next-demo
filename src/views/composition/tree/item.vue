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
<script lang="ts">
import { defineComponent, reactive, computed, toRefs, PropType } from 'vue'
import { get, set } from 'vue-reactivity-polyfill'

type Model = {
  name: string;
  children?: Model[];
}

export default defineComponent({
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: {
      type: Object as PropType<Model>,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      open: false,
      isFolder: computed<number | undefined>(() => {
        return get(props.model, ['children', 'length'])
      })
    })

    function toggle () {
      state.open = !state.open
    }

    function addChild () {
      /* eslint-disable vue/no-mutating-props */
      props.model.children!.push({ name: 'new stuff' })
    }

    function changeType () {
      if (!state.isFolder) {
        set(props.model, 'children', [])
        addChild()
        state.open = true
      }
    }

    return {
      ...toRefs(state),
      toggle,
      changeType,
      addChild
    }
  }
})
</script>
