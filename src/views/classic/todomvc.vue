<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
                autofocus autocomplete="off"
                placeholder="What needs to be done?"
                v-model="newTodo"
                @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li v-for="todo in filteredTodos"
              class="todo"
              :key="todo.id"
              :class="{ completed: todo.completed, editing: todo === editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text"
                    v-model="todo.title"
                    v-todo-focus="todo === editedTodo"
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.escape="cancelEdit(todo)"
            >
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <strong>{{ remaining }}</strong>
            <span>{{ remainingText }}</span>
          </span>
        <ul class="filters">
          <li><a href="javascript:;" @click="visibility = 'all'" :class="{ selected: visibility === 'all' }">All</a></li>
          <li><a href="javascript:;" @click="visibility = 'active'" :class="{ selected: visibility === 'active' }">Active</a></li>
          <li><a href="javascript:;" @click="visibility = 'completed'" :class="{ selected: visibility === 'completed' }">Completed</a></li>
        </ul>

        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

const STORAGE_KEY = 'todos-vuejs-3.x'
const todoStorage = {
  fetch () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const filters = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },
  completed (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

function pluralize (n) {
  return n === 1 ? 'item' : 'items'
}

export default defineComponent({
  data () {
    return {
      todos: todoStorage.fetch(),
      editedTodo: null,
      newTodo: '',
      beforeEditCache: '',
      visibility: 'all'
    }
  },
  computed: {
    remaining () {
      return filters.active(this.todos).length
    },
    remainingText () {
      return ` ${pluralize(this.remaining)} left`
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach((todo) => {
          todo.completed = value
        })
      }
    }
  },
  watch: {
    todos () {
      todoStorage.save(this.todos)
    }
  },
  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted () {
      this.todos = filters.active(this.todos)
    }
  },

  directives: {
    'todo-focus': (el, { value }) => {
      if (value) {
        el.focus()
      }
    }
  }
})
</script>
<style scoped>
@import url('~todomvc-app-css/index.css');
.todoapp {
  position: relative;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #111111;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  font-weight: 300;
}
</style>
