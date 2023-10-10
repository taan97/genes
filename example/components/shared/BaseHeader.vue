<template>
  <header
    class="flex flex-col pb-5 pt-12 px-5 sticky -top-7 z-10 bg-black-v-2 transition-shadow duration-300"
    :class="{ 'shadow-inner-dark-v-1': hasScrolled }"
  >
    <div class="flex items-center min-h-[26px]">
      <button
        class="p-2 absolute z-[1]"
        @click="onClickGoback"
      >
        <BaseIcon name="arrow-left" />
      </button>

      <h3
        class="flex-1 text-size-3 text-center font-bold px-10"
        :class="props.titleClass"
      >
        {{ props.title }}
      </h3>

      <div>
        <slot name="right-action"></slot>
      </div>
    </div>

    <div :class="{ 'mt-5': $slots['sub-header'] }">
      <slot name="sub-header"></slot>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  numberOfStepBack: {
    type: Number,
    default: -1
  }
})

const router = useRouter()

const hasScrolled = ref(false)
const SCROLL_THRESHOLD = 10

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  hasScrolled.value = scrollTop > SCROLL_THRESHOLD
}

function onClickGoback() {
  router.go(props.numberOfStepBack)
}
</script>

<style scoped></style>
