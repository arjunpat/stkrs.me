<!-- Displays a sticker with the given image src and name/description -->

<template>
  <div class="tw-flex-col tw-items-center tw-inline-flex" @mouseover="showPin = true" @mouseleave="showPin = false">
    <div 
      class="tw-relative tw-p-1 tw-border tw-border-solid tw-border-gray-300 tw-rounded-full tw-mb-2 tw-bg-white"
    >
      <img @click="e => $emit('click', e)" :src="src" class="tw-rounded-full tw-object-cover tw-cursor-pointer" :style="style">
      <v-btn 
        @click="$emit('pin', !pinned)"
        v-if="pin && showPin"
        x-small 
        fab 
        absolute 
        class="tw-right-2 tw-top-2"
        @mouseover="pinHover = true"
        @mouseleave="pinHover = false"
      >
        <v-icon>{{ pinIcon }}</v-icon>
      </v-btn>
    </div>
    <div v-if="showName" class="tw-text-sm tw-text-center tw-font-medium" :style="textStyle" :class="textClass">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticker',

  emits: ['pin', 'click'],

  props: {
    src: { type: String, required: true },
    name: { type: String, default: '' },
    dark: { type: Boolean, default: false },
    pin: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    showName: { type: Boolean, default: false },

    width: { type: Number, default: 200 },
  },

  data: () => ({
    pinHover: false,
    showPin: false,
  }),

  computed: {
    pinIcon() {
      return this.pinned ? 'mdi-pin-off' : 'mdi-pin'
    },
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