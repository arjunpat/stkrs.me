<!-- Displays a profile image with the given image src -->

<template>
    <div>
        <div class="tw-flex tw-flex-col tw-justify-center tw-bg-yellow-400 tw-p-5 tw-gap-5 tw-rounded-t-2xl tw-rounded-b-md">
            <ProfileImage class="tw-flex tw-text-white" :src="friend.profilePic" :name="friend.username"
                color="var(--color-yellow-500)" @click="goToWall(friend.principalString)" />
            <div class="tw-flex tw-flex-row tw-justify-center -tw-mt-5 tw-gap-1">
                <div v-for="(community, i) in friend.shared" :key="i">
                    <div class="tw-relative tw-border tw-border-solid tw-border-gray-300 tw-rounded-full tw-bg-yellow-300"
                        style="width: fit-content; padding: 2px">
                        <v-tooltip top color="purple-600">
                            <template v-slot:activator="{ on, attrs }">
                                <img @click="goToSticker(community.id)" :src="community.src"
                                    class="tw-rounded-full tw-object-cover tw-cursor-pointer"
                                    style="height: 15px; width: 15px" v-bind="attrs" v-on="on" />
                            </template>
                            <span style="fontSize: 10px">{{ community.name }}</span>
                        </v-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <PaintDrip class="tw-h-10 tw-w-full" :color="`var(--color-yellow-400)`" :numDrops="4"></PaintDrip>
    </div>
</template>

<style scoped>
</style>

<script>
import ProfileImage from './ProfileImage.vue'
import PaintDrip from './PaintDrip.vue'
import { goToSticker } from '../utils'


export default {
    name: 'Friend',

    components: {
        ProfileImage,
        PaintDrip,
    },

    emits: ['remove'],

    props: {
        friend: { type: Object, default: null },
    },

    data: () => ({
        defaultFriend: {
            username: "0xFamousUser",
            principalString: "xijhawe9p8fj2pjp9a8usd9f8jpa23ojf",
            profilePic: "https://lh3.googleusercontent.com/gxfnxG53rQYUNh6_fOiJ-H3g_vPF0OH2m3_3eMrwL5eTKzn0YVjqulzC6dmL4kQIVPx4mWR_dOHUbZ2QXGiuoJeI4gX730_inVAvUw=w343"
        },
    }),
}
</script>