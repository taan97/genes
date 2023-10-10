<template>
  <BaseModal
    v-model:show="isVisible"
    hide-close-icon
    content-class="max-h-[70vh]"
  >
    <template #content>
      <button
        type="button"
        class="absolute cursor-pointer right-2 top-2 bg-red-1 rounded-full p-1"
        @click="isVisible = false"
      >
        <BaseIcon
          name="close"
          class="fill-white-1"
        />
      </button>

      <img :src="props.url" />
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  url: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:show', 'submitted'])

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})
</script>

<style scoped></style>
