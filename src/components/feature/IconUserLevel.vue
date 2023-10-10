<template>
  <div class="flex items-center justify-center">
    <img
      :src="iconPath"
      :style="{
        width: dimension.width
      }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: [Number, String],
    default: null
  },

  size: {
    type: String,
    default: 'small',
    validator: (prop) => ['small', 'big'].includes(prop)
  }
})

const dimension = computed(() => {
  return props.size === 'small' ? { width: '74px' } : { width: '98px' }
})

const iconPath = computed(() => {
  if (props.level === null || props.level === undefined) return ''
  return new URL(
    `../../assets/images/levels/level-${props.level}.png`,
    import.meta.url
  ).href
})
</script>

<style scoped></style>
