<template>
  <div>
    <div v-if="users == ''">Пусто</div>
    <div v-else> {{ users }} </div>
  </div>
</template>

<script>
  export default {
  }
</script>
