
<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" v-if="true" v-bind="attrs" v-on="on">
                <v-badge color="red" :content="6" bottom overlap>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-card>

            <v-card-text class="tw-pt-3">
                <FriendRequest v-for="(friendRequest, i) in friendRequests" :friendRequest="friendRequest" :key="i"></FriendRequest>
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
