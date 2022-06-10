
<template>
  <div class="tw-grid tw-h-full tw-w-full tw-place-content-center">
    
    <div>
      <img class="tw-object-scale-down tw-h-48 tw-w-96" src="../assets/logostkrs.png">
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
        <button
            type="submit"
            class="tw-w-full tw-rounded-xl tw-bg-orange-400 tw-py-4 tw-text-white tw-shadow-lg"
        >
        Get Started!
        </button>
      </form>   

          
    </div>
  </div>
</template>

<script>
  
</script>
