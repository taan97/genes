<template>
  <div
    class="h-screen w-[min(100vw,var(--root-max-width))] flex flex-col items-center bg-black-1 mx-auto"
  >
    <div
      class="relative w-full flex gap-4 justify-center items-center bg-black-2 p-4"
    >
      <button
        v-if="!$route.query.newTab"
        type="button"
        class="absolute left-4 top-0 bottom-0 my-auto p-2 rounded"
        @click="$router.go(-1)"
      >
        <BaseIcon
          name="arrow-left"
          class="!fill-white-1"
        />
      </button>

      <button
        type="button"
        :disabled="currentPage <= 1"
        @click="currentPage -= 1"
      >
        <BaseIcon
          name="chevron-left"
          :class="currentPage <= 1 ? 'fill-grey-1' : 'fill-white-1'"
        />
      </button>

      <p class="font-bold text-center min-w-[60px] text-white-1">
        {{ currentPage }} / {{ pageCount }}
      </p>

      <button
        type="button"
        :disabled="currentPage >= pageCount"
        @click="currentPage += 1"
      >
        <BaseIcon
          name="chevron-right"
          :class="currentPage >= pageCount ? 'fill-grey-1' : 'fill-white-1'"
        />
      </button>

      <a
        v-if="$route.query.downloadable"
        :href="$route.query.src"
        class="absolute right-4 p-2"
      >
        <BaseIcon name="download" />
      </a>
    </div>

    <VuePdfEmbed
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
