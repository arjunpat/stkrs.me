import store from './store'

export const signIn = async () => {
  const result = await new Promise((resolve, reject) => {
    store.state.authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => {
        const identity = store.state.authClient.getIdentity()
        resolve({ identity })
      },
      onError: reject,
    })
  })
  store.commit('setAuthUserIdentity', result.identity)
}

export const signOut = async () => {
  await store.state.authClient.logout()
  store.commit('setAuthUserIdentity', null)
}