import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authClient: null,
    authUserIdentity: null,
    stkr: null,
  },
  getters: {
    principal(state) {
      if (!state.authUserIdentity) return ''
      return state.authUserIdentity.getPrincipal()
    },
    principalString(state, getters) {
      return getters.principal.toString()
    },
  },
  mutations: {
    setAuthUserIdentity(state, authUserIdentity) {
      state.authUserIdentity = authUserIdentity
    },
    setAuthClient(state, authClient) {
      state.authClient = authClient
    },
    setStkr(state, stkr) {
      state.stkr = stkr
    },
  },
  actions: {
  },
  modules: {
  }
})
