<template>
  <img
    v-if="props.renderAsImage"
    :src="iconPath"
  />
  <component
    :is="iconComponent"
    v-else
    v-bind="props"
  />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },

  renderAsImage: {
    type: Boolean,
    default: false
  }
})

const iconPath = computed(
  () => new URL(`../../assets/icons/${props.name}.svg`, import.meta.url).href
)

const iconComponent = computed(() => {
  props.name
  return defineAsyncComponent(() =>
    import(`../../assets/icons/${props.name}.svg`)
  )
})
</script>

<style scoped></style>
