<template>
  <div class="tw-relative tw-flex tw-flex-col tw-items-center">
    <div class="tw-absolute tw-w-screen tw-h-full" :style="{ backgroundColor: varColor }" />
    <div class="tw-relative tw-py-20">
      <slot></slot>
    </div>
    <PaintDrip 
      class="tw-z-10 tw-absolute tw-w-screen tw-h-20 tw-top-full"
      :color="varColor"
      shadow
    />
    <div class="tw-absolute -tw-mt-1 tw-z-10 tw-top-full tw-w-screen tw-h-1" :style="{ backgroundColor: varColor }"/>
  </div>
</template>

<script>
import PaintDrip from '../components/PaintDrip.vue'

export default {
  name: 'PaintDripSection',

  components: {
    PaintDrip,
  },

  props: {
    color: { type: String, default: 'green-500' }
  },

  computed: {
    varColor() {
      return `var(--color-${this.color})`
    },
  },
}
</script>