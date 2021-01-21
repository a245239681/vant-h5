import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 1,
    code: '',
  },
  mutations: {
    token(state, num) {
      state.type = num
    },
    getcode(state, code) {
      state.code = code
    },
  },
  actions: {},
  modules: {},
})
