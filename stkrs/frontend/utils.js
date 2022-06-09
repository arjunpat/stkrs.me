import store from './store'
import { createActor } from 'canisters/stkr'

export const signIn = async () => {
  const result = await new Promise((resolve, reject) => {
    store.state.authClient.login({
      identityProvider: 
        process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai' 
        : 'https://identity.ic0.app',
      onSuccess: () => {
        const identity = store.state.authClient.getIdentity()
        resolve({ identity })
      },
      onError: reject,
    })
  })
  store.commit('setAuthUserIdentity', result.identity)
  const stkr = createActor(process.env.COUNTER_CANISTER_ID, {
    agentOptions: {
      identity: result.identity,
    }, 
  })
  store.commit('setStkr', stkr)
}

export const signOut = async () => {
  await store.state.authClient.logout()
  store.commit('setAuthUserIdentity', null)
}