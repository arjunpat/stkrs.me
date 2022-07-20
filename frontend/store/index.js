import { formatStickers, formatUser, getComments, getCurAddress, getStkrs } from '../utils'
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
    userAddress(state) {
      return window.tronWeb.defaultAddress.base58
    },
  },
  mutations: {
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
    async init({ commit }) {
      await getStkrs(getCurAddress()).then(stickers => {
        commit('setStickers', stickers)
      })
    },
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
      await window.contract.getUsers().then(users => {
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
