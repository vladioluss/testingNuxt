<template>
  <div class="container">
    <h1>Users List</h1>

    <div>
      <div v-if="users == ''">Пусто</div>
      <ul v-else v-for="user in users" :key="user">
        <li> {{ user }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import UsersList from "../components/usersList"

  export default {
    computed: {
      ...mapState(['users'])
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
