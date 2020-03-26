export const state = () => ({
  items: [],
  sex: [],
  statuses: [],
  companies: [],
  users: []
})

export const actions = {

  async thesauruses(context) {
    console.log("1: ")
    try {
      let response = await this.$axios.$get('http://api.loldev.ru/api/users/thesauruses')
      context.commit('setItems', response)
    } catch (e) {
      console.log('error:', e)
    }
  },

  async usersList(context) {
    try {
      let response = await this.$axios.$get('http://api.loldev.ru/api/users/list')
      context.commit('users', response)
    } catch (e) {
      console.log('error:', e)
    }
  },
}

export const mutations = {

  //проверка на undefined и запись значений в store
  setItems(state, data) {
    state.items = data // все объекты

    if (typeof state.sex === 'undefined' || typeof state.statuses === 'undefined' || typeof state.companies === 'undefined') {
      state.sex = ''
      state.statuses = ''
      state.companies = ''
    } else {
      state.sex = data.sex
      state.statuses = data.statuses
      state.companies = data.companies
    }
  },

  users(state, data) {
    let indexSex, indexStatus, IndexCompanies

    state.users = data // все объекты

    //перебор значений в массиве users
    //в переменные index* записываю индексы полей
    for (let value of data) {
      //необработанное значение(индекс)
      indexSex = data[value].sex
      indexStatus = data[value].statuses
      IndexCompanies = data[value].companies

      data[value].sex = state.sex[indexSex]
      data[value].statuses = data.statuses[indexStatus]
      data[value].companies = data.companies[IndexCompanies]
    }
  }
}

export const getters = {
  users(state) {
    return state.users
  }
}
