<template>
  <div class="tw-flex tw-justify-center">
    <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full">
      <div class="tw-bg-blue-600"/>
      <PaintDripSection class="-tw-mt-4" color="blue-600">
        <div class="tw-flex">
          <ProfileImage 
            class="tw-mr-8"
            :src="profilePic"
          />
          <div class="tw-self-center">
            <div class="tw-text-white tw-font-semibold tw-text-5xl">{{ username }}</div>
            <div class="tw-text-white tw-font-light tw-text-md">{{ id }}</div>
            <div class="tw-text-white tw-font-light tw-my-4">
              <!-- bio goes here -->
              Bio: Hi, I'm 0xSounds, UPenn Grad and ex-Goldman analyst. Follow my Twitter at @Sounds and Instagram at @0xSounds.
            </div>
          </div>
        </div>
      </PaintDripSection>
      
      <div class="tw-bg-green-600" /> <!-- needed so the tailwind class compiles -->
      <PaintDripSection color="green-600">
        <div class="tw-text-3xl tw-font-medium tw-mb-4 tw-text-white">Pinned</div>
        <div class="tw-space-x-4">
          <Sticker
            v-for="item, i in pinned"
            :key="i"
            v-bind="item"
            dark
          />
        </div>
      </PaintDripSection>
      
      <div class="tw-bg-gray-500 tw-bg-red-700 tw-bg-orange-600" />
      <template v-for="category, i in categories">
        <PaintDripSection :key="i" :color="category.color">
          
          <div class="tw-text-3xl tw-font-medium tw-mb-4 tw-text-white">{{ category.header }}</div>
          <div class="tw-space-y-4">
            <div 
              v-for="sticker, s in category.stickers" 
              :key="s"
              class="tw-flex"
            >
              <Sticker
                v-bind="sticker"
                dark
              />
              <div class="tw-p-4 tw-text-gray-200">{{ sticker.description }}</div>
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

    pinned: [
      {
        name: 'University of Pennsylvania (2020-2024)',
        src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
      },
      {
        name: 'University of Pennsylvania (2020-2024)',
        src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
      },
      {
        name: 'University of Pennsylvania (2020-2024)',
        src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
      },
      {
        name: 'University of Pennsylvania (2020-2024)',
        src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
      },
    ],

    categories: [
      {
        header: 'Professional',
        color: 'gray-500',
        stickers: [
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
        ],
      },
      {
        header: 'Fun',
        color: 'orange-600',
        stickers: [
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
        ],
      },
      {
        header: 'Communities',
        color: 'red-700',
        stickers: [
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
          {
            name: 'University of Pennsylvania (2020-2024)',
            src: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
            description: 'I went to UPenn as part of the M&T program, majoring in CS & Finance',
          },
        ],
      },
    ],

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
}
</script>