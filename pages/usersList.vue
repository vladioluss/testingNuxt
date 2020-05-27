<template>
  <div class="body">
    <h1>Users List</h1>

    <button v-on:click="downloadCSV">csv</button>
    <br><br>

    <center>
    <div>
      <div v-if="users">
        <div>
          <table>
            <thead>
            <tr class="header">
              <td><input type="checkbox" v-on:click="selectAll(allUsers)"></td>
              <td>id</td>
              <td>User Name</td>
              <td>Полное Имя</td>
              <td>Дата рождения</td>
              <td>Статус</td>
              <td>Пол</td>
              <td>Компания</td>
            </tr>
            </thead>
            <tbody>
              <tr v-for="user in allUsers" :key="user.id">
                <td><input type="checkbox" v-on:click="select(user)"></td>
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.fullName }}</td>
                <td>{{ user.dateBirth }}</td>
                <td>{{ items.statuses[user.status] }}</td>
                <td>{{ items.sex[user.sex] }}</td>
                <td>{{ items.companies[user.companyId] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br>
        <pagination/>
      </div>

      <p v-else>Пусто</p>

    </div></center>
  </div>

</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import UsersList from "../components/usersList"
  import {getters} from "../store"
  import pagination from "../components/pagination"

  export default {
    data() {
      return {
        allSelected: false
      }
    },

    methods: {
      ...mapActions([
        'usersList', 'thesauruses'
      ]),

      selectAll: function (data) {
        let rows = []

        let headers = Object.keys(data[0])
        rows.push(headers.join(";"))

        for (let user of data) {
          let values = headers.map(header => {
            return user[header]
          })
          rows.push(values.join(";"))
        }

        let result = rows.join("\n")
        console.log(result)
        this.downloadCSV(result, 'all.csv', 'text/csv;charset=UTF-8;')
      },

      select: function (user) {
        let rows = []
        let header = Object.keys(user).join(';')
        let value = Object.values(user).join(";")

        rows.push(header, value)
        let result = rows.join('\n')

        console.log(result)
        this.downloadCSV(result, 'one.csv')
      },

      downloadCSV: function (data, filename) {
        let link = document.createElement('a')

        if (URL && 'download' in link) {
          link.href = URL.createObjectURL(new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]),
            data
          ]))

          link.setAttribute('download', filename)

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      },

    },

    computed: {
      ...mapState(['users', 'items']),
      ...mapGetters(['allUsers'])
    },

    async mounted() {
      await this.thesauruses()
      await this.usersList()
    },

    components: {
      pagination,
      UsersList
    }
  }
</script>

<style scoped lang="scss">
  .body {
    background: linear-gradient(45deg, #49a09d, #5f2c82);
  }

  h1 {
    color: white;
  }

  table {
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }

  th,
  td {
    padding: 15px;
    background-color: rgba(255,255,255,0.2);
    color: #fff;
  }

  thead {
    th {
      background-color: #55608f;
    }
  }

  tbody {
    tr {
      &:hover {
         background-color: rgba(255,255,255,0.3);
      }
    }
  }

  .header {
    font-weight: bold;
  }
</style>
