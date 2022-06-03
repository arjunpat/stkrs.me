<!-- Displays a profile image with the given image src -->

<template>
  <div class="tw-inline-block tw-items-center tw-drop-shadow-xl">
    <div>
      <img :src="src" :style="style" />
    </div>
    <div class="tw-text-sm tw-text-center tw-font-medium tw-my-3">
      {{ name }}
    </div>
    
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'ProfileImage',

  props: {
    name: { type: String },
    
    src: { type: String, required: true },

    width: { type: Number, default: 200 },
  },

  data: () => ({
    a: 0,
    ar3: 0,
  }),

  computed: {
    style() {
      // Clip image to a hexagon shape
      const { ar3, a, width } = this
      return {
        clipPath: `path('M ${ar3} 0 l ${ar3} ${a} v ${2*a} l ${-ar3} ${a} l ${-ar3} ${-a} v ${-2*a} z')`,
        width: `${width}px`,
        height: `${4*a}px`,
        objectFit: 'cover',
      }
    },
  },

  created() {
    this.a = this.width/(2*Math.sqrt(3))
    this.ar3 = this.a * Math.sqrt(3)
  },
}
</script>