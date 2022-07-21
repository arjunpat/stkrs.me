
<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" v-if="true" v-bind="attrs" v-on="on">
                <v-badge v-if="friendRequests.length > 0" color="red" :content="friendRequests.length" bottom overlap>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
                <v-icon v-else>mdi-bell</v-icon>
            </v-btn>
        </template>

        <v-card>

            <v-card-text class="tw-pt-3">
                <FriendRequest v-for="(friendRequest, i) in friendRequests" :friendRequest="friendRequest" :key="i"></FriendRequest>
                <div class="tw-text-center tw-mt-4" v-if="friendRequests.length === 0">Nothing to see here!</div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="dialog = false">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
</style>

<script>
import FriendRequest from './FriendRequest.vue'

export default {
    name: 'Notifications',

    components: {
        FriendRequest
    },

    props: {
        friendRequests: { type: Array, required: true },
    },

    data: () => ({
        dialog: false,
    }),

    computed: {},

    methods: {
        
    },

    created() { },
}
</script>
