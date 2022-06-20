<template>
  <div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <input type="text" v-model="title" placeholder="Title"><br>
    <input type="text" v-model="description" placeholder="Description"><br>
    <input type="text" v-model="organization" placeholder="Organization"><br>
    <input type="text" v-model="category" placeholder="Category"><br>
    <input type="text" v-model="image" placeholder="Image"><br>
    <button @click="createStkr">Create Stkr</button><br>
    <p>Result: {{ JSON.stringify(result) }}</p>
  </div>
</template>

<script>
import { stkr as publicStkr } from 'canisters/stkr'
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    title: "",
    description: "",
    organization: "",
    category: "",
    image: "",
    result: "",
  }),
  methods: {
    createStkr() {
      this.stkr.createStkr(this.title, this.organization, this.description, this.category, this.image).then(result => {
        this.result = result;
      })
    }
  },
  computed: {
    ...mapState([ 'stkr' ]),
  },
}
</script>

<style scoped>
input {
  display: block;
  border: 1px solid black;
}
</style>