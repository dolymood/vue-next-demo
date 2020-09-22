<template>
  <div>{{ msg }} <button @click="$emit('rm')">x</button></div>
</template>
<script>
export default {
  props: ['msg']
}
</script>
