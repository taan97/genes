<template>
  <div
    class="rounded-3xl p-3 border-gradient-1 text-center shadow-outer-orange-dark-1"
  >
    <div class="flex justify-between">
      <BaseIcon name="adobe-pdf" />

      <button
        type="button"
        class="flex flex-col items-center gap-1"
        @click="onClickPreview"
      >
        <BaseIcon
          name="eye-hidden"
          class="fill-grey-4"
        />

        <p class="underline text-size-1 text-grey-4">
          {{ $t('PageDownloadDocuments.Preview') }}
        </p>
      </button>
    </div>

    <p class="text-orange-1 pt-2 text-size-2 text-left">{{ props.title }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['previewed'])

function onClickPreview() {
  emit('previewed')
}
</script>

<style scoped></style>
