<template>
  <div
    v-if="isVisible"
    class="p-6 bg-white-v-1 text-black-v-1 mb-7 suggestion-tag"
  >
    <p
      :class="props.contentClass"
      class="pr-8"
    >
      {{ props.content }}
    </p>
    <button
      class="absolute right-4 top-4 rounded-full"
      @click="onClickClose"
    >
      <BaseIcon name="close" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },

  contentClass: {
    type: String,
    default: ''
  }
})

const isVisible = ref(true)
const emit = defineEmits(['closed'])

function onClickClose() {
  isVisible.value = false
  emit('closed')
}
</script>

<style scoped>
.suggestion-tag::before {
  content: '';
  position: absolute;
  left: 18px;
  bottom: -20px;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid var(--root-white-v-1);
}
</style>
