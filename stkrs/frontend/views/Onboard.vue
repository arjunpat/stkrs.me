
<template>
<div class="tw-bg-green-500 tw-h-full"> 
<PaintDripSection class="-tw-mt-4 tw-width-96 tw-h-5/6" color="blue-600">
  <div class="tw-grid tw-h-full tw-w-full tw-place-content-center">
    <div>
      <img class="tw-object-scale-down tw-h-72 tw-w-96" src="../assets/logostkrs.png">
      <form class="tw-pt-8 tw-space-y-8">
          <div class="tw-flex tw-flex-col tw-space-y-4">
              <label>Welcome! What do you want your username to be?</label>
              <input 
              v-model="_username"
              type="username" 
              placeholder="Username"
              name="username"
              class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
              />
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-4">
            <label>Give us a link to your profile picture</label>
            <input 
              v-model="_profilePic"
              placeholder="Profile picture URL"
              class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
            />
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-4">
              <label>Write a bio - tell us about yourself!</label>
              <textarea
              v-model="_bio"
              rows="6" 
              type="bio" 
              placeholder="Bio"
              name="Bio"
              class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6 tw-bg-white"
              />
          </div>
      </form>   
    </div>
    <div class="tw-flex tw-flex-col tw-place-items-center tw-space-y-4">
        <BlobButton
        @click="submit"
        text="Submit"
        :variant="2"
        fill="var(--color-blue-500)"
        expand-on-click
        />
    </div> 
    
  </div>
  </PaintDripSection>
  </div> 
</template>

<script>
  import BlobButton from '../components/BlobButton.vue'
  import { mapState, mapActions, } from 'vuex'
    import PaintDripSection from '../components/PaintDripSection.vue'

  export default {
    name: "Onboard",

    props: {
      username: { type: String, default: '' },
      profilePic: { type: String, default: '' },
      bio: { type: String, default: '' },
    },

    components: {
      BlobButton,
      PaintDripSection,
    },

    data: () => ({
      _username: '',
      _profilePic: '',
      _bio: '',
    }),

    computed: {
      ...mapState([ 'stkr' ]),
    },
    
    methods: {
      ...mapActions([ 'fetchUser', 'fetchStickers', 'fetchPins' ]),
      async submit() {
        this.$router.push({ name: 'my-wall' })
        await this.stkr.setUser({
          name: this._username,
          bio: this._bio,
          profile_image: this._profilePic,
        })
        this.fetchUser()
        this.fetchStickers()
        this.fetchPins()
      },
    },

    created() {
      this._username = this.username
      this._profilePic = this.profilePic
      this._bio = this.bio
    },
    
  }
</script>
