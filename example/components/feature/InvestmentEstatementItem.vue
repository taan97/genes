<template>
  <div
    class="flex gap-6 shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 p-6 items-center"
  >
    <BaseIcon
      name="pdf"
      render-as-image
    />

    <p
      class="flex-1 text-start text-size-2 text-yellow-v-1 font-bold break-all first-letter:uppercase"
    >
      {{ props.fileTitle }}.pdf
    </p>

    <div
      v-if="props.fileStatus === ESTATEMENT_STATUS.GENERATED"
      class="flex gap-3 items-center"
    >
      <button @click="onClickPreview">
        <BaseIcon
          class="left-0 right-0 mx-auto"
          name="preview-copy"
          render-as-image
        />
        <p class="text-size-1">{{ $t('PageOverview.Preview') }}</p>
      </button>

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

    <div
      v-if="props.fileStatus === ESTATEMENT_STATUS.NOT_YET_GENERATED"
      class="flex gap-3 items-center"
    >
      <button @click="onClickGenerate">
        <BaseIcon
          class="left-0 right-0 mx-auto"
          name="generate"
          render-as-image
        />
        <p class="text-size-1">{{ $t('PageOverview.Generate') }}</p>
      </button>
    </div>

    <div
      v-if="props.fileStatus === ESTATEMENT_STATUS.GENERATING"
      class="flex gap-1 items-center flex-col"
    >
      <button class="left-0 right-0 mx-auto rounded-md p-2 btn-inactive">
        <BaseIcon
          class="fill-grey-v-1"
          name="generate-icon"
        />
      </button>

      <p class="text-size-1 text-grey-v-1">
        {{ $t('PageOverview.Generating') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import UserCenterService from '@/services/user-center-service'
import { ESTATEMENT_STATUS } from '@/utils/const.js'

const props = defineProps({
  fileUrl: {
    type: String,
    required: true
  },

  fileTitle: {
    type: String,
    default: ''
  },

  fileStatus: {
    type: Number,
    required: true
  },

  fileId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['generating-started', 'previewed'])

function onClickPreview() {
  emit('previewed')
}

async function onClickGenerate() {
  try {
    await UserCenterService.generateBillPdf({ id: props.fileId })
    emit('generating-started')
  } catch {}
}
</script>

<style scoped>
:deep(.van-progress__pivot) {
  display: none;
}
</style>
