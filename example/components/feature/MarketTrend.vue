<template>
  <div
    class="market-ticket ml-6"
    :class="
      props.percentageChange < 0 ? 'before:bg-red-v-1' : 'before:bg-green-v-2'
    "
  >
    <p class="text-size-2 font-bold mb-1">{{ props.name }}</p>
    <p class="text-size-3 font-semibold mb-2">{{ props.value }}</p>
    <p
      class="text-size-2 font-semibold mb-1"
      :class="props.percentageChange < 0 ? 'text-red-v-1' : 'text-green-v-2'"
    >
      <BaseIcon
        class="inline-block"
        name="arrow-down"
        width="12"
        height="12"
        :fill="
          props.percentageChange < 0
            ? 'var(--root-red-v-1)'
            : 'var(--root-green-v-2)'
        "
      ></BaseIcon
      >{{ props.percentageChange }}%
    </p>
    <p class="text-size-1 text-grey-v-2">{{ props.time }}</p>
  </div>
</template>

<script setup>
import BaseIcon from '../shared/BaseIcon.vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  percentageChange: {
    type: Number,
    required: true
  },

  time: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.market-ticket:before {
  position: absolute;
  content: ' ';
  width: 8px;
  height: 64px;
  left: -15px;
}
</style>
