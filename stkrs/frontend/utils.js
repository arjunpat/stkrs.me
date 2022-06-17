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

export const formatUser = ([user]) => {
  if (!user) return null
  
  const { bio, name, profile_image } = user
  return {
    username: name,
    profilePic: profile_image,
    bio,
  }
}

export const formatStickers = stickers => {
  const s = {}
  for (const sticker of stickers) {
    s[sticker.id] = formatSticker(sticker)
  }
  return s
}

export const formatSticker = sticker => {
  return {
    name: sticker.title,
    organization: sticker.organization,
    description: sticker.description,
    src: sticker.image,
    category: sticker.category,
  }
}

export const formatComment = comment => {
  const { creator, content, createdAt } = comment
  return {
    creator,
    comment: content,
    date: new Date(Number(createdAt / BigInt(1000000)))
  }
}

export const getComments = async (principal) => {
  const commentsFormatted = []

  const promises = []
  await store.state.stkr.getComments(principal).then(comments => {
    for (const comment of comments) {
      const promise = store.state.stkr.getUser([ comment.creator ]).then(user => {
        commentsFormatted.push({
          ...formatComment(comment),
          user: formatUser(user),
        })
      })
      promises.push(promise)
    }
  })
  await Promise.all(promises)

  return commentsFormatted
}