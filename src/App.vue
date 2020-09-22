<template>
  <div>
    <!-- <pre>{{$attrs}}</pre> -->
    <!-- <pre>{{$route}}</pre> -->
    <div id="nav">
      <a href="javascript:;" v-for="conf in routes" :key="conf.path"  @click="goto(conf.path)">{{ conf.path }}</a>
    </div>
    <component :is="view" />
    <div id="modal-container"></div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, ref, markRaw } from 'vue'
import compositionConf from './router/composition'
import classicConf from './router/classic'
import transitionConf from './router/transition'

export default defineComponent({
  setup () {
    const current = ref('/')
    const routes = reactive(markRaw([{ path: '/' }].concat(compositionConf, classicConf, transitionConf)))
    const view = computed(() => {
      let currentComponent = ''
      routes.forEach((route) => {
        if (route.path === current.value) {
          currentComponent = route.component
        }
      })
      return currentComponent
    })
    function goto (path) {
      current.value = path
    }
    return {
      routes,
      view,
      goto
    }
  }
})
</script>

<style lang="stylus">
#nav
  a
    display block
/* reset */
html body
  font-size: 16px
  line-height: unset
  background: unset
  color: unset
  min-width: 0
  max-width: none
  margin: auto
</style>
