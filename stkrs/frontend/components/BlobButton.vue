<template>
  <div class="tw-drop-shadow-md tw-relative tw-select-none tw-h-20 tw-w-32 tw-flex tw-flex-col tw-justify-center tw-items-center" @click="click">
    <svg id="blob" ref="blob" :width="width" :height="height" class="tw-absolute visible" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path @mouseover="mouseenter" @mouseleave="mouseleave" class="tw-cursor-pointer" :fill="fill" :d="d" transform="translate(100 100)" />
    </svg>
    <div @mouseover="mouseenter" @mouseleave="mouseleave" class="tw-normal-case tw-tracking-normal tw-text-base tw-cursor-pointer tw-absolute tw-text-white tw-font-medium">{{ text }}</div>
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
    width: { type: Number, default: 128 },
    height: { type: Number, default: 80 },

    expandOnClick: { type: Boolean, default: false },
  },

  data: () => ({
    allowHover: true,
  }),

  computed: {
    d() {
      switch(this.variant) {
        case 0: 
          return 'M24.2,-36.9C34.5,-35.9,48.3,-35.9,55,-29.9C61.7,-23.9,61.3,-11.9,60.4,-0.5C59.6,10.9,58.2,21.9,53.5,31.2C48.7,40.6,40.6,48.4,31.1,58.1C21.6,67.9,10.8,79.6,2.3,75.6C-6.1,71.5,-12.3,51.7,-24.5,43.5C-36.7,35.4,-55,38.8,-64.7,33.5C-74.5,28.2,-75.7,14.1,-76.8,-0.6C-77.8,-15.3,-78.7,-30.6,-70.8,-39.1C-62.9,-47.6,-46.1,-49.3,-32.9,-48.6C-19.6,-47.9,-9.8,-44.8,-1.4,-42.3C6.9,-39.8,13.8,-37.9,24.2,-36.9Z'
        case 1:
          return 'M34.8,-45.3C48.1,-38.1,64.2,-32.1,71.5,-20.6C78.8,-9.2,77.3,7.7,70.3,20.9C63.3,34,50.8,43.3,38.2,53.2C25.5,63.2,12.8,73.7,0.9,72.4C-10.9,71.2,-21.9,58.2,-37.6,49.2C-53.3,40.3,-73.8,35.5,-76.3,25.4C-78.7,15.2,-63.2,-0.1,-55.7,-16.5C-48.2,-32.9,-48.7,-50.2,-40.7,-59.2C-32.7,-68.2,-16.4,-68.8,-2.8,-64.8C10.7,-60.9,21.4,-52.5,34.8,-45.3Z'
        case 2: 
          return 'M40,-68.1C49.3,-63.8,52.6,-48,60.2,-34.8C67.8,-21.5,79.8,-10.8,83.2,2C86.7,14.7,81.6,29.4,70.4,36.7C59.3,43.9,42.2,43.6,29.4,46C16.7,48.4,8.3,53.5,-2.2,57.3C-12.7,61.1,-25.5,63.6,-35.3,59.5C-45.2,55.5,-52.2,44.8,-61.5,33.8C-70.8,22.8,-82.4,11.4,-86.6,-2.4C-90.8,-16.2,-87.6,-32.5,-74.3,-36.6C-61,-40.7,-37.6,-32.6,-23.5,-34.1C-9.4,-35.6,-4.7,-46.6,5.3,-55.8C15.3,-65,30.6,-72.3,40,-68.1Z'
        default:
          return 'M23.3,-33.6C34.4,-29.2,50.2,-29.7,63.5,-22.6C76.7,-15.4,87.3,-0.7,85.2,12.1C83.2,25,68.6,35.9,55.7,45C42.7,54.1,31.5,61.5,20.8,59.3C10.2,57.1,0.2,45.3,-9.8,39.6C-19.8,33.8,-29.7,34,-40,30.2C-50.4,26.3,-61.2,18.3,-67.5,6.7C-73.8,-4.9,-75.7,-20.2,-68.7,-29.7C-61.7,-39.2,-45.9,-43,-33,-46.5C-20,-50,-10,-53.2,-1.9,-50.2C6.2,-47.2,12.3,-38,23.3,-33.6Z'
      }
    },
  },

  methods: {
    click(e) {
      if (!this.expandOnClick) {
        this.$emit('click', e)
        return
      }

      const blob = this.$refs.blob
      blob.style.transition = 'transform .4s'
      blob.style.transform = 'scale(70)'
      
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
      }, 450)
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