<template>
  <slot
    name="scan-button"
    :scan="onClickScan"
  >
    <button
      type="button"
      class="border-gradient-1 p-1 rounded-md shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="scanqr"
        render-as-image
        @click="onClickScan"
      />
    </button>
  </slot>

  <van-overlay
    v-model:show="isReaderVisible"
    lock-scroll
    z-index="10"
    @click="() => stopScanning()"
  >
    <div class="flex flex-col items-center justify-center h-full">
      <div
        :id="identifier"
        @click.stop
      />
    </div>
  </van-overlay>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import { showToast } from '@/utils/shared-methods'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['succeeded'])

const isReaderVisible = ref(false)
const html5QrCode = ref(null)
const config = {
  fps: 10,
  qrbox: { width: 250, height: 250 }
}

const identifier = computed(() => `${props.id}-qr-code-reader`)

async function onClickScan() {
  isReaderVisible.value = true
  await nextTick()

  await scanQrCode()
}

async function scanQrCode() {
  html5QrCode.value = new Html5Qrcode(identifier.value)

  try {
    await html5QrCode.value.start(
      { facingMode: 'environment' },
      config,
      handleSuccess
    )
  } catch (err) {
    isReaderVisible.value = false
  }
}

async function handleSuccess(decodedText) {
  emit('succeeded', decodedText)
  showToast({ type: 'success' })

  await stopScanning()
}

async function stopScanning() {
  await html5QrCode.value.stop()
  isReaderVisible.value = false
}
</script>

<style scoped></style>
