<template>
    <div class="tw-justify-center tw-h-full tw-bg-yellow-600 tw-pt-32">
        <div class="tw-p-4 tw-max-w-6xl tw-m-auto tw-h-full">
            <h1
                class="tw-mb-10 tw-text-white tw-text-6xl tw-font-bold tw-place-content-center text-center tw-underline tw-decoration-8 tw-decoration-yellow-400">
                Friends</h1>
            <Search holder="Search StkrWalls..." @search="showFilteredProfiles"></Search>
            <div v-if="!searching">
                <div class="tw-flex tw-flex-wrap tw-p-5 tw-gap-5">
                    <Friend v-for="item, i in friends" :key="`friend-${i}`" :friend="item"></Friend>
                </div>

            </div>
            <div v-else>
                <div class="tw-flex tw-flex-wrap tw-p-5 tw-gap-5">
                    <v-fade-transition v-for="item, i in filteredProfiles" :key="i">
                        <Friend v-for="item, i in friends" :key="`friend-${i}`" :friend="item"></Friend>
                    </v-fade-transition>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Sticker from '../components/Sticker.vue'
import PaintDrip from '../components/PaintDrip.vue'
import ProfileImage from '../components/ProfileImage.vue'
import Friend from '../components/Friend.vue'
import Search from '../components/Search.vue'
import { mapState } from 'vuex'
import { goToWall } from '../utils'

export default {
    name: 'Friends',
    components: {
        Sticker,
        ProfileImage,
        Search,
        PaintDrip,
        Friend,
    },
    data: () => ({
        placeHolder: "Search StkrWalls...",
        searching: false,
        filteredProfiles: [],
        friends: [
            {
                username: "0xFamousUser",
                principalString: "xijhawe9p8fj2pjp9a8usd9f8jpa23ojf",
                profilePic: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343",
                shared: [
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    },
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    },
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    },
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    }
                ]
            },
            {
                username: "TantalizingTony3",
                principalString: "xijhawe9p8fj2pjp9a8usd9f8jpa23ojf",
                profilePic: "https://lh3.googleusercontent.com/7RX9Q06nc_PXAMg8Rdh1RcCJ_EQP24buDey2dQrOerIV9LxnGjSJA7bovg2jIV8DjfDsS-RJRf4-IIu8iGXlAGQO7fTr_SXSjzpR=w357",
                shared: [
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    }
                ]
            },
            {
                username: "tako_redpanda",
                principalString: "xijhawe9p8fj2pjp9a8usd9f8jpa23ojf",
                profilePic: "https://lh3.googleusercontent.com/09N0-Q9MIMm7yGcdLIk7O5p7ZFGb_BgiY8IIV1SjAanirnh-81t39LfKtmGLRm5JmJ3_jTKBBnC9OtEp35aYlyEsyNRIKrdR99Gi4w=s550",
                shared: [
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    }
                ]
            },
            {
                username: "UnamedRacoon",
                principalString: "xijhawe9p8fj2pjp9a8usd9f8jpa23ojf",
                profilePic: "https://lh3.googleusercontent.com/_HbpcU6TKYQrw8qEwxt2yYeBNHqyGDSUDjYjEmolw0B2HbWF7xCKKmqYmR3HyT2ghiJJgyR0ygCZOKaqRSIiWrYp2gemkvz92ZLldw=w357",
                shared: [
                    {
                        id: "berkeleycs923",
                        name: "Berkeley CS",
                        src: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
                    }
                ]
            },
        ],
    }),
    computed: {
        ...mapState(['users']),
    },
    methods: {
        goToWall(principalString) {
            goToWall(principalString)
        },
        showFilteredProfiles(searchString) {
            if (searchString != '') {
                this.searching = true
                const regexp = new RegExp(searchString, 'i');
                this.filteredProfiles = this.friends.filter(x => regexp.test(x.username)) // replace this.popularSouls with profiles from backend
            } else {
                this.searching = false
            }
        },
    },

    created() {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    },

    watch: {
        users: {
            immediate: true,
            handler() {
                if (this.users) {
                    this.popularSouls = []
                    this.discover = []
                    for (let i = 0; i < this.users.length; ++i) {
                        if (i % 2 === 0) {
                            this.popularSouls.push(this.users[i])
                        } else {
                            this.discover.push(this.users[i])
                        }
                    }
                }
            },
        }
    },
}
</script>

<style>
</style>