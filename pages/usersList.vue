<template>
  <div class="container">
    <h1>Users List</h1>

    <div>
      <ul v-if="users">
        <li v-for="user in allUsers" :key="user.id">
          <p>{{ allUsers }}</p>
        </li>
      </ul>

      <p v-else>Пусто</p>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import UsersList from "../components/usersList"

  export default {
    computed: {
      ...mapState(['users']),
      ...mapGetters(['allUsers']),
    },
    methods: {
      ...mapActions([
        'usersList', 'thesauruses'
      ])
    },

    async mounted() {
      await this.thesauruses()
      await this.usersList()
    },

    components: {
      UsersList
    }
  }
</script>

<style scoped="">
  .container {
    max-width: 1170px;
    margin: auto;
    height: 1000px;
  }
  ul {
    list-style: none;
  }
</style>
