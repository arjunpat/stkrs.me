<!-- Displays a profile image with the given image src -->

<template>
  <div class="tw-flex tw-w-64 tw-inline-flex">
    <div>
      <div
        class="tw-bg-gray-300 tw-flex px-3 pt-3 tw-rounded-t-2xl tw-rounded-b-md tw-text-black tw-flex-col"
      >
        <div class="tw-flex">
          <div class="tw-flex-col tw-mr-2">
            <ProfileImage :src="comment.user.profilePic" :width="45" @click="goToWall(comment.user.principalString)" />
          </div>
          <div class="tw-flex-col">
            <h1 class="tw-text-sm tw-text-black">
              {{ comment.user.username }}
            </h1>
            <h1 style="fontSize: 10px" class="tw-text-gray-600">
              {{
                `${comment.date.getMonth()}/${comment.date.getDate()}/${comment.date.getFullYear()}`
              }}
            </h1>
            <div class="tw-flex tw-flex-row">
              <div v-for="(community, i) in comment.shared" :key="i">
                <div
                  class="tw-relative tw-border tw-border-solid tw-border-gray-300 tw-rounded-full tw-bg-purple-300"
                  style="width: fit-content; padding: 2px"
                >
                  <v-tooltip top color="purple-600">
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        @click="goToSticker(community.id)"
                        :src="community.src"
                        class="tw-rounded-full tw-object-cover tw-cursor-pointer"
                        style="height: 15px; width: 15px"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <span style="fontSize: 10px">{{ community.name }}</span>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr
          style="margin-top: -10px; border: none; height: 1px"
          class="tw-mb-2 tw-bg-purple-400"
        />
        <div class="tw-flex tw-text-xs tw-text-gray-800">
          <p>{{ comment.comment }}</p>
        </div>
      </div>

      <PaintDrip
        class="tw-h-5 tw-w-full"
        :color="`var(--color-gray-300)`"
        :numDrops="5"
      ></PaintDrip>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import PaintDrip from '../components/PaintDrip.vue'
import ProfileImage from '../components/ProfileImage.vue'
import { goToWall, goToSticker } from '../utils'

export default {
  name: 'Comment',

  components: {
    ProfileImage,
    PaintDrip,
  },

  props: {
    comment: { type: Object, required: true },
  },

  data: () => ({}),

  computed: {},

  methods: {
    goToWall(principalString) {
      goToWall(principalString)
    },
    goToSticker(stickerId) {
      goToSticker(stickerId)
    },
  },

  created() {},
}
</script>
