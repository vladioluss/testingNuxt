<template>
  <div>
    <h1>Users List</h1>
    <div>
      <ul>
        <li>{{ $store.state.items }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import usersList from '~/components/usersList.vue'

export default {
  components: {
    usersList
  }
}
</script>

<style scoped="">

</style>
