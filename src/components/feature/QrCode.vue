<template>
  <div class="flex justify-center relative">
    <VueQrcode
      v-if="props.value"
      ref="qrCodeRef"
      v-bind="$attrs"
      class="mx-auto border-4 border-black-1"
      :options="props.options"
      :value="props.value"
      tag="img"
    />
    <div
      v-else
      class="mx-auto bg-white-1"
      :style="{ width: QR_CODE_SIZE + 'px', height: QR_CODE_SIZE + 'px' }"
    />

    <BaseIcon
      v-if="props.icon"
      :name="props.icon"
      width="40"
      height="40"
      class="absolute top-0 bottom-0 m-auto"
    />
  </div>
</template>

<script>
const QR_CODE_SIZE = 180
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref } from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { useI18n } from 'vue-i18n'
import { showToast } from '@/utils/shared-methods.js'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      width: QR_CODE_SIZE
    })
  },

  value: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: ''
  }
})

const { t } = useI18n()

const qrCodeRef = ref(null)

function saveAsImage(filename = 'qr-code') {
  const qrCodeSource = qrCodeRef.value?.$el.src
  if (!qrCodeSource) return

  handleSaveAction(filename, qrCodeSource)
  showToast({ type: 'success', message: t('AppMessage.Saved') })
}

function handleSaveAction(filename, href) {
  const aElement = document.createElement('a')
  aElement.href = href
  aElement.download = filename
  document.body.append(aElement)
  aElement.click()
  document.body.removeChild(aElement)
}

defineExpose({
  saveAsImage
})
</script>

<style scoped></style>
