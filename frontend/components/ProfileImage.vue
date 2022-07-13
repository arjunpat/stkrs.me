<!-- Displays a profile image with the given image src -->

<template>
  <div>
    <div v-if="horizontalDisplay" class="tw-flex">
      <img @click="e => $emit('click', e)" :src="src != '' ? src : defaultPicture" :style="style"
        class="tw-cursor-pointer" />
      <div class="tw-self-center tw-ml-8">
        <div class="tw-text-white tw-font-semibold tw-text-5xl tw-mb-2">
          {{ name }}
        </div>
        <div class="tw-text-white tw-font-extralight tw-text-md">{{ principal }}</div>
        <div class="tw-text-white tw-font-normal tw-my-4 tw-max-w-3xl">{{ bio }}</div>
      </div>
    </div>
    <div v-else class="tw-inline-block tw-items-center tw-drop-shadow-xl">
      <div>
        <img @click="e => $emit('click', e)" :src="src != '' ? src : defaultPicture" :style="style"
          class="tw-cursor-pointer" />
      </div>
      <div class="tw-text-sm tw-text-center tw-font-medium tw-my-3">
        <v-chip :color="color" class="tw-text-white" v-show="name !== ''">{{ name }}
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="tw-text-lg tw-text-green-300 tw-ml-1" v-bind="attrs" v-on="on">mdi-check-decagram</v-icon>
            </template>
            <span>Verified</span>
          </v-tooltip>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'ProfileImage',

  emits: ['click'],

  props: {
    name: { type: String, default: '' },

    src: { type: String, required: true },

    width: { type: Number, default: 200 },

    horizontalDisplay: { type: Boolean, default: false },

    principal: { type: String, default: "" },

    bio: { type: String, default: "" },

    color: { type: String, default: "var(--color-orange-500)" }
  },

  data: () => ({
    a: 0,
    ar3: 0,
    defaultPicture: 'https://i.imgur.com/AFlMnzq.png',
  }),

  computed: {
    style() {
      // Clip image to a hexagon shape
      const { ar3, a, width } = this
      return {
        clipPath: `path('M ${ar3} 0 l ${ar3} ${a} v ${2 * a} l ${-ar3} ${a} l ${-ar3} ${-a} v ${-2 * a} z')`,
        width: `${width}px`,
        height: `${4 * a}px`,
        objectFit: 'cover',
      }
    },
  },

  created() {
    this.a = this.width / (2 * Math.sqrt(3))
    this.ar3 = this.a * Math.sqrt(3)
  },
}
</script>