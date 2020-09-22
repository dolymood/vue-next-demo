<template>
  <div class="commitsapp">
    <h1>Latest Vue.js Commits</h1>
    <div v-for="branch in branches" :key="branch">
      <input type="radio"
        :id="branch"
        :value="branch"
        name="branch"
        v-model="currentBranch">
      <label :for="branch">{{ branch }}</label>
    </div>
    <p>vuejs/vue@{{ currentBranch }}</p>
    <ul>
      <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
        <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
        - <span class="message">{{ truncate(commit.message) }}</span><br>
        by <span class="author"><a :href="author.html_url" target="_blank">{{ commit.author.name }}</a></span>
        at <span class="date">{{ formatDate(commit.author.date) }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
const API_URL = 'https://api.github.com/repos/vuejs/vue-next/commits?per_page=3&sha='

export default defineComponent({
  data: () => ({
    branches: ['master', 'sync'],
    currentBranch: 'master',
    commits: []
  }),

  created () {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    fetchData () {
      fetch(`${API_URL}${this.currentBranch}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            this.commits = data
          } else {
            this.commits = []
          }
        })
    },
    truncate (v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate (v) {
      return v.replace(/T|Z/g, ' ')
    }
  }
})
</script>

<style scoped>
.commitsapp  a {
    text-decoration: none;
    color: #f66;
  }
.commitsapp  li {
    line-height: 1.5em;
    margin-bottom: 20px;
  }
.commitsapp  .author, .date {
    font-weight: bold;
  }
</style>
