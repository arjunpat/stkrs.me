<template>
  <div class="tw-drop-shadow-md tw-relative tw-select-none tw-h-20 tw-w-32 tw-flex tw-flex-col tw-justify-center tw-items-center" @click="click">
    <svg id="blob" ref="blob" style="width: 128px; height: 80px;" class="tw-absolute visible" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path @mouseenter="mouseenter" @mouseleave="mouseleave" class="tw-cursor-pointer" :fill="fill" :d="d" transform="translate(100 100)" />
    </svg>
    <div @mouseenter="mouseenter" @mouseleave="mouseleave" class="tw-cursor-pointer tw-absolute tw-text-white tw-font-semibold">{{ text }}</div>
  </div>
</template>

<style scoped>
  .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s linear;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s .3s, opacity .3s linear;
  }
</style>

<script>
export default {
  name: 'BlobButton',

  emits: [ 'click' ],

  props: {
    text: { type: String, default: '' },
    fill: { type: String, default: '#FF0066' },
    variant: { type: Number, default: 0 }, // either 0, 1, or 2
  },

  data: () => ({
    allowHover: true,
  }),

  computed: {
    d() {
      switch(this.variant) {
        case 0: 
          return 'M35.1,-56.9C47.5,-53.5,61,-48.3,70,-38.5C79,-28.7,83.4,-14.4,83.1,-0.2C82.8,14,77.9,28.1,65.6,32C53.2,36,33.4,29.8,21.2,38.2C9.1,46.7,4.5,69.9,-1.8,73C-8.2,76.2,-16.4,59.5,-24.1,48.4C-31.7,37.3,-38.7,31.8,-45.9,24.7C-53.1,17.6,-60.5,8.8,-63.1,-1.5C-65.7,-11.8,-63.5,-23.6,-55.2,-28.7C-46.8,-33.9,-32.3,-32.3,-22,-36.9C-11.8,-41.5,-5.9,-52.2,2.7,-56.9C11.3,-61.6,22.6,-60.2,35.1,-56.9Z'
        case 1:
          return 'M34.8,-45.3C48.1,-38.1,64.2,-32.1,71.5,-20.6C78.8,-9.2,77.3,7.7,70.3,20.9C63.3,34,50.8,43.3,38.2,53.2C25.5,63.2,12.8,73.7,0.9,72.4C-10.9,71.2,-21.9,58.2,-37.6,49.2C-53.3,40.3,-73.8,35.5,-76.3,25.4C-78.7,15.2,-63.2,-0.1,-55.7,-16.5C-48.2,-32.9,-48.7,-50.2,-40.7,-59.2C-32.7,-68.2,-16.4,-68.8,-2.8,-64.8C10.7,-60.9,21.4,-52.5,34.8,-45.3Z'
        default: 
          return 'M40,-68.1C49.3,-63.8,52.6,-48,60.2,-34.8C67.8,-21.5,79.8,-10.8,83.2,2C86.7,14.7,81.6,29.4,70.4,36.7C59.3,43.9,42.2,43.6,29.4,46C16.7,48.4,8.3,53.5,-2.2,57.3C-12.7,61.1,-25.5,63.6,-35.3,59.5C-45.2,55.5,-52.2,44.8,-61.5,33.8C-70.8,22.8,-82.4,11.4,-86.6,-2.4C-90.8,-16.2,-87.6,-32.5,-74.3,-36.6C-61,-40.7,-37.6,-32.6,-23.5,-34.1C-9.4,-35.6,-4.7,-46.6,5.3,-55.8C15.3,-65,30.6,-72.3,40,-68.1Z'
      }
    },
  },

  methods: {
    click(e) {
      const blob = this.$refs.blob
      blob.style.transition = 'transform .4s'
      blob.style.transform = 'scale(60)'
      
      // const { height, width } = blob.getBBox()
      // blob.style.width = `${width+10000}px`
      // blob.style.height = `${height+10000}px`
      // console.log(height, width)
      
      this.allowHover = false
      setTimeout(() => {
        this.$emit('click', e)
        setTimeout(() => {
          blob.style.transition = ''
          blob.classList.replace('visible', 'hidden')  
          setTimeout(() => {
            blob.style.transform = 'scale(1)'
            blob.classList.replace('hidden', 'visible')  
            this.allowHover = true
          }, 500)
        }, 100)
      }, 500)
    }, 
    mouseenter() {
      if (!this.allowHover) return
      const blob = this.$refs.blob
      blob.style.transition = 'transform .2s'
      blob.style.transform = 'scale(1.2)'
    },
    mouseleave() {
      if (!this.allowHover) return
      const blob = this.$refs.blob
      blob.style.transition = 'transform .2s'
      blob.style.transform = 'scale(1)'
    },
  },
}
</script>