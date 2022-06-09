<template>
  <v-app>
    <v-app-bar
      app
      color="transparent"
      flat
      class="tw-z-20"
    >
      <div class="d-flex align-center tw-text-white tw-font-extrabold tw-text-lg">
        STKRS
      </div>

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
        class="tw-normal-case tw-tracking-normal tw-text-base tw-text-white tw-font-semibold"
        text
      >
        Sign out
      </v-btn>
      <v-btn 
        v-else
        @click="signIn"
        class="tw-normal-case tw-tracking-normal tw-text-base tw-text-white tw-font-semibold"
        text
      >
        Sign in
      </v-btn>
    </v-app-bar>

    <v-main class="tw-p-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { AuthClient } from '@dfinity/auth-client';
import { mapState, mapGetters, mapMutations } from 'vuex'
import BlobButton from './components/BlobButton.vue'
import { signIn, signOut } from './utils'

export default {
  name: 'App',

  components: {
    BlobButton,
  },

  data: () => ({
  }),

  computed: {
    ...mapState(['authClient', 'authUserIdentity']),
  },

  methods: {
    ...mapMutations(['setAuthClient','setAuthUserIdentity']),
    navigate(name) {
      if (this.$route.name !== name)
        this.$router.push({ name: name })
    },
    async signIn() {
      try {
        await signIn()
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
    }

    setTimeout(() => {
      console.log(this.authClient)
    }, 1000)
  },
};
</script>

<style lang="scss">

* {
  font-family: 'Poppins', sans-serif;
}

</style>
