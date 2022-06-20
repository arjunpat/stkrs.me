<template>
  <div class="tw-flex tw-justify-center tw-bg-blue-600 tw-pb-56 tw-pt-20">
    <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full">
      <PaintDripSection v-if="user" class="-tw-mt-4" color="blue-600">
        <div class="tw-flex">
          <ProfileImage class="tw-mr-8" :src="user.profilePic" />
          <div class="tw-self-center">
            <div class="tw-mb-2 tw-flex tw-items-center">
              <div class="tw-text-white tw-font-semibold tw-text-5xl tw-mr-4">
                {{ user.username }}
                <v-tooltip top v-if="Object.keys(stickers).length > 3">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="tw-text-4xl tw-text-green-300" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
                  </template>
                  <span>Verified</span>
                </v-tooltip>
                <v-tooltip top v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="tw-text-4xl tw-text-yellow-300" v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
                  </template>
                  <span>Unverified</span>
                </v-tooltip>
              </div>
              <v-btn v-if="isCurUser" @click="edit" icon class="tw-text-white">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <div class="tw-text-white tw-font-extralight tw-text-md">{{ principalString }}</div>
            <div class="tw-text-white tw-font-normal tw-my-4 tw-max-w-3xl">
              {{ user.bio }}
            </div>
          </div>
        </div>
      </PaintDripSection>

      <PaintDripSection color="green-700">
        <div class="tw-text-center tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">
          Pinned
        </div>
        <div v-if="pins.length > 0" class="tw-space-x-4">
          <Sticker v-for="(stickerId, i) in pins" :key="i" v-bind="stickers[stickerId]" dark :pin="isCurUser" showName
            :pinned="isPinned(stickerId)" @pin="togglePin(stickerId)" @click="showSticker(stickerId)" />
        </div>
        <div v-else class="tw-text-center tw-text-lg tw-text-white">
          No pinned stkrs yet!
        </div>
      </PaintDripSection>

      <PaintDripSection :color="tabColor">
        <template v-if="Object.keys(stickers).length === 0">
          <div class="tw-text-center tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">
            Stkrs
          </div>
          <div class="tw-text-center tw-text-lg tw-text-white">
            No stkrs yet!
          </div>
        </template>

        <template v-else>
          <v-tabs id="tabGroup" v-model="tab" centered :background-color="`var(--${tabColor})`" icons-and-text>
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab v-for="category in Object.keys(categories)" :key="category" :ripple="false">
              <BlobButton :text="category" :fill="`var(--color-${categoryBtnColors[category]})`" />
            </v-tab>
          </v-tabs>


          <v-tabs-items continuous v-model="tab" class="tabItemGroup tw-w-screen">
            <v-tab-item v-for="(category, i) in Object.keys(categories)" :key="category">
              <PaintDripSection :key="i" :color="categories[category].color">
                <div class="tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">{{ category }}</div>
                <div class="tw-space-y-4">
                  <div v-for="stickerId, s in categories[category].stickers" :key="s" class="tw-flex">
                    <Sticker v-bind="stickers[stickerId]" :pinned="isPinned(stickerId)" dark @pin="togglePin(stickerId)"
                      @click="showSticker(stickerId)" :pin="isCurUser" />
                    <div class="tw-w-96 tw-p-4">
                      <div class="tw-text-white tw-text-xl tw-font-semibold tw-tracking-wide">{{
                          stickers[stickerId].name
                      }}</div>
                      <div class="tw-text-white tw-flex tw-items-center">
                        <div class="tw-mr-1">Awarded by</div>
                        <div class="tw-font-medium tw-mr-1">{{ stickers[stickerId].organization }}</div>
                        <v-icon class="tw-text-blue-400 tw-text-sm">mdi-check-decagram</v-icon>
                      </div>
                      <div class="tw-text-gray-300">{{ stickers[stickerId].description }}</div>
                    </div>
                  </div>
                </div>
              </PaintDripSection>
            </v-tab-item>
          </v-tabs-items>
        </template>
      </PaintDripSection>

      <PaintDripSection color="purple-600">
        <div class="tw-text-center tw-text-4xl tw-font-semibold tw-mb-4 tw-text-white">
          Comments
        </div>
        <div v-if="comments.length > 0" class="tw-grid tw-grid-cols-3 tw-gap-4">
          <Comment v-for="(comment, i) in comments" :key="i" :comment="comment" />
        </div>
        <div v-else class="tw-text-center tw-text-lg tw-text-white">
          No comments yet!
        </div>
        <div v-if="allowCommenting" class="tw-text-center tw-mt-5">
          <CommentModal class="tw-mt-6" @submit="text => addComment(text)"></CommentModal>
        </div>
      </PaintDripSection>


    </div>
  </div>

</template>

<script>
import Sticker from '../components/Sticker.vue'
import ProfileImage from '../components/ProfileImage.vue'
import PaintDripSection from '../components/PaintDripSection.vue'
import PaintDrip from '../components/PaintDrip.vue'
import Comment from '../components/Comment.vue'
import BlobButton from '../components/BlobButton.vue'
import CommentModal from '../components/CommentModal.vue'
import { Principal } from "@dfinity/principal";

import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { formatUser, formatStickers, getComments } from '../utils'
import { stkr as publicStkr } from 'canisters/stkr'

