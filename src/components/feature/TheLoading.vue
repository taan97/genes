<template>
  <van-overlay
    :show="globalStore.isLoadingVisible"
    class="flex justify-center items-center !w-[min(100vw,var(--root-max-width))] left-0 right-0 mx-auto !z-[9999]"
  >
    <van-loading size="50px" />
  </van-overlay>
</template>

<script setup>
import { useGlobalStore } from '@/stores'
import { watch } from 'vue'

const globalStore = useGlobalStore()

watch(
  () => globalStore.isLoadingVisible,
  (newValue) => {
    document.body.style.overflowY = newValue ? 'hidden' : 'auto'
  }
)
</script>

<style scoped>
.van-overlay {
  --van-overlay-background-color: var(--root-black-6);
}
</style>
