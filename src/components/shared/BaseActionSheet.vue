<template>
  <van-action-sheet
    class="!w-[min(100vw,var(--root-max-width))] left-0 right-0 mx-auto !bg-black-1 shadow-inner-dark-1 min-h-72"
    :show="props.show"
    @click-overlay="onClickClose"
  >
    <div class="flex flex-col items-center px-6 pt-5 bg-black-1 rounded-t-2xl">
      <slot name="header">
        <h3 :class="props.titleClass">{{ props.title }}</h3>
      </slot>
    </div>
    <slot name="content" />
  </van-action-sheet>
</template>

<script setup>
import { watch } from 'vue'
import { useLockScroll } from '@/utils/composables/use-lock-scroll'

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
  lockScroll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'cancelled', 'closed'])

const { lock, unlock } = useLockScroll()

watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      emit('closed')
    }

    if (props.lockScroll) {
      newValue ? lock() : unlock()
    }
  }
)

function onClickClose() {
  emit('update:show', false)
  emit('cancelled')
}
</script>

<style scoped></style>
