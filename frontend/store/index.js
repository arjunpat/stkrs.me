import { formatStickers, formatUser, getComments } from '../utils'
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
    comments: [],

    users: [],

    loading: false,
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
    setComments(state, comments) {
      state.comments = comments
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

    setUsers(state, users) {
      state.users = users
    },

    setLoading(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    async fetchUser({ state, commit }) {
      await state.stkr.getUser([]).then(user => {
        commit('setUser', formatUser(user))
      })
    },
    async fetchStickers({ state, commit }) {
      await state.stkr.getStkrs([]).then(stickers => {
        commit('setStickers', formatStickers(stickers))
      })
    },
    async fetchPins({ state, commit }) {
      await state.stkr.getPins([]).then(pins => {
        commit('setPins', pins)
      })
    },
    async fetchComments({ getters, commit }) {
      await getComments(getters.principal).then(comments => {
        commit('setComments', comments)
      })
    },
    async fetchUsers({ state, commit }) {
      await publicStkr.getUsers().then(users => {
        const formattedUsers = users.map(([principal, user]) => {
          return {
            ...formatUser([user]),
            principal,
            principalString: principal.toString(),
          }
        })

        commit('setUsers', formattedUsers)
      })
    }, 
  },
  modules: {
  }
})
