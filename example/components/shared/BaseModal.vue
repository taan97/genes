<template>
  <van-popup
    v-model:show="isVisible"
    round
    class="w-[min(100vw-32px,344px)] min-h-[184px] !bg-black-v-2 shadow-inner-dark-v-1 flex flex-col"
    @closed="emit('closed')"
    @click-overlay="emit('cancelled')"
  >
    <div class="h-16 text-center">
      <slot name="header"></slot>
    </div>

    <BaseIcon
      v-if="!hideCloseIcon"
      name="close-circle"
      class="absolute right-0 m-3 cursor-pointer"
      width="24"
      height="25"
      @click="onClickClose"
    />

    <div
      ref="bodyContainerRef"
      class="text-center !max-h-[50vh] overflow-y-auto overflow-x-hidden break-words"
    >
      <slot name="body"></slot>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, useAttrs, ref, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  hideCloseIcon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'closed', 'cancelled'])

const bodyContainerRef = ref(null)

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const attrs = useAttrs()

function onClickClose() {
  if (attrs['before-close']) return attrs['before-close']()
  emit('cancelled')
  isVisible.value = false
}

async function scrollToTop() {
  await nextTick()
  bodyContainerRef.value.scrollTo(0, 0)
}

defineExpose({
  scrollToTop
})
</script>

<style scoped></style>
