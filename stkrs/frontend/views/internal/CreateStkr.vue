<template>
  <div class="tw-flex tw-justify-center tw-items-center tw-h-screen tw-gap-12">
    <div class="tw-w-52">
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="title" label="Title" />
      <v-textarea outlined hide-details class="tw-mb-2" dense v-model="description" label="Description" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="organization" label="Organization" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="category" label="Category" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="image" label="Image" />
      <v-btn block color="primary" @click="createStkr" :loading="loading1" class="tw-mb-2" >Create Stkr</v-btn>
      <p>Result: {{ JSON.stringify(result) }}</p>
    </div>
    <div>
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="stickerId" label="Sticker ID" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="principal" label="Principal" />
      <v-btn block color="primary" @click="sendStkr" :loading="loading2" class="tw-mb-2" >Send stkr</v-btn>
    </div>  
  </div>
</template>

<script>
import { Principal } from "@dfinity/principal";
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
    loading1: false,
    loading2: false,
    stickerId: '',
    principal: '',
  }),
  methods: {
    createStkr() {
      this.loading1 = true
      this.stkr.createStkr(this.title, this.organization, this.description, this.category, this.image).then(result => {
        this.loading1 = false
        this.result = parseInt(result)
      })
    },
    sendStkr() {
      this.loading2 = true
      const principal = Principal.fromText(this.principal)
      this.stkr.sendStkr(BigInt(this.stickerId), principal).then(() => {
        this.loading2 = false
      })
    },
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