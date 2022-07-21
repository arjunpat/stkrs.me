import { formatStickers, formatUser, getComments, getCurAddress, getFriends, getStkrs } from '../utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Current user data
    stickers: [],
    friends: [],
    friendRequests: [],
    sentFriendRequests: [],

    loading: false,
  },
  getters: {
    isFriend(state) {
      return (address) => state.friends.some(user => user.address === address)
    },
    isFriendRequestSent(state) {
      return (address) => state.sentFriendRequests.some(user => user.address === address)
    },
  },
  mutations: {
    setStickers(state, stickers) {
      state.stickers = stickers
    },
    setFriends(state, friends) {
      state.friends = friends
    },
    setFriendRequests(state, friendRequests) {
      state.friendRequests = friendRequests
    },
    setSentFriendRequests(state, sentFriendRequests) {
      state.sentFriendRequests = sentFriendRequests
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

      await getFriends(getCurAddress()).then(({ friends, friendRequests, sentFriendRequests }) => {
        commit('setFriends', friends)
        commit('setFriendRequests', friendRequests)
        commit('setSentFriendRequests', sentFriendRequests)
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
