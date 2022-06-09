import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authClient: null,
    authUserIdentity: null,
  },
  getters: {
    principal(state) {
      if (!state.authUserIdentity) return ''
      return state.authUserIdentity.getPrincipal().toString()
    },
  },
  mutations: {
    setAuthUserIdentity(state, authUserIdentity) {
      state.authUserIdentity = authUserIdentity
    },
    setAuthClient(state, authClient) {
      state.authClient = authClient
    },
  },
  actions: {
  },
  modules: {
  }
})
