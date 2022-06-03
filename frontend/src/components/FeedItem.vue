<!-- Displays a profile image with the given image src -->

<template>
  <div>
    <div class="tw-bg-lime-700 tw-w-full tw-flex pa-3 tw-rounded-t-2xl tw-rounded-b-sm tw-text-white">
      <div class="tw-flex">
        <ProfileImage class="tw-mr-4" :src="sticker.image" width="150" />
      </div>
      <div
        class="tw-flex tw-flex-col tw-h-full tw-bg-dark-gray tw-space-y-1 pa-5"
      >
        <h1>
          {{ sticker.ownerUsername }} just earned a {{ sticker.name }} NFT!
        </h1>
        <h2>
          Shares {{ sticker.shared.length }} communities:
          <span v-for="community in sticker.shared" :key="community">{{
            community
          }}</span>
        </h2>
        <v-btn>Endorse</v-btn>
      </div>
    </div>

    <PaintDrip class="tw-h-20 tw-w-full" :color="`var(--color-lime-700)`" :numDrops="10"></PaintDrip>
  </div>
</template>

<style scoped></style>

<script>
import PaintDrip from '@/components/PaintDrip'
import ProfileImage from '@/components/ProfileImage'

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

  computed: {},

  created() {},
}
</script>
