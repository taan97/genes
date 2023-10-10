<template>
  <van-swipe-item class="border-b border-dashed border-grey-v-3 pt-2 pb-9">
    <p class="text-size-3 font-semibold mx-5 mb-3">
      {{ props.subject }}
      <span class="text-yellow-v-1 font-semibold">{{ props.title }}</span>
    </p>
    <div class="flex flex-row gap-11">
      <slot name="content"></slot>
    </div>
  </van-swipe-item>
</template>

<script setup>
const props = defineProps({
  subject: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
