<template>
  <div class="relative bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl">
    <div
      class="mx-2.5 p-4"
      :class="{
        'border-b border-b-black-v-4 border-opacity-50': hasBottom
      }"
    >
      <slot name="top"></slot>
    </div>

    <div
      class="mx-2.5 p-4"
      :class="{
        hidden: !hasBottom
      }"
    >
      <div
        class="cursor-pointer flex items-center mb-2"
        @click="isExpanded = !isExpanded"
      >
        <BaseIcon
          name="arrow-down-small"
          class="absolute right-0"
          :class="{
            'rotate-180': isExpanded
          }"
        />
        <slot name="bottom-header"></slot>
      </div>
      <template v-if="isExpanded">
        <slot name="bottom-content"></slot>
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
