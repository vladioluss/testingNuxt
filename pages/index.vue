<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>
            <label class="form-checkbox">
              <input type="checkbox" v-model="selectAll" @click="selectedAll">
            </label>
          </th>
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
        <tr v-for="user in users" :key="user.id">
          <td>
            <label class="form-checkbox">
              <input type="checkbox" @click="select(user)">
            </label>
          </td>
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data: () => ({
		users: [
			{
				id: "1",
				name: "John Doe",
				email: "email@example.com"
			},
			{
				id: "2",
				name: "Jone Doe",
				email: "email2@example.com"
			}
		],
    selected: [],
    sel: false,
		selectAll: false
  }),

	methods: {
		selectedAll: function() {
      //this.selected = []
			if (!this.selectAll) {
        let headers = Object.keys(this.users[0])
        this.selected.push(headers.join(";"))
        for (let user of this.users) {
          const values = headers.map(header => {
            return user[header]
          })
          this.selected.push(values.join(";"))
        }
        let result = this.selected.join("\n")
        console.log(result)
        //this.download(result, 'export.csv')
      }
    },
    select: function(user) {
      let rows = []

      /*let headers = Object.keys(this.users[0])
      rows.push(headers.join(";"))*/

      rows.push(user)
      let result = rows.join("\n")

      console.log(rows)
      //this.download(result)
    },
    download: function (data, filename) {
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
		}
  }

}
</script>
