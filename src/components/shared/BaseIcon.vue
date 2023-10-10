<template>
  <Suspense>
    <img
      v-if="props.renderAsImage"
      v-bind="$attrs"
      :src="iconPath"
    />
    <component
      :is="iconComponent"
      v-bind="$attrs"
      v-else
    />
    <template #fallback>
      <div :style="{ 'min-height': props.minHeight }" />
    </template>
  </Suspense>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },

  renderAsImage: {
    type: [Boolean, String],
    default: false
  },

  minHeight: {
    type: String,
    default: ''
  }
})

const iconPath = computed(() => {
  const extention =
    typeof props.renderAsImage === 'string' ? props.renderAsImage : 'svg'
  return new URL(
    `../../assets/icons/${props.name}.${extention}`,
    import.meta.url
  ).href
})

const iconComponent = computed(() => {
  props.name
  return defineAsyncComponent(() =>
    import(`../../assets/icons/${props.name}.svg`)
  )
})
</script>

<style scoped></style>
