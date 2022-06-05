<template>
  <div class="tw-flex tw-justify-center">
    <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full">
      <div class="tw-bg-blue-600"/>
      <PaintDripSection class="-tw-mt-4" color="blue-600">
        <div class="tw-flex">
          <ProfileImage 
            class="tw-mr-4"
            :src="profilePic"
          />
          <div class="tw-self-center">
            <div class="tw-text-white tw-font-semibold tw-text-5xl">{{ username }}</div>
            <div class="tw-text-white tw-font-light tw-text-md">{{ id }}</div>
          </div>
        </div>
      </PaintDripSection>
      
      <div class="tw-bg-green-600" /> <!-- needed so the tailwind class compiles -->
      <PaintDripSection color="green-600">
        <div class="tw-text-center tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">Pinned</div>
        <div class="tw-space-x-4">
          <Sticker
            v-for="stickerId, i in pinned"
            :key="i"
            v-bind="stickers[stickerId]"
            dark
            pin
            showName
            :pinned="isPinned(stickerId)"
            @pin="togglePin(stickerId)"
          />
        </div>
      </PaintDripSection>
      
      <div class="tw-bg-gray-500 tw-bg-red-700 tw-bg-orange-600" />
      <template v-for="category, i in Object.keys(categories)">
        <PaintDripSection :key="i" :color="categories[category].color">
          
          <div class="tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">{{ category }}</div>
          <div class="tw-space-y-4">
            <div 
              v-for="stickerId, s in categories[category].stickers" 
              :key="s"
              class="tw-flex"
            >
              <Sticker
                v-bind="stickers[stickerId]"
                :pinned="isPinned(stickerId)"
                dark
                @pin="togglePin(stickerId)"
              />
              <div class="tw-w-96 tw-p-4">
                <div class="tw-text-white tw-text-lg tw-font-semibold tw-tracking-wide">{{ stickers[stickerId].name }}</div>
                <div class="tw-text-gray-300">{{ stickers[stickerId].description }}</div>
              </div>
            </div>
          </div>
        </PaintDripSection>
      </template>
    </div>
    
    <!--<div class="tw-p-4 tw-mt-24">
      <div class="tw-text-3xl tw-font-medium tw-mb-4">Friends</div>
      <div 
        v-for="friend, i in friends" 
        :key="i"
        class="tw-flex"
      >
        <ProfileImage
          class="tw-mr-4"
          :src="friend.pic"
          :width="100"
        />
        <div class="tw-self-center">
          <div class="tw-font-semibold tw-text-lg">{{ friend.username }}</div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Sticker from '@/components/Sticker'
import ProfileImage from '@/components/ProfileImage'
import PaintDripSection from '@/components/PaintDripSection'

export default {
  name: 'Wall',

  components: {
    PaintDripSection,
    ProfileImage,
    Sticker,
  },

  data: () => ({
    username: 'Sounds',
    id: '0x1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    profilePic: 'https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343',

    stickers: {
      'asdf': {
        name: 'Google Developer (2016-2020)',
        src: 'https://blog.hubspot.com/hubfs/image8-2.jpg',
        description: 'I worked at Google on their Robotics team',
        category: 'Professional',
      },
      'fdsa': {
        name: 'Intel Software Engineer (2013-2016)',
        src: 'https://logos-world.net/wp-content/uploads/2021/09/Intel-Emblem.png',
        description: 'I worked at Intel, designing FPGA chips',
        category: 'Professional',
      },
      'abcd': {
        name: 'University of Pennsylvania (2009-2013)',
        src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
        category: 'Professional',
      },
      'ncie': {
        name: 'Top 5% in League of Legends',
        src: 'https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=1500&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=1575',
        description: 'I became top 5% of all players in League of Legends',
        category: 'Fun',
      },
      'idk': {
        name: 'Custom TF2 Map Maker',
        src: 'https://pbs.twimg.com/profile_images/1312483338075009024/YSN3Qy_B_400x400.png',
        description: 'I designed my own map in Team Fortress 2 and gained widespread community adoption',
        category: 'Fun',
      },
      'noice': {
        name: 'Supernova Hackathon (2022)',
        src: 'data:image/png;base64,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',
        description: 'I won 1st place at the Supernova Hackathon, in the SocialFi category',
        category: 'Communities',
      },
      'okie': {
        name: 'Solana Developer Conference (2016)',
        src: 'data:image/png;base64,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',
        description: 'I attended the 2016 Solana Developer conference',
        category: 'Communities',
      },
    },

    pinned: ['asdf', 'abcd', 'ncie'],

    categoryColors: {
      'Professional': 'gray-500',
      'Fun': 'orange-600',
      'Communities': 'red-700',
    },

    friends: [
      {
        pic: 'https://lh3.googleusercontent.com/6NodEirTq6RnAG6OG1LBr1MclLtIrTNdW5nMgnzGKxfZ2_odAuzwsYPsVStfYmQdZKAs44nM_1tP8TdxjTYv2Ucm-TjkQgPFfOBm7Q=w343',
        username: '65XHouseyhfX',
      },
      {
        pic: 'https://lh3.googleusercontent.com/eDVk2W966z7SCKdNS2dxzwDaonh5Dk1ng_vC26Gd9J7MRVDp5c-B9jqHlYa1aClFeeL9C6yDlbtbblIDhdviPGHMw34iIQ18j83F8Gk=w343',
        username: '77JackoXX',
      },
      {
        pic: 'https://lh3.googleusercontent.com/s3KebNXqAyDiDEjmo0btMJUtllRhP2guk3wGKy_VcTk1u0gxx-x6DDREf6X4WE6vaQITapum_9lsVdZTNfO6hvmoMiNUtkRjM5z7SHQ=w343',
        username: '88KadiE91'
      },
    ],
  }),

  computed: {
    categories() {
      const c = {}
      for (const stickerId of Object.keys(this.stickers)) {
        const { category } = this.stickers[stickerId]
        if (category in c) {
          c[category].stickers.push(stickerId)
        } else {
          c[category] = { stickers: [stickerId] }
          const color = this.categoryColors[category]
          if (color) {
            c[category].color = color
          }
        }
      }
      return c
    },
  },

  methods: {
    togglePin(stickerId) {
      if (this.isPinned(stickerId)) {
        this.pinned = this.pinned.filter(id => id !== stickerId)
      } else {
        this.pinned.push(stickerId)
      }
    },
    isPinned(stickerId) {
      return this.pinned.includes(stickerId)
    },
  },
}
</script>