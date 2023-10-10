<template>
  <a
    :href="liveChatLink"
    target="_blank"
  >
    <slot name="button">
      <div
        class="w-[38px] h-[38px] rounded-full p-2 bg-gradient-orange shadow-outer-orange-v-1 flex items-center justify-center"
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
