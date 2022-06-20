<template>
  <div class="tw-justify-center tw-h-full tw-bg-orange-600 tw-pt-32">
    <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full">
      <h1
        class="tw-mb-10 tw-text-white tw-text-6xl tw-font-bold tw-place-content-center text-center tw-underline tw-decoration-8 tw-decoration-orange-400">
        Discover</h1>
      <Search holder="Search StkrWalls..." @search="showFilteredProfiles"></Search>
      <div v-if="!searching">
        <div class="tw-flex">
          <h1 class="tw-text-white tw-text-4xl tw-font-bold tw-mt-10 tw-mb-6">Popular Stkr Walls of the Day</h1>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-bg-orange-400 tw-p-5 tw-rounded-t-2xl tw-rounded-b-lg">
          <ProfileImage class="tw-flex tw-mr-10 tw-text-white " v-for="item, i in popularSouls" :key="`popular-${i}`"
            :src="item.profilePic" :name="item.username" @click="goToWall(item.principalString)"/>
        </div>
        <PaintDrip class="tw-h-20 tw-w-full" :color="`var(--color-orange-400)`" :numDrops="10"></PaintDrip>

        <div>
          <h1 class="tw-text-white tw-text-4xl tw-font-bold tw-mt-10 tw-mb-6">Meet Someone New!</h1>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-bg-orange-400 tw-p-5 tw-rounded-t-2xl tw-rounded-b-lg">
          <ProfileImage class="tw-mr-10 tw-text-white" v-for="item, i in discover" :key="i" :src="item.profilePic" :name="item.username" @click="goToWall(item.principalString)" />
        </div>
        <PaintDrip class="tw-h-20 tw-w-full" :color="`var(--color-orange-400)`" :numDrops="10"></PaintDrip>
      </div>
      <div v-else>
        <div class="tw-grid tw-grid-cols-4">
          <v-fade-transition v-for="item, i in filteredProfiles" :key="i">
            <div>
              <div
                class="tw-w-64 tw-flex tw-justify-center tw-bg-orange-400 tw-p-5 tw-rounded-t-2xl tw-rounded-b-lg tw-mt-10">
                <ProfileImage class="tw-text-white" :src="item.profilePic" :name="item.username" @click="goToWall(item.principalString)" />
              </div>
              <PaintDrip class="tw-h-10 tw-w-full tw-w-56" :color="`var(--color-orange-400)`" :numDrops="4"></PaintDrip>
            </div>
          </v-fade-transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Sticker from '../components/Sticker.vue'
import PaintDrip from '../components/PaintDrip.vue'
import ProfileImage from '../components/ProfileImage.vue'
import Search from '../components/Search.vue'
import { mapState } from 'vuex'
import { goToWall } from '../utils'

export default {
  name: 'Discover',
  components: {
    Sticker,
    ProfileImage,
    Search,
    PaintDrip,
  },
  data: () => ({
    placeHolder: "Search StkrWalls...",
    searching: false,
    filteredProfiles: [],
    popularSouls: [
      {
        name: "0xFamousUser",
        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
      },
      {
        name: "TantalizingTony3",
        src: "https://lh3.googleusercontent.com/7RX9Q06nc_PXAMg8Rdh1RcCJ_EQP24buDey2dQrOerIV9LxnGjSJA7bovg2jIV8DjfDsS-RJRf4-IIu8iGXlAGQO7fTr_SXSjzpR=w357"
      },
      {
        name: "tako_redpanda",
        src: "https://lh3.googleusercontent.com/09N0-Q9MIMm7yGcdLIk7O5p7ZFGb_BgiY8IIV1SjAanirnh-81t39LfKtmGLRm5JmJ3_jTKBBnC9OtEp35aYlyEsyNRIKrdR99Gi4w=s550"
      },
      {
        name: "UnamedRacoon",
        src: "https://lh3.googleusercontent.com/_HbpcU6TKYQrw8qEwxt2yYeBNHqyGDSUDjYjEmolw0B2HbWF7xCKKmqYmR3HyT2ghiJJgyR0ygCZOKaqRSIiWrYp2gemkvz92ZLldw=w357"
      },
    ],
    discover: [
      {
        name: "4kStum888wower",
        src: "https://lh3.googleusercontent.com/7e-rjw6mfVENp_xyN1NJHjoi2GU_1YQALHKs7L2DUMBIjqot-i2g_suD1fCxJqV3HdllRymFeAIwerxA--WsAkz9ldbgbG_Fkv0ewPw=w600"
      },
      {
        name: "DancingDaniel",
        src: "https://img.seadn.io/files/b8a8dd3e781fb49fb64b519e3a5498f4.png?fit=max&auto=format&w=600"
      },
      {
        name: "ArjunRober20",
        src: "https://img.seadn.io/files/6133e5bef3515ed389a4b546c1e90a48.png?fit=max&auto=format&h=720&w=720"
      },
      {
        name: "JonnyJassy9",
        src: "https://lh3.googleusercontent.com/J-8vLGmHUYx8guomAAfjfoG5O4z0gRxKb6aTKVt6MfN_1zTG0lnIyBTHGyz2iveL_6MfcVNuSPALDhfnFw0HOC9DftYo-QXWYPL33Q=s168"
      },
    ],
    searchItems: [
      {
        title: "0xSearchedUser"
      },
      {
        title: "0xSearchedUser"
      },
      {
        title: "0xSearchedUser"
      },
      {
        title: "0xSearchedUser"
      },
    ],
  }),
  computed: {
    ...mapState([ 'users' ]),
  },
  methods: {
    goToWall(principalString) {
      goToWall(principalString)
    },
    showFilteredProfiles(searchString) {
      if (searchString != '') {
        this.searching = true
        const regexp = new RegExp(searchString, 'i');
        this.filteredProfiles = this.users.filter(x => regexp.test(x.username)) // replace this.popularSouls with profiles from backend
      } else {
        this.searching = false
      }
    },
  },

  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },

  watch: {
    users: {
      immediate: true,
      handler() {
        if (this.users) {
          this.popularSouls = []
          this.discover = []
          for (let i = 0; i < this.users.length; ++i) {
            if (i % 2 === 0) {
              this.popularSouls.push(this.users[i])
            } else {
              this.discover.push(this.users[i])
            }
          }
        }
      },
    }
  },
}
</script>

<style>
</style>