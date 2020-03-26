<template>
  <div>
    <div v-if="users == ''">Пусто</div>
    <div v-else> {{ users }} </div>
  </div>
</template>

<script>
  export default {
    computed: {
      users () {
        return this.$store.state.users
      }
    }
  }
</script>
