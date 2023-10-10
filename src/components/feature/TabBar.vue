<template>
  <div class="bg-black-opacity-1 px-4 pb-4 pt-2">
    <slot name="title" />
    <ul class="flex gap-1 pt-2">
      <li
        v-for="item in props.tabs"
        :key="item.value"
        class="flex-1 text-center font-semibold uppercase cursor-pointer"
        :class="
          item.value === currentActiveTab
            ? 'text-white-1'
            : 'text-orange-1 underline'
        "
        @click="onClickTabChange(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  tabs: {
    /**
     * tabs: Item[]
     * Item: {
     *  label: string,
     *  value: string|number
     * }
     */
    type: Array,
    required: true
  },

  active: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['tab-changed', 'update:active'])

const currentActiveTab = computed({
  get: () => props.active || props.tabs[0].value,
  set: (newValue) => emit('update:active', newValue)
})

function onClickTabChange(item) {
  currentActiveTab.value = item.value
  emit('tab-changed', item)
}
</script>

<style scoped></style>
