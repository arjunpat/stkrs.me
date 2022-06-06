<template>
  <div class="tw-relative tw-flex tw-flex-col tw-items-center">
    <div class="tw-absolute tw-w-screen tw-h-full" :class="`tw-bg-${color}`" />
    <div class="tw-relative tw-py-20">
      <slot></slot>
    </div>
    <PaintDrip 
      class="tw-z-10 tw-absolute tw-w-screen tw-h-20 tw-top-full"
      :color="`var(--color-${color})`"
    />
  </div>
</template>

<script>
import PaintDrip from './components/PaintDrip.vue'

export default {
  name: 'PaintDripSection',

  components: {
    PaintDrip,
  },

  props: {
    color: { type: String, default: 'green-500' }
  },
}
</script>