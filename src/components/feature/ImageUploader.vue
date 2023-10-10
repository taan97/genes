<template>
  <div
    :class="props.containerClass"
    class="flex justify-between gap-2"
  >
    <fieldset class="flex-1">
      <input
        :id="`image-uploader-${props.id}`"
        ref="inputFileRef"
        type="file"
        accept="image/*"
        name="image"
        class="hidden"
        @change="onChangeLoadImage"
      />
      <BaseIcon
        v-if="props.icon"
        :name="props.icon"
        render-as-image
      />
      <label
        class="cursor-pointer"
        :for="`image-uploader-${props.id}`"
      >
        <slot name="add-button">
          <button
            type="button"
            class="rounded-full shadow-outer-orange-1 w-16 h-16 flex items-center justify-center pointer-events-none"
          >
            <BaseIcon name="plus" />
          </button>
        </slot>
      </label>
    </fieldset>

    <label
      :class="props.previewImageClass"
      :for="`image-uploader-${props.id}`"
    >
      <img
        class="object-contain object-center"
        :src="previewImageSource"
      />
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import GlobalService from '@/services/global-service'

const props = defineProps({
  id: {
    type: String,
    required: true
  },

  modelValue: {
    type: String,
    default: ''
  },

  icon: {
    type: String,
    default: ''
  },

  containerClass: {
    type: String,
    default: ''
  },

  previewImageClass: {
    type: String,
    default:
      'cursor-pointer border-2 border-black-1 rounded-xl h-20 w-32 p-1 flex justify-center'
  }
})

const emit = defineEmits(['update:modelValue', 'changed'])

const inputFileRef = ref(null)

const previewImageSource = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

async function onChangeLoadImage(event) {
  if (!event.target.files.length) return

  const imageSource = await getUploadImageSource(event.target.files[0])

  if (!imageSource) return

  previewImageSource.value = imageSource
  emit('changed', imageSource)
  inputFileRef.value.value = null
}

async function getUploadImageSource(file) {
  try {
    const res = await GlobalService.uploadImage(file)
    return res.data
  } catch {
    return ''
  }
}
</script>

<style scoped></style>
