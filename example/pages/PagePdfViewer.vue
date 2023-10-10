<template>
  <div
    class="h-screen w-[min(100vw,var(--root-max-width))] flex flex-col items-center bg-white mx-auto"
  >
    <div class="w-full flex gap-4 justify-center items-center bg-black-v-2 p-4">
      <button
        :disabled="currentPage <= 1"
        @click="currentPage -= 1"
      >
        <BaseIcon
          name="arrow-left"
          :class="currentPage <= 1 ? 'fill-grey-v-1' : 'fill-white-v-1'"
        />
      </button>

      <p class="font-bold text-center min-w-[60px]">
        {{ currentPage }} / {{ pageCount }}
      </p>

      <button
        :disabled="currentPage >= pageCount"
        @click="currentPage += 1"
      >
        <BaseIcon
          name="arrow-left"
          class="rotate-180"
          :class="currentPage >= pageCount ? 'fill-grey-v-1' : 'fill-white-v-1'"
        />
      </button>
    </div>

    <vue-pdf-embed
      ref="pdfRef"
      class="w-full m-auto"
      :source="$route.query.src"
      :page="currentPage"
      @rendered="doRendered"
    />
  </div>

  <van-overlay
    :show="isLoading"
    class="flex justify-center items-center !w-[min(100vw,var(--root-max-width))] left-0 right-0 mx-auto !z-[9999]"
  >
    <van-loading size="50px" />
  </van-overlay>
</template>

<script setup>
import { ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const pdfRef = ref(null)
const pageCount = ref(1)
const currentPage = ref(1)
const isLoading = ref(true)

function doRendered() {
  isLoading.value = false
  pageCount.value = pdfRef.value.pageCount
}
</script>

<style scoped></style>
