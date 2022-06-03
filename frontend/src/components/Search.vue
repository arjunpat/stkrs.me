<template> 
    <div class="tw-flex tw-text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                > -->
                <div class="tw-flex">
        <input class="tw-w-full" type="text" v-model="input" placeholder="Search StkrWalls..." />
    </div>
            </template>
        </v-menu>
    </div>
    
    
    
    

    <!-- <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        > -->
</template>

<script>

export default {
    name: 'Search',

    props: {
        placeHolder: { type: String },
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

</style>

