<template>
  <div class="container">
    <h1>Users List</h1>

    <button v-on:click="objToCsv">csv</button>
    <br><br>

    <div>
      <div v-if="users">
        <div>
            <table id="data-table">
              <thead>
              <tr>
                <td><input type="checkbox" v-on:click="selectAll" v-model="allSelected"></td>
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
                  <td><input type="checkbox" v-model="selected" v-on:click="select"></td>
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
        </div>

      <p v-else>Пусто</p>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import UsersList from "../components/usersList"

  export default {
    data: {
      selected: false,
      allSelected: false,
    },

    methods: {
      ...mapActions([
        'usersList', 'thesauruses'
      ]),

      objToCsv: (data) => {
        //формирование csv
        let rows = []

        let headers = Object.keys(data[0])
        rows.push(headers.join(";"))

        for (let user of data) {
          const values = headers.map(header => {
            return user[header]
          })
          rows.push(values.join(";"))
        }

        let result = rows.join("\n")
        console.log(result)
        //this.downloadCSV(result, 'export.csv', 'text/csv;charset=UTF-8;');
      },

      selectAll: () => {
        console.log("select: ", this.allSelected)
      },

      select: () => {
        console.log("select: ", this.selected)
      },

      downloadCSV: (data, fileName) => {
        let link = document.createElement('a');

        if (URL && 'download' in link) {
          link.href = URL.createObjectURL(new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]),
            data
          ]));

          link.setAttribute('download', fileName);

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
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
      UsersList
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1170px;
    margin-left: auto;
    margin-right: auto;
    height: 1000px;
  }

  h1 {
    margin-bottom: 20px;
  }

  thead {
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
  }

  td, th {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
  }

  tr:hover {
    background: rgba(225, 233, 245, 0.6);
    cursor: pointer;
  }
</style>
