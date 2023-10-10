<template>
  <div
    v-show="props.paths.length > 1"
    class="flex gap-2 bg-black-1 pl-2 pr-7 py-2 rounded-r-full -mx-2 flex-wrap max-w-max"
  >
    <button
      v-for="(item, index) in props.paths"
      :key="index"
      type="button"
      class="text-white-1 text-size-5 before:pr-2 before:content-['>'] first:before:content-[none]"
      :class="{ '!text-orange-1': index === props.paths.length - 1 }"
      :disabled="index === props.paths.length - 1"
      @click="onClickSearch(item.value)"
    >
      <span class="underline">{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  paths: {
    type: Array,
    default: () => [
      /**
       * {
       * label: '',
       * value: ''
       * }
       */
    ]
  }
})

const emit = defineEmits(['searched-id'])

function onClickSearch(value) {
  emit('searched-id', value)
}
</script>

<style scoped></style>
