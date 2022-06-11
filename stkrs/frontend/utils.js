import store from './store'
import { createActor } from 'canisters/stkr'

export const signIn = async () => {
  const days = BigInt(1)
  const hours = BigInt(24)
  const nanoseconds = BigInt(3600000000000)
  const result = await new Promise((resolve, reject) => {
    store.state.authClient.login({
      identityProvider: 
        process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/?canisterId=renrk-eyaaa-aaaaa-aaada-cai' 
        : 'https://identity.ic0.app',
      onSuccess: () => {
        const identity = store.state.authClient.getIdentity()
        resolve({ identity })
      },
      onError: reject,
      maxTimeToLive: days * hours * nanoseconds,
    })
  })
  store.commit('setAuthUserIdentity', result.identity)
  const stkr = createActor(process.env.STKR_CANISTER_ID, {
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
