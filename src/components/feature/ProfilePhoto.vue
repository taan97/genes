<template>
  <div
    class="py-2 flex justify-center items-center flex-col relative"
    :class="props.containerClass"
  >
    <div
      class="overlay w-[118px] h-[118px] rounded-full border-2 border-orange-4 overflow-hidden"
      v-bind="$attrs"
    >
      <img
        :src="userStore.userAvatar"
        class="object-cover object-center aspect-square left-0 right-0 m-auto h-full"
      />
    </div>

    <ImageUploader
      v-if="props.showUpload"
      id="ProfilePhoto"
      preview-image-class="hidden"
      class="absolute bottom-1/4"
      @changed="doChangedAvatar"
    >
      <template #add-button>
        <p class="flex gap-2">
          <BaseIcon name="camera-profile" />
        </p>
      </template>
    </ImageUploader>

    <BaseIcon
      v-else-if="userStore.verified === VERIFICATION_STATUS.SUCCESS_VERIFIED"
      name="green-tick"
      width="15%"
      height="15%"
      class="absolute bottom-1/4"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { useUserStore } from '@/stores'
import { VERIFICATION_STATUS } from '@/utils/const'
import UserService from '@/services/user-service.js'

const props = defineProps({
  containerClass: {
    type: String,
    default: ''
  },

  showUpload: {
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore()

async function doChangedAvatar(url) {
  try {
    await UserService.changeAvatar(url)
    await userStore.setUser({ replace: true })
  } catch {}
}
</script>

<style scoped>
.overlay {
  position: relative;
}
.overlay:after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  border-radius: 9999px;

  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 1)
  );
}
</style>
