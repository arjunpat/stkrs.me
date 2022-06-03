<!-- Displays a sticker with the given image src and name/description -->

<template>
  <div class="tw-flex-col tw-items-center tw-inline-flex">
    <div class="tw-p-1 tw-border tw-border-solid tw-border-gray-300 tw-rounded-full tw-mb-2 tw-bg-white">
      <img :src="src" class="tw-rounded-full" :style="style">
    </div>
    <div class="tw-text-sm tw-text-center tw-font-medium" :style="textStyle" :class="textClass">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticker',

  props: {
    src: { type: String, required: true },
    name: { type: String, default: '' },
    dark: { type: Boolean, default: false },

    width: { type: Number, default: 200 },
  },

  computed: {
    style() {
      const { width } = this
      return { width: `${.8*width}px`, height: `${.8*width}px` }
    },
    textClass() {
      return this.dark ? 'tw-text-gray-50' : ''
    },
    textStyle() {
      const { width } = this
      return { 
        width: `${width}px`, 
      }
    },
  },
}
</script>