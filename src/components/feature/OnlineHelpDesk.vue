<template>
  <a
    :href="liveChatLink"
    target="_blank"
    class="rounded-full"
  >
    <slot name="button">
      <div
        class="h-full aspect-square rounded-full p-2 border-gradient-1 flex items-center justify-center"
      >
        <BaseIcon
          name="chat"
          render-as-image
        />
      </div>
    </slot>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { liveChatMap } from '@/locales/languages'

const { locale } = useI18n()

const liveChatLink = computed(() => liveChatMap[locale.value])
</script>

<style scoped></style>
