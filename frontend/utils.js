import store from './store'
import router from './router'
import Vue from 'vue'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const contractAddress = '411980ef5eb251d3307fa148146c169b1662d0d724'

export async function connectToContract() {
  window.contract = await window.tronWeb.contract().at(contractAddress)
  // await window.contract.createStkr('asdf', 'asdf', 'asdf', 'asdf', 'asdf').send();
}

export async function waitUntilContractReady() {
  while (!('contract' in window)) {
    await sleep(1000)
  }
}

export function getCurAddress() {
  return window.tronWeb.defaultAddress.base58
}

export function getAddressFromHex(hex) {
  return window.tronWeb.address.fromHex(hex)
}

export async function setCurUser(name, bio, profileImage) {
  await window.contract.setUser(name, bio, profileImage).send()
}

export async function getUser(address) {
  // Get user data
  const user = await window.contract.users(address).call().then(user => {
    return {
      ...formatUser(user),
      address,
    }
  })
  return user
}

export async function getStkr(stickerId) {
  const stkr = await window.contract.stkrs(stickerId).call()
  return formatSticker(stkr)
}

export async function getStkrs(address) {
  const stkrEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'StkrSent' })
  const stkrIds = stkrEvents
    .filter(stkr => (
      getAddressFromHex(stkr.result.to) === address
    ))
    .map(stkr => stkr.result.stkr)

  const stkrs = []
  for (const id of stkrIds) {
    const stkr = await window.contract.stkrs(id).call()
    stkrs.push(stkr)
  }

  return formatStickers(stkrs)
}

export async function getPins(address) {
  const pinNums = []
  for (let i = 0; i < 5; ++i) {
    try {
      const num = await window.contract.pins(address, i).call()
      // console.log('found a pin: ', Number(num), i)
      pinNums.push(num)
    } catch (e) {
      // console.log('no more pins!')
      break;
    }
  }
  return pinNums

  const pins = []
  for (const num of pinNums) {
    const pin = await window.contract.stkrs(num).call()
    pins.push(pin)
  }

  return pins
}

export async function addPin(stickerId) {
  await window.contract.addPin(stickerId).send()
}

export async function removePin(stickerId) {
  await window.contract.removePin(stickerId).send()
}

export async function getComments(address) {
  const commentsFormatted = []

  const commentEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'Comment' })
  const comments = commentEvents.filter(comment => (
    getAddressFromHex(comment.result.to) === address
  )).map(comment => comment.result)

  for (const comment of comments) {
    const creatorAddress = getAddressFromHex(comment.creator)
    const user = await getUser(creatorAddress)
    const shared = getSharedStkrs(address, creatorAddress)
    commentsFormatted.push({
      ...formatComment(comment),
      user,
      shared,
    })
  }

  return commentsFormatted
}

export async function getSharedStkrs(address1, address2) {
  const stkrEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'StkrSent' })
  const stkrIds1 = []
  const stkrIds2 = []
  
  for (const event of stkrEvents) {
    const stkr = event.result
    if (getAddressFromHex(stkr.to) === address1) {
      stkrIds1.push(stkr)
    } else if (getAddressFromHex(stkr.to) === address2) {
      stkrIds2.push(stkr)
    }
  }
  
  const stkrIds = stkrIds1.filter(stkr1 => stkrIds2.some(stkr2 => stkr1.stkr === stkr2.stkr))

  const stkrs = []
  for (const id of stkrIds) {
    const stkr = await window.contract.stkrs(id).call()
    stkrs.push(stkr)
  }

  return formatStickers(stkrs)
}

export async function getUsersWStkr(stickerId) {
  const stkrEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'StkrSent' })
  const userAddresses = stkrEvents
    .filter(stkr => (
      stkr.result.stkr == stickerId
    ))
    .map(stkr => getAddressFromHex(stkr.result.to))

  const users = []
  for (const address of userAddresses) {
    const user = await getUser(address)
    users.push(user)
  }

  return users
}

export const signIn = async () => {
}

export const signOut = async () => {
}

export const formatUser = (user) => {
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

export const getCommentsOld = async (principal) => {
  const commentsFormatted = []

  const promises = []
  await publicStkr.getComments(principal).then(comments => {
    for (const comment of comments) {
      const promise = publicStkr.getUser([comment.creator]).then(async user => {
        const shared = await publicStkr.getSharedStkrs(principal, comment.creator).then(async stickers => {
          const shared = []
          for (const stickerId of stickers) {
            await publicStkr.getStkr(stickerId).then(sticker => {
              shared.push({
                ...formatSticker(sticker),
                id: stickerId,
              })
            })
          }
          return shared
        })
        commentsFormatted.push({
          ...formatComment(comment),
          user: {
            ...formatUser(user),
            principal: comment.creator,
            principalString: comment.creator.toString(),
          },
          shared,
        })
      })
      promises.push(promise)
    }
  })
  await Promise.all(promises)

  return commentsFormatted
}

export const goToWall = (principalString) => {
  router.push({ name: 'wall', params: { id: principalString }, })
}

export const goToSticker = (stickerId) => {
  router.push({ name: 'stkr', params: { id: stickerId }, })
}