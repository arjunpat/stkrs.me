<template>
  <v-app>
    <v-app-bar
      app
      color="transparent"
      flat
      class="tw-z-20"
    >
      <img class="tw-h-32 tw-bg-contain" src="./assets/logostkrs.png">

      <v-spacer></v-spacer>

      <template v-if="authUserIdentity">
        <BlobButton 
          @click="navigate('wall')"
          text="Wall"
          :variant="2"
          fill="var(--color-blue-500)"
          expand-on-click
        />
        <BlobButton 
          @click="navigate('feed')"
          text="Feed"
          :variant="1"
          fill="var(--color-green-500)"
          expand-on-click
        />
      </template>
      <BlobButton 
        @click="navigate('discover')"
        text="Discover"
        :variant="0"
        fill="var(--color-orange-500)"
        expand-on-click
      />

      <v-btn 
        v-if="authUserIdentity"
        @click="signOut"
        class="tw-text-base tw-text-white"
        text
      >
        Sign out
      </v-btn>
      <v-btn 
        v-else
        @click="signInDialog = true"
        class="tw-text-base tw-text-white"
        text
      >
        Sign in
      </v-btn>
    </v-app-bar>

    <v-dialog
      v-model="signInDialog"
      width="400"
    >
      <v-card>
        <v-card-title>Sign in</v-card-title>
        <v-card-text>
          <v-btn block @click="signIn">
            Sign in with 
            <img alt="" style="width: 33px; margin-left: 0.7em;" src="./assets/dfinity.svg" />
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog> 

    <v-main class="tw-p-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { AuthClient } from '@dfinity/auth-client';
import { mapState, mapMutations } from 'vuex'
import { createActor } from 'canisters/stkr'
import BlobButton from './components/BlobButton.vue'
import { signIn, signOut } from './utils'

export default {
  name: 'App',

  components: {
    BlobButton,
  },

  data: () => ({
    signInDialog: false,
  }),

  computed: {
    ...mapState(['authClient', 'authUserIdentity', 'stkr']),
  },

  methods: {
    ...mapMutations(['setAuthClient','setAuthUserIdentity', 'setStkr']),
    navigate(name) {
      if (this.$route.name !== name)
        this.$router.push({ name: name })
    },
    async signIn() {
      try {
        await signIn()
        this.signInDialog = false
        this.$router.push({ name: 'wall' })
      } catch (err) {
        console.error(err)
      }
    },
    async signOut() {
      await signOut()
      this.$router.push({ name: 'discover' })
    },
  },

  async created() {
    const authClient = await AuthClient.create()
    this.setAuthClient(authClient)
    const isAuthenticated = await authClient.isAuthenticated()

    if (isAuthenticated) {
      const identity = authClient.getIdentity()
      this.setAuthUserIdentity(identity)

      const stkr = createActor(process.env.STKR_CANISTER_ID, {
        agentOptions: {
          identity,
        }, 
      })
      this.setStkr(stkr)
    }
  },
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
