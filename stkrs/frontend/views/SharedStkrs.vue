
<template>
  <div class="tw-justify-center tw-h-full tw-pt-16 tw-bg-green-600">
    <PaintDripSection class="-tw-mt-4 tw-h-5/6" color="blue-600">
    <div class="tw-grid tw-justify-center"> 
        <template>
            <h1 class="tw-text-white tw-text-6xl tw-font-bold text-center">StkrWalls With: </h1>
            <Sticker class="tw-pt-4" :src="sharedStkr" showName> </Sticker>
            <div class="tw-text-white tw-text-xl tw-font-bold text-center"> {{ name }} </div>
        </template>
        
        <div class="tw-grid tw-grid-cols-1 tw-gap-y-12 tw-justify-self-center tw-pt-5"> 
            <ProfileImage 
            v-for="user, i in users"
            @click="viewWall(user.principal)"
            horizontalDisplay
            class="tw-text-white tw-mt-5 tw-ml-5"
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
  import { mapState, mapMutations } from 'vuex'
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

    methods: {
      ...mapMutations([ 'setLoading' ]),
      viewWall(principal) {
        this.$router.push({ name: 'wall', params: { id: principal } })
      },
      setup() {
        this.users = []
        this.setLoading(true)

        this.stkr.getUsersWStkr(parseInt(this.id)).then(users => {
          const promises = []
          for (const principal of users) {
            promises.push(
              this.stkr.getUser([ principal ]).then(user => {
                this.users.push({
                  ...formatUser(user),
                  principal: principal.toString(),
                })
              })
            )
          }
          Promise.all(promises).then(() => {
            this.setLoading(false)
          })
        })

        // TODO: add logic for getting the details of the stkr with the given id
      },
    },

    created() {
      console.log('created')
      this.setup()
    },

    watch: {
      $route: {
        immediate: false,
        handler() {
          console.log('routee')
          this.setup()
        },
      },
    },
  }
</script>
