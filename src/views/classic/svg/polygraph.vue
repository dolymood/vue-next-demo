<template>
  <g>
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label
      v-for="(stat, index) in stats"
      :key="index"
      :stat="stat"
      :index="index"
      :total="stats.length">
    </axis-label>
  </g>
</template>

<script>
import AxisLabel, { valueToPoint } from './label'
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['stats'],
  computed: {
    points () {
      const total = this.stats.length
      return this.stats.map((stat, i) => {
        const point = valueToPoint(stat.value, i, total)
        return point.x + ',' + point.y
      }).join(' ')
    }
  },
  components: {
    AxisLabel
  }
})
</script>
