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


      <BlobButton 
        @click="navigate('wall')"
        text="My Wall"
        :variant="0"
        fill="var(--color-blue-500)"
      />
      <BlobButton 
        @click="navigate('feed')"
        text="Feed"
        :variant="1"
        fill="var(--color-green-500)"
      />
      <BlobButton 
        @click="navigate('discover')"
        text="Discover"
        :variant="2"
        fill="var(--color-red-600)"
      />
    </v-app-bar>

    <v-main class="tw-p-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import BlobButton from '@/components/BlobButton'

export default {
  name: 'App',

  components: {
    BlobButton,
  },

  data: () => ({
    
  }),

  methods: {
    navigate(name) {
      if (this.$route.name !== name)
        this.$router.push({ name: name })
    }
  },
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

</style>
