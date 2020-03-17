export const state = () => ({
  items: [],
})

export const mutations = {
  setItems(state, data) {
    state.items = data
  },
}

export const actions = {

  async usersList(context, {sex, statuses, companies}) {
    try {
      let response = await this.$axios.$get('http://api.loldev.ru/api/users/thesauruses'/*, {sex: sex, statuses: statuses, companies: companies}*/)

      context.commit('setItems', response)
    } catch (e) {
      console.log('error:', e);
    }
  },
}

export const getters = {
  firstItem(state) {
    return state.items[0]
  },
  items(state) {
    return state.items
  }
}
