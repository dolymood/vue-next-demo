import CompositionCommits from '../../views/composition/commits.vue'
import CompositionGrid from '../../views/composition/grid.vue'
import CompositionMarkdown from '../../views/composition/markdown.vue'
import CompositionSvg from '../../views/composition/svg.vue'
import CompositionTodomvc from '../../views/composition/todomvc.vue'
import CompositionTree from '../../views/composition/tree.vue'

export default [
  {
    path: '/composition/commits',
    component: CompositionCommits
  },
  {
    path: '/composition/grid',
    component: CompositionGrid
  },
  {
    path: '/composition/markdown',
    component: CompositionMarkdown
  },
  {
    path: '/composition/svg',
    component: CompositionSvg
  },
  {
    path: '/composition/todomvc',
    component: CompositionTodomvc
  },
  {
    path: '/composition/tree',
    component: CompositionTree
  }
]
