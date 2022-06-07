<template>
  <div class="tw-justify-center tw-h-full tw-bg-red-700 tw-pt-16">
    <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full tw-space-y-8">
      <h1 class="tw-text-white tw-text-6xl tw-font-bold tw-place-content-center text-center">Discover</h1>
      <Search holder="Search StkrWalls..."></Search>
      <div class="tw-flex">
        <h1 class="tw-text-white tw-text-4xl tw-font-bold">Popular Stkr Walls of the Day</h1>
      </div>
      <ProfileImage class="tw-mr-20 tw-text-white "
          v-for="item, i in popularSouls"
          :key="i"
          v-bind="item" />
      <div>
        <h1 class="tw-text-white tw-text-4xl tw-font-bold">Meet Someone New!</h1>
      </div>
      <ProfileImage class="tw-mr-20 tw-text-white"
          v-for="item, i in discover"
          :key="i"
          v-bind="item" />
    </div>
  </div>
</template>

<script>
    import Sticker from '../components/Sticker.vue'
    import ProfileImage from '../components/ProfileImage.vue'
    import Search from '../components/Search.vue'

    export default {
        name: 'Discover',
        components: {
            Sticker,
            ProfileImage,
            Search,
        }, 
        data: () => ({
          placeHolder: "Search StkrWalls...",
          popularSouls: [
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
            },
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
            },
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
            },
            {
              name: "0xFamousUser",
              src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
            },
          ],
          discover: [
            {
              name: "0xKnownUser",
              src: "https://cdn.vox-cdn.com/thumbor/2xj1ySLIz1EZ49NvSsPzq8Itjyg=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
            },
            {
              name: "0xKnownUser",
              src: "https://cdn.vox-cdn.com/thumbor/2xj1ySLIz1EZ49NvSsPzq8Itjyg=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
            },
            {
              name: "0xKnownUser",
              src: "https://cdn.vox-cdn.com/thumbor/2xj1ySLIz1EZ49NvSsPzq8Itjyg=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
            },
            {
              name: "0xKnownUser",
              src: "https://cdn.vox-cdn.com/thumbor/2xj1ySLIz1EZ49NvSsPzq8Itjyg=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
            },
          ],
          searchItems: [
            {
              title: "0xSearchedUser"
            },
            {
              title: "0xSearchedUser"
            },
            {
              title: "0xSearchedUser"
            },
            {
              title: "0xSearchedUser"
            },
          ],
        }),
    }
</script>

<style>


</style>