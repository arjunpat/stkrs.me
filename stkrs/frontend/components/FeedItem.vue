<!-- Displays a profile image with the given image src -->

<template>
  <div>
    <div class="tw-bg-green-700 tw-w-full tw-flex py-8 pl-8 tw-rounded-t-2xl tw-rounded-b-sm tw-text-white tw-relative">
      <div class="tw-absolute tw-top-5 tw-left-5 tw-bg-green-600 tw-rounded-full pa-1">
        <v-icon large color="white">
          {{ categoryIcon }}
        </v-icon>
      </div>
      <div class="tw-flex tw-ml-12 tw-pr-3">
        <ProfileImage :src="sticker.image" :width="150" />
      </div>
      <div class="tw-flex tw-flex-col tw-h-full tw-bg-dark-gray tw-space-y-4 pl-5 pt-6">
        <div class="tw-bg-green-400 tw-rounded-lg tw-px-2 tw-mr-3">
        <h1 class="tw-text-lg">
          <span class="tw-font-bold">{{ sticker.ownerUsername }}</span>
          earned a <span class="tw-font-bold">{{ sticker.name }}</span> NFT!
        </h1>
        </div>
        <h2>
          <span v-for="community in sticker.shared" :key="community">
            <v-chip small class="mr-1 tw-text-black" color="light-green lighten-4">{{
                community
            }}</v-chip>
          </span>
        </h2>
        <v-btn class="tw-w-36" rounded>Endorse</v-btn>


      </div>
    </div>

    <PaintDrip class="tw-h-20 tw-w-full" :color="`var(--color-green-700)`" :numDrops="10"></PaintDrip>
  </div>
</template>

<style scoped>
</style>

<script>
import PaintDrip from '../components/PaintDrip.vue'
import ProfileImage from '../components/ProfileImage.vue'

export default {
  name: 'FeedItem',

  components: {
    ProfileImage,
    PaintDrip,
  },

  props: {
    sticker: { type: Object, required: true },
  },

  data: () => ({}),

  computed: {
    categoryIcon() {
      switch (this.sticker.category) {
        case 'Gaming':
          return 'mdi-google-controller'
        case 'Professional':
          return 'mdi-account-tie'
        case 'Academic':
          return 'mdi-school'
        case 'Sports':
          return 'mdi-basketball'
      }
    }
  },

  created() { },
}
</script>
