
<template>
  <div class="tw-justify-center tw-h-full tw-pt-16 tw-bg-blue-600">
      <PaintDripSection class="-tw-mt-4" color="blue-600">
    <div class="tw-grid tw-justify-center"> 
        <template>
            <h1 class="tw-text-white tw-text-6xl tw-font-bold text-center">StkrWalls With: </h1>
            <Sticker class="tw-pt-4" :src="sharedStkr" showName> </Sticker>
            <div class="tw-text-white tw-text-xl tw-font-bold text-center"> {{ name }} </div>
        </template>
        
        <div class="tw-grid tw-grid-cols-1 tw-gap-y-12 tw-justify-self-center tw-pt-5"> 
            <ProfileImage 
            horizontalDisplay
            class="tw-text-white tw-mt-5 tw-ml-5"
            v-for="user, i in users"
            :key="`popular-${i}`" 
            :name="user.username"
            :src="user.profilePic"
            :bio="user.bio"
            :principal="user.principal"
            />
        </div>
    </div>
    </PaintDripSection>
  </div>
</template>

<script>
  import Sticker from '../components/Sticker.vue'
  import ProfileImage from '../components/ProfileImage.vue'
  import PaintDripSection from '../components/PaintDripSection.vue'
  import PaintDrip from '../components/PaintDrip.vue'
  import { mapState } from 'vuex'
  import { formatUser } from '../utils'


  export default {
    name: 'SharedStkrs',

    props: {
      id: { type: Number | String, required: true },
    },

    components: {
        Sticker,
        ProfileImage,
        PaintDrip,
        PaintDripSection,
    },

    data: () => ({
      client: null,
      clientReady: false,
      signedIn: false,

      sharedStkr: "https://blog.hubspot.com/hubfs/image8-2.jpg",
      name: "Google Dev",
      users: [],
    }),

    computed: {
      ...mapState([ 'stkr' ]),
    },

    async created() {
      this.stkr.getUsersWStkr(parseInt(this.id)).then(users => {
        for (const principal of users) {
          this.stkr.getUser([ principal ]).then(user => {
            this.users.push({
              ...formatUser(user),
              principal: principal.toString(),
            })
          })
        }
      })

      // TODO: add logic for getting the details of the stkr with the given id
    },
  }
</script>
