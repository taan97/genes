<template>
  <header
    class="flex flex-col py-4 px-3 sticky top-0 z-10 transition-all duration-300"
    :class="{
      'shadow-outer-orange-dark-1 bg-black-opacity-1 text-white-1': hasScrolled
    }"
  >
    <div class="flex items-center min-h-[26px]">
      <button
        type="button"
        class="p-2 absolute z-[1] flex gap-2 items-center"
        @click="onClickGoBack"
      >
        <BaseIcon name="arrow-left" />
      </button>

      <h3
        class="flex-1 text-size-4 text-center font-bold px-10"
        :class="props.titleClass"
      >
        {{ props.title }}
      </h3>

      <div>
        <slot name="right-action" />
      </div>
    </div>

    <div :class="{ 'mt-5': $slots['sub-header'] }">
      <slot name="sub-header" />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEventListener } from '@/utils/composables/use-event-listener'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  backOption: {
    type: [Number, Object],
    default: -1
  },
  fallbackBackOption: {
    type: Object,
    default: null
  }
})

const router = useRouter()

const hasScrolled = ref(false)
const SCROLL_THRESHOLD = 10

useEventListener('scroll', handleScroll)

function onClickGoBack() {
  if (typeof props.backOption === 'number')
    return router.go(props.backOption, props.fallbackBackOption)

  router.replace(props.backOption)
}

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  hasScrolled.value = scrollTop > SCROLL_THRESHOLD
}
</script>

<style scoped></style>
