import { formatStickers, formatUser, getComments, getCurAddress, getFriends, getStkrs, getUser } from '../utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curUser: null,
    // Current user data
    stickers: [],
    friends: [],
    friendRequests: [],
    sentFriendRequests: [],

    loading: false,
  },
  getters: {
    hasAccount(state) {
      if (!state.curUser) return false
      return state.curUser.username.length > 0
    },
    isFriend(state) {
      return (address) => state.friends.some(({user}) => user.address === address)
    },
    isFriendRequestSent(state) {
      return (address) => state.sentFriendRequests.some(({user}) => {
        return user.address === address
      })
    },
  },
  mutations: {
    setCurUser(state, user) {
      state.curUser = user
    },
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
    async getCurUser({ commit }) {
      const user = await getUser(getCurAddress())
      commit('setCurUser', user)
    },
    async getFriendsData({ commit }) {
      await getFriends(getCurAddress()).then(({ friends, friendRequests, sentFriendRequests }) => {
        commit('setFriends', friends)
        commit('setFriendRequests', friendRequests)
        commit('setSentFriendRequests', sentFriendRequests)
      })
    },
    async getStkrData({ commit }) {
      await getStkrs(getCurAddress()).then(stickers => {
        commit('setStickers', stickers)
      })
    },
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
  },
  modules: {
  }
})
