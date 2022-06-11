
<template>
  <div class="tw-grid tw-h-full tw-w-full tw-place-content-center">
    
    <div>
      <img class="tw-object-scale-down tw-h-48 tw-w-96" src="../assets/dancingdog.gif">
      <form class="tw-pt-8 tw-space-y-8">
          <div class="tw-flex tw-flex-col tw-space-y-4">
              <label>Welcome! What do you want your username to be?</label>
              <input 
              type="username" 
              placeholder="Username"
              name="username"
              class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6"
              />

          </div>
          <div class="tw-flex tw-flex-col tw-space-y-4">
              <label>Write a bio - tell us about yourself!</label>
              <textarea
              rows="6" 
              type="bio" 
              placeholder="Bio"
              name="Bio"
              class="tw-outline-none tw-ring-2 tw-ring-zinc-200 tw-focus:ring-blue-300 tw-rounded-lg tw-p-6"
              />
          </div>
        
        
        
      </form>   
      

          
    </div>
    <div class="tw-flex tw-flex-col tw-place-items-center tw-space-y-4">
        <BlobButton
        @click="navigate('wall')"
        text="Submit"
        :variant="2"
        fill="var(--color-blue-500)"
        expand-on-click
        />
    </div> 
  </div>
</template>

<script>
  import BlobButton from '../components/BlobButton.vue'

  export default {
      name: "Onboard",

      components: {
          BlobButton,
      },
    
    methods: {
        navigate(name) {
        if (this.$route.name !== name)
            this.$router.push({ name: name })
      },  
    },
    
  }
</script>
