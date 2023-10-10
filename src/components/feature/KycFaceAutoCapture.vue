<template>
  <MainHeader class="!absolute">
    <template #title>
      <!-- <button
        type="button"
        class="p-2 absolute z-[1] left-2 top-4 flex gap-2 items-center"
        @click="$router.go(-1)"
      >
        <BaseIcon
          name="arrow-left"
          class="fill-white-1"
        />
      </button> -->

      <h3
        class="text-size-4 text-center font-bold px-10 text-white-1 pt-6 pb-4"
      >
        {{ $t('PageKycVerification.FaceStepTitle') }}
      </h3>

      <p class="text-center text-grey-2 mb-2">
        {{ $t('PageKycVerification.FaceStepDescription') }}
      </p>
    </template>
  </MainHeader>

  <div class="flex-1 bg-black-opacity-1 relative">
    <x-dot-face-auto-capture id="x-dot-face-auto-capture" />

    <template v-if="faceCaptured">
      <img
        class="absolute top-0"
        :src="faceCaptured"
      />

      <div
        class="absolute left-0 right-0 top-0 bottom-0 w-[75vw] h-[75vw] m-auto border-[5px] border-orange-1 rounded-full"
        :style="{
          'box-shadow': '0px 0px 0px 999px rgba(0, 0, 0, 0.5)'
        }"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@innovatrics/dot-face-auto-capture'
import DotService from '@/services/dot-service'
import { showToast, toBase64 } from '@/utils/shared-methods'
import { useGlobalStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  portrait: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['succeeded', 'failed'])

const { t } = useI18n()
const globalStore = useGlobalStore()

const faceCaptured = ref('')

const PASSIVE_LIVENESS_THRESHOLD = 0.8383
const SIMILARITY_THRESHOLD = 0.8

onMounted(() => {
  const faceAutoCaptureHTMLElement = document.getElementById(
    'x-dot-face-auto-capture'
  )
  faceAutoCaptureHTMLElement.cameraOptions = {
    imageType: 'png',
    cameraFacing: 'user',
    photoTakenCb: handleFacePhotoTaken,
    onError: (e) => {
      showToast({ type: 'fail', message: e.message })
    },
    uiCustomisation: {
      instructions: {
        candidate_selection: t('PageKycVerification.FaceCandidateSelection'),
        face_too_close: t('PageKycVerification.FaceTooClose'),
        face_too_far: t('PageKycVerification.FaceTooFar'),
        face_centering: t('PageKycVerification.FaceCentering'),
        face_not_present: t('PageKycVerification.FaceNotPresent'),
        sharpness_too_low: t('PageKycVerification.FaceSharpnessTooLow'),
        brightness_too_low: t('PageKycVerification.FaceBrightnessTooLow'),
        brightness_too_high: t('PageKycVerification.FaceBrightnessTooHigh')
      },
      colors: {
        placeholderColorSuccess: 'var(--root-orange-1)',
        instructionColorSuccess: 'var(--root-orange-1)'
      },
      appStateInstructions: {
        loading: {
          text: t('PageKycVerification.FaceLoadingComponent')
        },
        waiting: {
          visible: false
        }
      }
    }
  }
})

async function handleFacePhotoTaken(e) {
  try {
    const selfie = await toBase64(e)
    faceCaptured.value = await toBase64(e, { fullPath: true })
    await checkPassiveLiveness(selfie)
  } catch (e) {
    showToast({ type: 'fail', message: e.message })
  }
}

async function checkPassiveLiveness(selfie) {
  if (!globalStore.currentCustomerId) {
    const res = await DotService.createCustomer()
    globalStore.currentCustomerId = res.id
  }

  await DotService.createLiveness(globalStore.currentCustomerId)
  await DotService.uploadPassiveLiveness({
    id: globalStore.currentCustomerId,
    selfie
  })

  const res = await DotService.evaluatePassiveLiveness(
    globalStore.currentCustomerId
  )

  if (res.score < PASSIVE_LIVENESS_THRESHOLD) {
    return emit('failed')
  }

  await compare()
}

async function compare() {
  const { id: targetFaceId } = await DotService.createFace(props.portrait)

  const sourceResponse = await DotService.createFace(
    faceCaptured.value.split(',')[1]
  )

  const source = sourceResponse.links.self

  const res = await DotService.compare({
    faceId: targetFaceId,
    referenceFace: source
  })

  if (res.score < SIMILARITY_THRESHOLD) {
    return emit('failed')
  }

  emit('succeeded', faceCaptured.value)
}
</script>

<style scoped></style>
