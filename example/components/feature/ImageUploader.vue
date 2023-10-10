<template>
  <div class="relative">
    <input
      :id="`image-uploader-${props.id}`"
      type="file"
      accept="image/*"
      name="image"
      class="hidden"
      @change="onChangeLoadImage"
    />
    <div
      class="w-full h-[106px] rounded-lg shadow-inner-dark-v-1 flex items-center justify-center"
      :class="props.containerClass"
    >
      <template v-if="isPreviewEmpty">
        <BaseIcon
          v-if="props.icon"
          :name="props.icon"
          render-as-image
        />
        <label
          :for="`image-uploader-${props.id}`"
          class="absolute cursor-pointer"
        >
          <slot name="add-button">
            <button
              class="rounded-full bg-gradient-orange shadow-outer-orange-v-1 w-16 h-16 flex items-center justify-center pointer-events-none"
            >
              <BaseIcon name="plus" />
            </button>
          </slot>
        </label>
      </template>

      <label
        v-else
        :for="`image-uploader-${props.id}`"
        class="h-full cursor-pointer"
      >
        <img
          ref="previewImageRef"
          class="h-full object-contain p-2"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed, onActivated } from 'vue'
import GlobalService from '@/services/global-service'

const props = defineProps({
  id: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: ''
  },

  containerClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['changed'])

const previewImageRef = ref(null)

const imageData = ref(null)

const isPreviewEmpty = computed(() => !imageData.value)

async function onChangeLoadImage(event) {
  if (!event.target.files.length) return

  imageData.value = event.target.files[0]
  const imageSource = await getUploadImageSource()

  if (!imageSource) return

  emit('changed', imageSource)

  populatePreviewImage()
}

onActivated(async () => {
  if (isPreviewEmpty.value) return

  populatePreviewImage()
})

async function getUploadImageSource() {
  try {
    const res = await GlobalService.uploadImage(imageData.value)
    return res.data
  } catch {
    return ''
  }
}

async function populatePreviewImage() {
  await nextTick()
  previewImageRef.value.src = URL.createObjectURL(imageData.value)
}

function clearImage() {
  imageData.value = null
  previewImageRef.value?.src && (previewImageRef.value.src = '')
}

defineExpose({
  clearImage
})
</script>

<style scoped></style>
