<!-- Displays a profile image with the given image src -->

<template>
  <div class="tw-bg-gray tw-w-full tw-flex pa-3">
    <div class="tw-flex">
      <ProfileImage class="tw-mr-4" :src="sticker.image" width="150" />
    </div>
    <div class="tw-flex tw-flex-col tw-h-full tw-bg-dark-gray tw-space-y-1 pa-5">
      <h1>{{ sticker.ownerUsername }} just earned a {{ sticker.name }} NFT!</h1>
      <h2>Shares {{ sticker.shared.length }} communities: <span v-for="community in sticker.shared" :key="community">{{community}}</span></h2>
      <v-btn>Endorse</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import ProfileImage from '@/components/ProfileImage'

export default {
  name: 'FeedItem',

  components: {
    ProfileImage,
  },

  props: {
    sticker: { type: Object, required: true },
  },

  data: () => ({}),

  computed: {},

  created() {},
}
</script>
