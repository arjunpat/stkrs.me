
<template>
    <v-banner>
        <div class="tw-flex tw-flex-row">
            <ProfileImage :src="friendRequest.user.profilePic" :width="30" class="tw-mr-2"></ProfileImage>
            <div>
            <h1>{{ friendRequest.user.username }}</h1>
            <h1 class="tw-text-xs tw-text-gray-400">{{ friendRequest.user.address }}</h1>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="accept" dark fab small class="tw-mr-2"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn color="red" dark fab small><v-icon>mdi-close</v-icon></v-btn>
        </div>
    </v-banner>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import ProfileImage from './ProfileImage.vue'

export default {
    name: 'FriendRequest',

    components: {
        ProfileImage
    },

    props: {
        friendRequest: { type: Object, required: true },
    },

    data: () => ({
    }),

    computed: {},

    methods: {
        ...mapActions(['getFriendsData']),
        async accept() {
            try {
                await window.contract.sendFriendRequest(this.friendRequest.user.address).send()
                this.getFriendsData()
            } catch (e) {
                console.error(e)
            }
        },
    },

    created() { },
}
</script>
