import ClassicCommits from '../../views/classic/commits.vue'
import ClassicGrid from '../../views/classic/grid.vue'
import ClassicMarkdown from '../../views/classic/markdown.vue'
import ClassicSvg from '../../views/classic/svg.vue'
import ClassicTodomvc from '../../views/classic/todomvc.vue'
import ClassicTree from '../../views/classic/tree.vue'

export default [
  {
    path: '/classic/commits',
    component: ClassicCommits
  },
  {
    path: '/classic/grid',
    component: ClassicGrid
  },
  {
    path: '/classic/markdown',
    component: ClassicMarkdown
  },
  {
    path: '/classic/svg',
    component: ClassicSvg
  },
  {
    path: '/classic/todomvc',
    component: ClassicTodomvc
  },
  {
    path: '/classic/tree',
    component: ClassicTree
  }
]
