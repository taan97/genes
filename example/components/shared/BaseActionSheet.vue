<template>
  <van-action-sheet
    class="!max-w-[var(--root-max-width)] left-0 right-0 mx-auto !bg-black-v-5 shadow-inner-dark-v-1 flex flex-col"
    :show="props.show"
  >
    <div class="p-10">
      <p :class="props.titleClass">{{ props.title }}</p>
      <button
        v-if="!hideCloseIcon"
        :class="[
          'font-bold absolute right-5 top-5 text-black-v-1 rounded-full p-2',
          props.isCloseButtonYellow ? 'bg-orange-v-1' : 'bg-grey-v-2'
        ]"
        @click="onClickClose"
      >
        <BaseIcon name="close" />
      </button>
      <slot name="content"> </slot>
    </div>
  </van-action-sheet>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  isCloseButtonYellow: {
    type: Boolean,
    default: false
  },
  hideCloseIcon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'closed'])

function onClickClose() {
  emit('update:show', !props.show)
  emit('closed')
}
</script>

<style scoped></style>
