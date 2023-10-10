<template>
  <div class="bg-black-opacity-1">
    <div
      class="mx-2.5 p-4"
      :class="{
        'border-b border-orange-3 ': hasBottom
      }"
    >
      <slot name="top" />
    </div>

    <div
      class="mx-2.5 p-4"
      :class="{
        hidden: !hasBottom
      }"
    >
      <div
        class="cursor-pointer flex items-center mb-2 relative"
        @click="isExpanded = !isExpanded"
      >
        <BaseIcon
          name="arrow-down-small"
          class="absolute right-0"
          :class="{
            'rotate-180': isExpanded
          }"
        />
        <slot name="bottom-header" />
      </div>
      <template v-if="isExpanded">
        <slot name="bottom-content" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots()

const hasBottom = computed(
  () => slots['bottom-header']?.().length && slots['bottom-content']?.().length
)

const isExpanded = ref(props.isExpanded)
</script>

<style scoped></style>
