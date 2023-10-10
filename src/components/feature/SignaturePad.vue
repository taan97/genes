<template>
  <button
    type="button"
    class="bg-white-1 isolate relative h-24 flex flex-col justify-center items-center w-full p-2"
    @click="isVisible = true"
  >
    <BaseIcon
      class="absolute z-[-1]"
      name="trademark"
      height="84px"
      width="51px"
    />

    <template v-if="signatureUrl">
      <img
        :src="signatureUrl"
        class="h-full"
      />
    </template>

    <template v-else>
      <BaseIcon name="create" />
      <span class="underline text-orange-1 text-size-4">
        {{ $t('PageGcrSharesPurchaseAgreement.CreateASignature') }}
      </span>
    </template>
  </button>

  <BaseActionSheet
    v-model:show="isVisible"
    lock-scroll
  >
    <template #header>
      <div class="flex text-white-1 justify-between w-full">
        <button
          type="button"
          class="underline"
          @click="isVisible = false"
        >
          {{ $t('Button.Cancel') }}
        </button>
        <span class="text-size-5 text-orange-1 font-semibold">{{
          $t('PageGcrSharesPurchaseAgreement.Signature')
        }}</span>
        <button
          type="button"
          class="underline"
          @click="onClickSave"
        >
          {{ $t('Button.Save') }}
        </button>
      </div>
    </template>
    <template #content>
      <div class="mx-4 my-6 flex flex-col justify-center gap-2">
        <div
          class="isolate relative bg-white-1 w-full h-[200px] rounded-lg flex justify-center items-center"
        >
          <BaseIcon
            class="absolute z-[-1]"
            name="trademark"
            height="200px"
            width="122px"
          />

          <canvas
            ref="signaturePadRef"
            class="w-full h-full"
          />
        </div>

        <button
          type="button"
          class="text-orange-1 underline max-w-max mx-auto"
          @click="onClickClear"
        >
          {{ $t('PageGcrSharesPurchaseAgreement.ClearSignature') }}
        </button>
      </div>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import SignaturePad from 'signature_pad'
import { nextTick, ref, watch } from 'vue'
import globalService from '@/services/global-service'
import { dataURLtoFile } from '@/utils/shared-methods'

const emit = defineEmits(['changed'])

const signaturePadRef = ref(null)
const signatureUrl = ref('')

const isVisible = ref(false)
let signaturePad = null

watch(isVisible, async (newValue) => {
  if (!newValue) return
  await nextTick()

  signaturePad = new SignaturePad(signaturePadRef.value)

  resizePad()
})

function resizePad() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  signaturePadRef.value.width = signaturePadRef.value.offsetWidth * ratio
  signaturePadRef.value.height = signaturePadRef.value.offsetHeight * ratio

  signaturePadRef.value.getContext('2d').scale(ratio, ratio)
}

async function onClickClear() {
  signaturePad.clear()
}

async function onClickSave() {
  const file = dataURLtoFile(signaturePad.toDataURL())

  try {
    const res = await globalService.uploadImage(file)
    signatureUrl.value = res.data
    emit('changed', res.data)
    isVisible.value = false
  } catch {}
}
</script>

<style scoped></style>
