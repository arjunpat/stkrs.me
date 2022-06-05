<!-- Displays a profile image with the given image src -->

<template>
  <div class="tw-flex tw-w-64 tw-inline-flex">
    <div>
      <div
        class="tw-bg-gray-300 tw-flex px-3 pt-3 tw-rounded-t-2xl tw-rounded-b-md tw-text-black tw-flex-col"
      >
        <div class="tw-flex">
          <div class="tw-flex-col tw-mr-2">
            <ProfileImage :src="comment.user.profilePic" width="35" />
          </div>
          <div class="tw-flex-col">
            <h1 class="tw-text-sm tw-text-black">
              {{ comment.user.username }}
            </h1>
            <h1 class="tw-text-xs tw-text-gray-600">
              {{
                `${comment.date.getMonth()}/${comment.date.getDate()}/${comment.date.getFullYear()}`
              }}
            </h1>
          </div>
        </div>
        <hr style="margin-top: -10px; border: none; height: 1px;" class="tw-mb-2 tw-bg-purple-400"/>
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
import PaintDrip from '@/components/PaintDrip'
import ProfileImage from '@/components/ProfileImage'

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

  created() {},
}
</script>
