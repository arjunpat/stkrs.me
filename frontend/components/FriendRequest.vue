
<template>
    <v-banner>
        <div class="tw-flex tw-flex-row">
            <ProfileImage :src="friendRequest.profileImage" :width="30" class="tw-mr-2"></ProfileImage>
            <div>
            <h1>{{ friendRequest.username }}</h1>
            <h1 class="tw-text-xs tw-text-gray-400">{{ friendRequest.principalId }}</h1>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="success" dark fab small class="tw-mr-2"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn color="red" dark fab small><v-icon>mdi-close</v-icon></v-btn>
        </div>
    </v-banner>
</template>

<style scoped>
</style>

<script>
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
        
    },

    created() { },
}
</script>
