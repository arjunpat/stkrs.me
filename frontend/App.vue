<template>
  <v-app>
    <template v-if="$route.meta.showNavBar">
      <v-app-bar app color="transparent" flat class="tw-z-30">
        <img @click="navigate('my-wall')" class="tw-h-32 tw-bg-contain" src="./assets/logostkrs.png">

        <v-spacer></v-spacer>

        <template v-if="authUserIdentity">
          <BlobButton @click="navigate('my-wall')" text="Wall" :variant="2" fill="var(--color-blue-500)"
            expand-on-click />
          <BlobButton @click="navigate('friends')" text="Friends" :variant="3" fill="var(--color-yellow-500)"
            expand-on-click />
          <BlobButton @click="navigate('feed')" text="Feed" :variant="1" fill="var(--color-green-500)"
            expand-on-click />
        </template>
        <BlobButton @click="navigate('discover')" text="Discover" :variant="0" fill="var(--color-orange-500)"
          expand-on-click />

        <Notifications v-if="authUserIdentity" :friendRequests="friendRequests"></Notifications>


        <v-btn v-if="authUserIdentity" @click="signOut" class="tw-text-base tw-text-white" text>
          Sign out
        </v-btn>
        <v-btn v-else @click="signInDialog = true" class="tw-text-base tw-text-white" text>
          Sign in
        </v-btn>
      </v-app-bar>

      <v-dialog v-model="signInDialog" width="400">
        <v-card>
          <v-card-title>Sign in</v-card-title>
          <v-card-text>
            <v-btn block @click="signIn" :loading="loadingSignIn">
              Sign in with
              <img alt="" style="width: 33px; margin-left: 0.7em;" src="./assets/dfinity.svg" />
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-fade-transition>
        <div v-if="loading"
          class="tw-fixed tw-z-20 tw-left-0 tw-top-0 tw-h-screen tw-w-screen tw-bg-blue-600 tw-grid tw-place-content-center">
          <div class="-tw-mt-40 tw-flex tw-items-center">
            <img class="tw-h-40 tw-bg-contain" src="./assets/loader.svg">
            <div class="tw-text-7xl tw-font-semibold tw-text-center tw-text-white">Loading...</div>
          </div>
        </div>
      </v-fade-transition>

      <v-main class="tw-p-0 tw-relative tw-z-10 tw-saturate-[.7]">
        <router-view />
      </v-main>
    </template>
    <template v-else>
      <v-fade-transition>
        <div v-if="loading"
          class="tw-fixed tw-z-20 tw-left-0 tw-top-0 tw-h-screen tw-w-screen tw-bg-blue-600 tw-grid tw-place-content-center">
          <div class="-tw-mt-40 tw-flex tw-items-center">
            <img class="tw-h-40 tw-bg-contain" src="./assets/loader.svg">
            <div class="tw-text-7xl tw-font-semibold tw-text-center tw-text-white">Loading...</div>
          </div>
        </div>
      </v-fade-transition>
      <router-view />
    </template>
  </v-app>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import BlobButton from './components/BlobButton.vue'
import Notifications from './components/Notifications.vue'
import { signIn, signOut, formatUser, setLibraryContract, fetchAllBooks } from './utils'

export default {
  name: 'App',

  components: {
    BlobButton,
    Notifications
  },

  // props: {
  //   navBar: {type: Boolean, default: true},
  // },

  data: () => ({
    loadingSignIn: false,
    signInDialog: false,
    friendRequests: [
      {
        profileImage: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
        username: "awiwef823jf",
        principalId: "awopiejf2893j9jawp9ef8japj"
      },
      {
        profileImage: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
        username: "awiwef823jf",
        principalId: "awopiejf2893j9jawp9ef8japj"
      },
      {
        profileImage: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
        username: "awiwef823jf",
        principalId: "awopiejf2893j9jawp9ef8japj"
      }
    ]
  }),

  computed: {
    ...mapState(['authClient', 'authUserIdentity', 'stkr', 'loading']),
  },

  methods: {
    ...mapMutations(['setUser', 'setStickers', 'setPins', 'setAuthClient', 'setAuthUserIdentity', 'setStkr']),
    ...mapActions(['fetchUser', 'fetchStickers', 'fetchPins', 'fetchComments', 'fetchUsers']),
    navigate(name) {
      if (this.$route.name !== name)
        this.$router.push({ name: name })
    },
    async signIn() {
      // try {
      //   this.loadingSignIn = true
      //   await signIn()
      //   const user = await this.stkr.getUser([])
      //   if (user.length === 0) {
      //     this.$router.push({ name: 'onboard' })
      //   } else {
      //     this.setUser(formatUser(user)) 
      //     this.fetchStickers()
      //     this.fetchPins()
      //     this.fetchComments()
      //     this.$router.push({ name: 'wall' })
      //   }
      //   this.loadingSignIn = false
      //   this.signInDialog = false
      // } catch (err) {
      //   console.error(err)
      // }
    },
    async signOut() {
      // await signOut()
      // this.setUser(null)
      // this.setStickers([])
      // this.setPins([])
      // this.$router.push({ name: 'discover' })
    },
  },

  async created() {
    // this.fetchUsers()

    // const authClient = await AuthClient.create()
    // this.setAuthClient(authClient)
    // const isAuthenticated = await authClient.isAuthenticated()

    // if (isAuthenticated) {
    //   const identity = authClient.getIdentity()
    //   this.setAuthUserIdentity(identity)

    //   const stkr = createActor(process.env.STKR_CANISTER_ID, {
    //     agentOptions: {
    //       identity,
    //     },
    //   })
    //   this.setStkr(stkr)

    //   this.fetchUser()
    //   this.fetchStickers()
    //   this.fetchPins()
    //   this.fetchComments()
    // }
  },
  
  async mounted() {
    await setLibraryContract()

    const books = await fetchAllBooks()
    console.log(books)
  }
};
</script>

<style lang="scss">
* {
  font-family: 'Poppins', sans-serif;
}

.v-btn {
  font-weight: 500 !important;
  letter-spacing: unset !important;
  text-transform: unset !important;
}
</style>
