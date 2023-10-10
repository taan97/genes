<template>
  <div class="flex justify-center">
    <BaseIcon name="qr-frame" />
    <vue-qrcode
      v-if="props.value"
      ref="qrCodeRef"
      v-bind="$attrs"
      class="absolute top-8 left-0 right-0 mx-auto"
      :options="props.options"
      :value="props.value"
      tag="img"
    />
    <div
      v-else
      class="absolute top-8 left-0 right-0 mx-auto w-[160px] h-[160px] bg-white-v-1"
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

<script setup>
import { ref } from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { useI18n } from 'vue-i18n'
import { showToast } from '@/utils/shared-methods.js'

const { t } = useI18n()

const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      width: 160
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
