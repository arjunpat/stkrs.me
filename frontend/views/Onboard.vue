
<template>
  <div> 
    <PaintDripSection color="blue-600" class="tw-min-h-screen">
      <div class="tw-grid tw-place-content-center tw-pb-3 -tw-my-20">
        <div>
          <img class="tw-object-scale-down tw-h-72 tw-w-96" src="../assets/logostkrs.png">
          <form class="tw-pt-6 tw-space-y-6 tw-place-content-center">
              <div class="tw-flex tw-flex-col tw-space-y-3 ">
                  <label class="tw-text-white">Welcome! What do you want your username to be?</label>
                  <input 
                  v-model="_username"
                  type="username" 
                  placeholder="Username"
                  name="username"
                  style='color=#FFFF00'
                  class="tw-outline-none tw-ring-2 tw-ring-zinc-200  tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
                  />
              </div>
              <div class="tw-flex tw-flex-col tw-space-y-3">
                <label class="tw-text-white">Give us a link to your profile picture</label>
                <input 
                  v-model="_profilePic"
                  placeholder="Profile picture URL"
                  class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
                />
              </div>
              <div class="tw-flex tw-flex-col tw-space-y-3">
                  <label class="tw-text-white">Write a bio - tell us about yourself!</label>
                  <textarea
                  v-model="_bio"
                  rows="6" 
                  type="bio" 
                  placeholder="Bio"
                  name="Bio"
                  class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
                  />
              </div>
              <div class="tw-flex tw-flex-col tw-space-y-3">
                <label class="tw-text-white">What's your telegram username?</label>
                <input 
                  v-model="_telegramUsername"
                  placeholder="john.doe"
                  class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
                />
              </div>
          </form>   
        </div>
        <div class="tw-flex tw-flex-col tw-place-items-center tw-space-y-3">
          <BlobButton
            @click="submit"
            text="Submit"
            :variant="2"
            fill="var(--color-blue-500)"
            expand-on-click
            class="tw-z-50 tw-mt-4"
          />
        </div> 
      </div>
    </PaintDripSection>
    <div class="tw-bg-green-500 tw-h-32">
    </div> 
  </div> 
</template>

<script>
  import BlobButton from '../components/BlobButton.vue'
  import { mapState, mapActions, } from 'vuex'
  import PaintDripSection from '../components/PaintDripSection.vue'
  import { setCurUser } from '../utils'

  export default {
    name: "Onboard",

    props: {
      username: { type: String, default: '' },
      profilePic: { type: String, default: '' },
      bio: { type: String, default: '' },
      telegramUsername: { type: String, default: '' },
    },

    components: {
      BlobButton,
      PaintDripSection,
    },

    data: () => ({
      _username: '',
      _profilePic: '',
      _bio: '',
      _telegramUsername: '',
    }),

    computed: {
      ...mapState([ 'stkr' ]),
    },
    
    methods: {
      ...mapActions(['getCurUser']),
      async submit() {
        try {
          await setCurUser(this._username, this._bio, this._profilePic, this._telegramUsername)
          this.getCurUser()
          this.$router.push({ name: 'my-wall' })
        } catch (e) {
          console.error(e)
        }
      },
    },

    created() {
      this._username = this.username
      this._profilePic = this.profilePic
      this._bio = this.bio
      this._telegramUsername = this.telegramUsername
    },
    
  }
</script>
