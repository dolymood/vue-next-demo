import { createRouter, createWebHashHistory } from 'vue-router'
import compositionConfig from './composition'
import classicConfig from './classic'
import transitionConfig from './transition'

const routes = [
  ...compositionConfig,
  ...classicConfig,
  ...transitionConfig
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
