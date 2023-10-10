<template>
  <div
    class="flex gap-6 shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 p-6 items-center"
  >
    <BaseIcon
      name="pdf"
      render-as-image
    />
    <div class="flex flex-col flex-1 text-start">
      <p
        class="text-size-2 text-yellow-v-1 font-bold break-all first-letter:uppercase"
      >
        {{ props.fileTitle }}.pdf
      </p>
      <p class="text-size-1">{{ props.fileSize }}</p>
    </div>
    <div class="flex gap-3 items-center">
      <div @click="onClickPreview">
        <BaseIcon
          class="left-0 right-0 mx-auto"
          name="preview-copy"
          render-as-image
        />
        <p class="text-size-1">{{ $t('PageOverview.Preview') }}</p>
      </div>

      <a
        :href="props.fileUrl"
        download
      >
        <BaseIcon
          class="left-0 right-0 mx-auto"
          name="download-small"
          render-as-image
        />
        <p class="text-size-1">{{ $t('PageOverview.Download') }}</p>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fileUrl: {
    type: String,
    default: ''
  },

  fileTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['previewed'])

function onClickPreview() {
  emit('previewed')
}
</script>

<style scoped>
:deep(.van-progress__pivot) {
  display: none;
}
</style>
