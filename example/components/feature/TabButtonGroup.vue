<template>
  <ul
    class="flex flex-row gap-1 bg-black-v-1 inner-dark-input border border-black-v-7 rounded-lg p-1.5"
  >
    <li
      v-for="item in props.tabs"
      :key="item.value"
      class="flex-1"
    >
      <button
        class="relative flex flex-row text-white-v-1 w-full rounded-md py-2 px-8"
        :class="
          item.value === currentActiveTab
            ? 'bg-gradient-yellow'
            : 'bg-gradient-dark'
        "
        @click="onClickTabChange(item)"
      >
        <BaseIcon
          v-if="item.icon"
          :name="item.icon"
          class="mr-3"
          width="12"
          height="11"
        />
        <div class="flex-1 text-size-2 font-bold">
          {{ item.label }}
        </div>
        <van-badge
          v-if="item.badgeValue"
          class="absolute !right-3 !top-2"
          :content="item.badgeValue"
        >
        </van-badge>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tabs: {
    /**
     * tabs: Item[]
     * type Item = {
     *  label: string,
     *  value: string,
     *  icon: string,
     *  badgeValue: Number
     * }
     */
    type: Array,
    required: true
  },

  active: {
    type: String,
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
