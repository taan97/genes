<template>
  <van-popup
    v-model:show="isVisible"
    round
    class="w-[min(100vw-50px,344px)] min-h-[184px] !bg-black-1 flex flex-col rounded-full border-[1px] border-orange-1"
    @closed="emit('closed')"
    @click-overlay="emit('cancelled')"
  >
    <BaseIcon
      v-if="!hideCloseIcon"
      name="close-circle"
      class="cursor-pointer fill-red-1 right-0 left-0 ml-auto mt-3 mr-3"
      width="33"
      height="33"
      @click="onClickClose"
    />

    <div
      v-if="$slots.header"
      class="h-16 right-0 left-0 mx-auto"
    >
      <slot name="header" />
    </div>

    <div
      ref="bodyContainerRef"
      class="text-center overflow-y-auto overflow-x-hidden break-words"
      :class="props.contentClass"
    >
      <slot name="content" />
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
  },

  contentClass: {
    type: String,
    default: '!max-h-[50vh]'
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
