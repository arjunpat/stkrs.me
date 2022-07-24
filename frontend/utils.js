import store from './store'
import router from './router'
import Vue from 'vue'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const contractAddress = 'TJwuEKa8SDLxNAdrknHXCWEudCqhodzW6a'

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

export async function setCurUser(name, bio, profileImage, telegramUsername) {
  await window.contract.updateUser(name, bio, profileImage, telegramUsername).send()
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

export async function getAllUsers() {
  const users = []
  const userEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'UserCreated' })
  for (const event of userEvents) {
    const user = await getUser(getAddressFromHex(event.result.addr))
    users.push(user)
  }
  return users
}

export async function getStkr(stickerId) {
  const stkr = await window.contract.stkrs(stickerId).call()
  return formatSticker({
    ...stkr,
    id: stickerId, 
  })
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
    stkrs.push({...stkr, id})
  }

  return formatStickers(stkrs)
}

export async function getRecentStkrId(_title, _organization, _description, _category, _image) {
  const d = new Date()
  d.setMinutes(d.getMinutes() - 5)
  const stkrCreatedEvents = await window.tronWeb.getEventResult(contractAddress, 
    { 
      eventName: 'StkrCreated',  
      sinceTimestamp: d.getTime(),
      sort: '-block_timestamp',
    }
  )
  for (const event of stkrCreatedEvents) {
    const stkr = await getStkr(event.result.id)
    const { id, name, organization, description, category, src } = stkr
    if (
      name === _title && organization === _organization && description === _description &&
      category === _category && src === _image
    ) {
      console.log('YES', event.result.id)
      return event.result.id
    }
  }
  return ''
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
    const shared = await getSharedStkrs(address, creatorAddress)
    commentsFormatted.push({
      ...formatComment(comment),
      user,
      shared,
    })
  }

  return commentsFormatted
}

export async function getFriends(address) {
  const friendAddresses = []
  const friendRequestAddresses = []
  const sentFriendRequestAddresses = []

  const friendEvents = await window.tronWeb.getEventResult(contractAddress, { eventName: 'FriendRequest' })
  // console.log(friendEvents)
  for (let i = 0; i < friendEvents.length; ++i) {
    const eventI = friendEvents[i].result
    if (getAddressFromHex(eventI.to) === address || getAddressFromHex(eventI.from) === address) {
      let toIsCur = getAddressFromHex(eventI.to) === address;
      if (toIsCur) {
        friendRequestAddresses.push(getAddressFromHex(eventI.from))
      } else {
        sentFriendRequestAddresses.push(getAddressFromHex(eventI.to))
      }
      
      for (let j = i+1; j < friendEvents.length; ++j) {
        const eventJ = friendEvents[j].result
        if (
          getAddressFromHex(eventI.to) === getAddressFromHex(eventJ.from) && 
          getAddressFromHex(eventJ.to) === getAddressFromHex(eventI.from)
        ) {
          if (toIsCur) {
            friendAddresses.push(getAddressFromHex(eventI.from)) 
            friendRequestAddresses.pop()
          } else {
            friendAddresses.push(getAddressFromHex(eventI.to))
            sentFriendRequestAddresses.pop()
          }
          friendEvents.splice(j, 1)
          break
        }
      }
    }
  }

  const friends = []
  for (const addr of friendAddresses) {
    const user = await getUser(addr)
    const shared = await getSharedStkrs(address, addr)
    friends.push({ user, shared })
  }

  const friendRequests = []
  for (const addr of friendRequestAddresses) {
    const user = await getUser(addr)
    const shared = await getSharedStkrs(address, addr)
    friendRequests.push({ user, shared })
  }

  const sentFriendRequests = []
  for (const addr of sentFriendRequestAddresses) {
    const user = await getUser(addr)
    const shared = await getSharedStkrs(address, addr)
    sentFriendRequests.push({ user, shared })
  }

  return { friends, friendRequests, sentFriendRequests }
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
  
  const stkrIds = stkrIds1.filter(stkr1 => stkrIds2.some(stkr2 => stkr1.stkr === stkr2.stkr)).map(s => s.stkr)

  const stkrs = []
  for (const id of stkrIds) {
    const stkr = await window.contract.stkrs(id).call()
    stkrs.push({...stkr, id})
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

export const formatUser = (user) => {
  if (!user) return null

  const { bio, name, profile_image, telegram_username } = user
  return {
    username: name,
    profilePic: profile_image,
    bio,
    telegramLink: `https://t.me/${telegram_username}`,
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
    id: sticker.id,
    name: sticker.title,
    organization: sticker.organization,
    description: sticker.description,
    src: sticker.image,
    category: sticker.category,
  }
}

export const formatComment = comment => {
  const { creator, content } = comment
  return {
    creator,
    comment: content,
  }
}

export const goToWall = (principalString) => {
  router.push({ name: 'wall', params: { id: principalString }, })
}

export const goToSticker = (stickerId) => {
  router.push({ name: 'stkr', params: { id: stickerId }, })
}
