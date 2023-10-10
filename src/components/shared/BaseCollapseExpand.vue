<template>
  <div :class="props.backgroundClass">
    <slot v-if="isVisible" />

    <button
      type="button"
      class="flex items-center gap-1 mx-auto"
      :class="[isVisible ? 'flex-col' : 'flex-col-reverse']"
      @click="isVisible = !isVisible"
    >
      <p class="h-[6px]">
        <BaseIcon :name="icon" />
      </p>
      <p class="text-white-1 text-size-1">
        {{ isVisible ? $t('Button.Close') : $t('Button.Open') }}
      </p>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  },

  backgroundClass: {
    type: String,
    default: 'bg-black-opacity-1 py-1'
  }
})

const emit = defineEmits(['update:isExpanded'])

const isVisible = computed({
  get: () => props.isExpanded,
  set: (newValue) => emit('update:isExpanded', newValue)
})

const icon = computed(() => (isVisible.value ? 'triangle-up' : 'triangle-down'))
</script>

<style scoped></style>
