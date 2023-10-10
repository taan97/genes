<template>
  <div v-show="props.value === active">
    <slot />
  </div>
</template>

<script setup>
import { useTabParent } from '@/utils/composables/use-tab-relations'

const props = defineProps({
  value: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: ''
  },

  titleClass: {
    type: String,
    default: ''
  }
})

const { active } = useTabParent(props)
</script>

<style scoped>
.active {
  color: var(--root-white-1);
  position: relative;
}
.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-inline: auto;
  height: 3px;
  width: 60%;
  background-color: var(--root-orange-1);
  border-radius: 9999px;
}
</style>
