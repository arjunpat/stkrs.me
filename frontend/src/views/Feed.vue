<template>
  <div
    class="tw-flex tw-p-4 tw-w-full tw-m-auto tw-h-full tw-justify-center tw-bg-lime-500"
  >
    <div class="tw-flex tw-pt-24 tw-flex-col tw-space-y-8 tw-w-1/2 tw-align-top">
      <div>
        <v-select
          :items="items"
          v-model="selected"
          label="Category"
          dense
          solo
        ></v-select>
      </div>
      <v-fade-transition v-for="(sticker, i) in stickers" :key="i">
        <FeedItem
          :sticker="sticker"
          v-if="selected == 'All' || selected == sticker.category"
        ></FeedItem
      ></v-fade-transition>
    </div>
  </div>
</template>

<script>
import FeedItem from '@/components/FeedItem'

export default {
  name: 'Feed',

  components: {
    FeedItem,
  },

  data: () => ({
    selected: 'All',
    items: ['All', 'Gaming', 'Professional'],
    stickers: [
      {
        ownerUsername: 'TantalizingTickler',
        name: 'Challenger League',
        image:
          'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022'],
        category: 'Gaming',
      },
      {
        ownerUsername: 'AbleOmicron',
        name: 'Challenger League',
        image:
          'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022'],
        category: 'Gaming',
      },
      {
        ownerUsername: 'AbleOmicron',
        name: 'Challenger League',
        image:
          'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022'],
        category: 'Professional',
      },
    ],
  }),
}
</script>
