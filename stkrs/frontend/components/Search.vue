<template>
    <div class="tw-flex tw-text-center">
        <template>
            <input class="tw-w-full tw-bg-white" type="text" v-model="input" :placeholder="holder" />
            <!-- <button @click="search(input)" class="tw-w-1/6 tw-bg-white">Search</button> -->
        </template>
        <!-- <v-list v-if="dropdownDisplay= true">
                <v-list-item
                v-for="(item, index) in searchItems"
                :key="index"
                >
                <v-list-item-title>hello</v-list-item-title>
                </v-list-item>
            </v-list> -->

    </div>



    <!-- <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        > -->
</template>

<script>
// import { ref } from "vue";
// let input = ref("");
// const fruits = ["apple", "banana", "orange"];
// function filteredList() {
//   return fruits.filter((fruit) =>
//     fruit.toLowerCase().includes(input.value.toLowerCase())
//   );

export default {
    props: {
        holder: { type: String },
    },
    data: () => ({
        input: '',
        // usernames: [
        //     {
        //         name: "blob"
        //     }, 
        //     {
        //         name: "blob2"
        //     }, 
        // ],
    }),
    methods: {
        search(username) {
            // search array usernames for matching name, return true or false. in the template section, if this function returns true, render
            //idea: include transition in moving screens after search 
            // for (const item of this.usernames) {
            //     if (username === item.name) {
            //         this.$router.push('/wall')
            //         console.log("navigated to user page (Wall Page for now)");
            //     }
            //     return false;
            // }
            this.$emit('search', username)
        },
        navigate(name) {
            if (this.$route.name !== name)
                this.$router.push({ name: name })
        }
    },
    watch: {
        input(val) {
            this.search(val)
        },
    }
}

</script>

<style scoped>
/* @import url("../assets/search.svg"); */

input {
    display: block;
    margin: 20px auto;
    padding: 10px 45px;
    background: white url("../assets/search.png") no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

button {
    display: block;
    margin: 20px auto;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

}
</style>

