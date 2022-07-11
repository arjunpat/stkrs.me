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
    <div class="tw-w-52">
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="stickerId2" label="Sticker ID" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="title2" label="Title" />
      <v-textarea outlined hide-details class="tw-mb-2" dense v-model="description2" label="Description" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="organization2" label="Organization" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="category2" label="Category" />
      <v-text-field outlined hide-details class="tw-mb-2" dense v-model="image2" label="Image" />
      <v-btn block color="primary" @click="editStkr" :loading="loading3" class="tw-mb-2" >Edit Stkr</v-btn>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { Principal } from "@dfinity/principal";
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

    stickerId2: '',
    title2: '',
    description2: '',
    organization2: '',
    category2: '',
    image2: '',
    loading3: false,
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
    editStkr() {
      this.loading3 = true
      this.stkr.editStkr(BigInt(this.stickerId2), this.title2, this.organization2, this.description2, this.category2, this.image2).then(() => {
        this.loading3 = false
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