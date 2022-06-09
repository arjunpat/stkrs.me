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
                    <v-container>
                        <v-row>
                            <v-textarea auto-grow solo placeholder=""></v-textarea>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="purple lighten-1" text @click="dialog = false">
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
    data: () => ({
        dialog: false,
    }),
}
</script>

<style>


</style>