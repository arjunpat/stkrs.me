import { formatStickers, formatUser } from '../utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authClient: null,
    authUserIdentity: null,
    stkr: null,

    // Current user data
    user: null,
    stickers: [],
    pins: [],
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

    setUser(state, user) {
      state.user = user
    },
    setStickers(state, stickers) {
      state.stickers = stickers
    },
    setPins(state, pins) {
      state.pins = pins
    }, 

    addPin(state, stickerId) {
      state.pins.push(stickerId)
    },
    removePin(state, stickerId) {
      state.pins = state.pins.filter((id) => id !== stickerId)
    },
  },
  actions: {
    fetchUser({ state, commit }) {
      return state.stkr.getUser([]).then(user => {
        commit('setUser', formatUser(user))
      })
    },
    fetchStickers({ state, commit }) {
      return state.stkr.getStkrs([]).then(stickers => {
        commit('setStickers', formatStickers(stickers))
      })
    },
    fetchPins({ state, commit }) {
      return state.stkr.getPins([]).then(pins => {
        commit('setPins', pins)
      })
    },
  },
  modules: {
  }
})
