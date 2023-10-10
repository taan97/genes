<template>
  <div
    class="bg-gradient-dark inner-dark-input shadow-inner-dark-v-1 rounded-lg px-2 pb-2"
  >
    <slot name="title"></slot>
    <ul class="flex gap-1 pt-2">
      <li
        v-for="item in props.tabs"
        :key="item.value"
        class="flex-1 text-center text-size-2 font-semibold uppercase cursor-pointer"
        :class="
          item.value === currentActiveTab ? 'text-yellow-v-1' : 'text-grey-v-1'
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

const currentActiveTab = computed({
  get: () => props.active || props.tabs[0].value,
  set: (newValue) => emit('update:active', newValue)
})

const emit = defineEmits(['tab-changed', 'update:active'])

function onClickTabChange(item) {
  currentActiveTab.value = item.value
  emit('tab-changed', item)
}
</script>

<style scoped></style>
