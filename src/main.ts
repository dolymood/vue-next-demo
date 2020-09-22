import 'whatwg-fetch'
import 'vue-reactivity-polyfill-getownpropertynames'
import 'vue-reactivity-polyfill'
import { createApp } from 'vue'
import { createPolyfillPlugin } from 'vue3-plugin-polyfill'
import App from './App.vue'

const polyfillPlugin = createPolyfillPlugin()

const app = createApp(App, {
  myroot: 1,
  xRoot: 2
})

app.use(polyfillPlugin).mount('#app')
