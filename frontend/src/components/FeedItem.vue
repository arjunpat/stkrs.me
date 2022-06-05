<!-- Displays a profile image with the given image src -->

<template>
  <div>
    <div
      class="tw-bg-green-700 tw-w-full tw-flex py-8 pl-16 tw-rounded-t-2xl tw-rounded-b-sm tw-text-white"
    >
      <div class="tw-flex">
        <ProfileImage class="tw-mr-4" :src="sticker.image" width="150" />
      </div>
      <div
        class="tw-flex tw-flex-col tw-h-full tw-bg-dark-gray tw-space-y-4 pl-5 pt-12"
      >
        <h1>
          <span class="tw-font-bold">{{ sticker.ownerUsername }}</span> just
          earned a <span class="tw-font-bold">{{ sticker.name }}</span> NFT!
        </h1>
        <h2>
          <span v-for="community in sticker.shared" :key="community"
            ><v-chip class="mr-1 tw-text-black" color="light-green lighten-4">{{
              community
            }}</v-chip></span
          >
        </h2>
        <v-btn class="tw-w-36" rounded>Endorse</v-btn>
      </div>
    </div>

    <PaintDrip
      class="tw-h-20 tw-w-full"
      :color="`var(--color-green-700)`"
      :numDrops="10"
    ></PaintDrip>
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
