<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab dark large color="purple" v-bind="attrs" v-on="on">
                    <v-icon dark>
                        mdi-comment-text
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span>What would you like to comment?</span>
                </v-card-title>
                <v-card-text>
                    <v-textarea v-model="text" hide-details auto-grow solo placeholder="Type a comment..."></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="purple lighten-1" text @click="dialog = false; $emit('submit', text)">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'CommentModal',

    emits: ['submit'],

    data: () => ({
        dialog: false,
        text: '',
    }),
}
</script>

<style>


</style>