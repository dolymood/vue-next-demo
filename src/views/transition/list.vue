<template>
  <div class="listapp">
    <button @click="insert">insert at random index</button>
    <button @click="reset">reset</button>
    <button @click="shuffle">shuffle</button>
    <transition-group tag="ul" name="fade" class="container">
      <item v-for="item in items"
        class="item"
        :msg="item"
        :key="item"
        @rm="remove(item)">
      </item>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import _ from 'lodash'
import Item from './list/item'

const getInitialItems = () => [1, 2, 3, 4, 5]
let id = getInitialItems().length + 1

export default defineComponent({
  components: {
    Item
  },
  data () {
    return {
      items: getInitialItems()
    }
  },
  methods: {
    insert () {
      const i = Math.round(Math.random() * this.items.length)
      this.items.splice(i, 0, id++)
    },
    reset () {
      this.items = getInitialItems()
    },
    shuffle () {
      this.items = _.shuffle(this.items)
    },
    remove (item) {
      const i = this.items.indexOf(item)
      if (i > -1) {
        this.items.splice(i, 1)
      }
    }
  }
})
</script>

<style>
.listapp .container {
  position: relative;
  padding: 0;
}
.listapp .item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}
/* 1. declare transition */
.listapp  .fade-move, .listapp  .fade-enter-active, .listapp .fade-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
/* 2. declare enter from and leave to state */
.listapp .fade-enter-from, .listapp .fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.listapp .fade-leave-active {
  position: absolute;
}
</style>
