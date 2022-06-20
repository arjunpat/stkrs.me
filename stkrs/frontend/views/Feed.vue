<template>
  <div
    class="tw-flex tw-p-4 tw-w-full tw-m-auto tw-h-full tw-justify-center tw-bg-green-600"
  >
  
    <div class="tw-flex tw-pt-32 tw-flex-col tw-space-y-8 tw-w-3/5 tw-align-top">
      <h1 class="tw-text-white tw-text-6xl tw-font-bold tw-place-content-center text-center tw-underline tw-decoration-8 tw-decoration-green-400">Feed</h1>
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
import FeedItem from '../components/FeedItem.vue'

export default {
  name: 'Feed',

  components: {
    FeedItem,
  },

  data: () => ({
    selected: 'All',
    items: ['All', 'Gaming', 'Professional', 'Academic', 'Sports'],
    stickers: [
      
      {
        ownerUsername: 'Erikatious938',
        name: 'McDonalds Employee of the Month',
        image:
          'https://pbs.twimg.com/profile_images/1513918204325728257/5-R-x-P__400x400.jpg',
        shared: ['Ignition Club', 'UPenn CS'],
        category: 'Professional',
      },
      {
        ownerUsername: 'Daniel382111',
        name: 'Google Employee 10 Years',
        image:
          'https://blog.hubspot.com/hubfs/image8-2.jpg',
        shared: ['Google', 'Berkeley EECS'],
        category: 'Professional',
      },
      {
        ownerUsername: 'TantalizingTickler',
        name: 'Challenger League',
        image:
          'https://cdn.dribbble.com/users/1247750/screenshots/13898492/challenger.png',
        shared: ['Challenger League', 'PennCS'],
        category: 'Gaming',
      },
      {
        ownerUsername: 'AbledFish',
        name: 'Platnium League',
        image:
          'https://img.rankedboost.com/wp-content/uploads/2016/06/8bb2bfecd2bad0fb.jpg',
        shared: ['Platnium League', 'Berkeley EECS'],
        category: 'Gaming',
      },
      {
        ownerUsername: 'TonyForever2022',
        name: 'California State Champions',
        image:
          'https://www.ocregister.com/wp-content/uploads/2019/03/CIF-STATE-logo-basketball-1.png?w=640',
        shared: ['CIF', 'Mountain View High School'],
        category: 'Sports',
      },
      {
        ownerUsername: 'AstoundedErik',
        name: 'Soccer Santa Clara',
        image:
          'https://img.freepik.com/free-vector/soccer-logo-american-logo-sports_1366-257.jpg?w=2000',
        shared: ['SCSA', 'San Diego State'],
        category: 'Sports',
      },
      {
        ownerUsername: 'SometimesAwesomeArjun',
        name: 'National Merit Scholar',
        image:
          'https://harkeraquila.com/wp-content/uploads/2021/10/NMSC2-900x492.jpg',
        shared: ['Berkeley CS', 'Los Altos Community'],
        category: 'Academic',
      },
      {
        ownerUsername: 'JumpyJonathan',
        name: 'USC Presidential Scholar',
        image:
          'https://pbs.twimg.com/profile_images/1338648284118667264/u8OeYl_0_400x400.jpg',
        shared: ['USC Viterbi', 'Mountain View High School'],
        category: 'Academic',
      },
      {
        ownerUsername: 'JammyJason',
        name: 'Los Altos Community Award',
        image:
          'https://jammatennis.com/images/logo.png',
        shared: ['Ignition Club', 'Los Altos Community'],
        category: 'Academic',
      },
    ],
  }),

  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
}
</script>
