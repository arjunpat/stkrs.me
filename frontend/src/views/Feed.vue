<template>
  <div class="tw-flex tw-p-4 tw-w-full tw-m-auto tw-h-full tw-justify-center">
      <div class="tw-flex tw-flex-col tw-space-y-8 tw-w-1/2">
        
       
        <FeedItem v-for="(sticker, i) in stickers" :key="i" :sticker="sticker"></FeedItem>
       
        
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
    items: ["Gaming"],
    stickers: [
      {
        ownerUsername: 'TantalizingTickler',
        name: 'Challenger League',
        image: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022']
      },
      {
        ownerUsername: 'AbleOmicron',
        name: 'Challenger League',
        image: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022']
      },
      {
        ownerUsername: 'SamuelPear',
        name: 'Challenger League',
        image: 'https://directory.seas.upenn.edu/wp-content/uploads/2020/06/directory-placeholder.jpg',
        shared: ['Challenger League', 'PennCS 2020-2022']
      },
    ],

  }),
}
</script>