export default {
  name: 'Wall',

  props: {
    id: { type: String, default: '' },
  },

  components: {
    BlobButton,
    PaintDripSection,
    ProfileImage,
    Sticker,
    PaintDrip,
    Comment,
    CommentModal,
  },

  data() {
    return {
      tabColor: 'red-600',
      tab: null,

      categoryOrders: {
        category1: 'Professional',
        category2: 'Fun',
        category3: 'Communities'
      },
      categoryColors: {
        'Professional': 'red-600',
        'Fun': 'orange-600',
        'Communities': 'pink-600',
      },
      categoryBtnColors: {
        'Professional': 'red-500',
        'Fun': 'orange-500',
        'Communities': 'pink-500',
      },
      comments: [],
      user: null,
      stickers: [],
      pins: [],
      principalString: '',
    }
  },

  computed: {
    ...mapState(['stkr', 'authUserIdentity']),
    ...mapState({
      curUser: 'user',
      curUserStickers: 'stickers',
      curUserPins: 'pins',
      curUserComments: 'comments',
    }),
    ...mapGetters({ curUserPrincipal: 'principal', curUserPrincipalString: 'principalString' }),
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
    isCurUser() {
      return this.id === ''
    },
    isSignedIn() {
      return Boolean(this.curUser)
    },
    allowCommenting() {
      const stickerOverlap = Object.keys(this.curUserStickers).filter(value => Object.keys(this.stickers).includes(value));

      return this.isSignedIn && !this.isCurUser && stickerOverlap.length > 0
    }
  },

  methods: {
    ...mapMutations(['addPin', 'removePin', 'setLoading']),
    ...mapActions(['fetchUser', 'fetchStickers', 'fetchPins']),
    async addComment(text) {
      const principal = Principal.fromText(this.id)
      await this.stkr.addComment(principal, text)
      getComments(principal).then(comments => {
        this.comments = comments
      })
    },
    edit() {
      const { username, profilePic, bio } = this.user
      this.$router.push({ name: 'onboard', query: { username, profilePic, bio } })
    },
    togglePin(stickerId) {
      if (this.isPinned(stickerId)) {
        this.removePin(stickerId)
        this.stkr.removePin(parseInt(stickerId))
      } else {
        this.stkr.addPin(parseInt(stickerId))
        this.addPin(stickerId)
      }
    },
    isPinned(stickerId) {
      return this.pins.includes(stickerId)
    },
    showSticker(stickerId) {
      this.$router.push({ name: 'stkr', params: { id: stickerId } })
    },

    setup() {
      // Scroll to top, set loading to true, correct id if necessary
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.setLoading(true)
      if (this.id === this.curUserPrincipalString) {
        this.$router.replace({ name: 'my-wall' })
      }

      // Reset everything
      this.comments = []
      this.user = null
      this.stickers = []
      this.pins = []
      this.principalString = ''

      // Load user data
      let promises = []
      if (this.isCurUser) {
        if (this.user) this.setLoading(false)
        this.user = this.curUser
        this.stickers = this.curUserStickers
        this.pins = this.curUserPins
        this.principalString = this.curUserPrincipalString
        promises = [
          this.$store.dispatch('fetchUser').then(() => { this.user = this.curUser }),
          this.$store.dispatch('fetchStickers').then(() => this.stickers = this.curUserStickers),
          this.$store.dispatch('fetchPins').then(() => this.pins = this.curUserPins),
          this.$store.dispatch('fetchComments').then(() => this.comments = this.curUserComments),
        ]
      } else {
        this.user = null
        this.stickers = []
        this.pins = []
        this.principalString = ''
        const principal = Principal.fromText(this.id)
        this.principalString = principal.toString()
        promises = [
          publicStkr.getUser([principal]).then(user => {
            this.user = formatUser(user)
          }),
          publicStkr.getStkrs([principal]).then(stickers => {
            this.stickers = formatStickers(stickers)
          }),
          publicStkr.getPins([principal]).then(pins => {
            this.pins = pins
          }),
          new Promise((resolve, reject) => {
            return getComments(principal).then(comments => {
              this.comments = comments
              resolve()
            })
          })
        ]
      }

      Promise.all(promises).then(() => {
        if (this.user)
          this.setLoading(false)
      })
    },
  },

  created() {
    this.setup()
  },

  watch: {
    tab: {
      immediate: false,
      handler() {
        this.tabColor = Object.values(this.categories)[this.tab].color
      }
    },
    '$route.params.id': {
      handler() {
        this.setup()
      },
    },
    $route: {
      immediate: true,
      handler() {
        this.setup()
      },
    },
    user: {
      handler() {
        if (this.user) this.setLoading(false)
      }
    },
    curUser: {
      handler() {
        if (this.isCurUser) this.user = this.curUser
      },
    },
    curUserStickers: {
      handler() {
        if (this.isCurUser) this.stickers = this.curUserStickers
      },
    },
    curUserPins: {
      handler() {
        if (this.isCurUser) this.pins = this.curUserPins
      },
    },
    curUserComments: {
      handler() {
        if (this.isCurUser) this.comments = this.curUserComments
      },
    },
  },
}
</script>

<style>
#tabsholder .tabsbarstuff {
  width: 100% !important;
}

#tabsholder .tabstuff {
  width: 100% !important;

  height: 100% !important;
}

#tabsholder .mytabs {
  width: 100% !important;
  background-color: black !important;
}
</style>
