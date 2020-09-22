<template>
  <div class="svgapp">
    <!-- Use the polygraph component -->
    <svg width="200" height="200">
      <polygraph :stats="stats"></polygraph>
    </svg>
    <!-- controls -->
    <div v-for="stat in stats" :key="stat.label">
      <label>{{stat.label}}</label>
      <input type="range" v-model="stat.value" min="0" max="100">
      <span>{{stat.value}}</span>
      <button @click="remove(stat)" class="remove">X</button>
    </div>
    <form id="add">
      <input name="newlabel" v-model="newLabel">
      <button @click="add">Add a Stat</button>
    </form>
    <pre id="raw">{{ stats }}</pre>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Polygraph from './svg/polygraph'

const globalStats = [
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
]

export default defineComponent({
  components: {
    Polygraph
  },
  data () {
    return {
      newLabel: '',
      stats: globalStats
    }
  },
  methods: {
    add (e) {
      e.preventDefault()
      if (!this.newLabel) return
      this.stats.push({
        label: this.newLabel,
        value: 100
      })
      this.newLabel = ''
    },
    remove (stat) {
      if (this.stats.length > 3) {
        this.stats.splice(this.stats.indexOf(stat), 1)
      } else {
        alert('Can\'t delete more!')
      }
    }
  }
})
</script>
<style>
.svgapp polygon {
    fill: #42b983;
    opacity: .75;
}

.svgapp circle {
    fill: transparent;
    stroke: #999;
}

.svgapp text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
}

.svgapp label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}

.svgapp #raw {
    position: absolute;
    top: 0;
    left: 300px;
}
</style>
