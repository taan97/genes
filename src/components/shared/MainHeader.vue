<template>
  <header
    class="flex flex-col sticky top-0 z-10 transition-all duration-300 w-[min(100vw,var(--root-max-width))]"
    :class="{ 'shadow-outer-orange-dark-1': hasScrolled }"
  >
    <div class="min-h-[26px] bg-black-2">
      <slot name="title">
        <h3
          class="flex-1 text-size-4 text-center font-bold px-10 text-white-1 pt-6 pb-4"
          :class="props.titleClass"
        >
          {{ props.title }}
        </h3>
      </slot>
    </div>

    <slot />
  </header>
</template>

<script setup>
import { ref } from 'vue'

import { useEventListener } from '@/utils/composables/use-event-listener'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  }
})

const hasScrolled = ref(false)
const SCROLL_THRESHOLD = 10

useEventListener('scroll', handleScroll)

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  hasScrolled.value = scrollTop > SCROLL_THRESHOLD
}
</script>

<style scoped></style>
