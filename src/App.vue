<template>
  <component
    :is="layout"
    v-if="layout"
  >
    <router-view />
  </component>
  <router-view v-else />

  <TheClaimRewardModal />
  <TheClaimGiftModal />

  <TheConfirmModal />

  <TheLoading />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Layouts from '@/components/layouts'
import { useEventListener } from '@/utils/composables/use-event-listener'
// import { usePageVisibility } from '@vant/use'

const route = useRoute()
const router = useRouter()

const layout = computed(() => Layouts[route.meta.layout])

setDocumentInnerHeight()

onMounted(async () => {
  await router.isReady()
  if (route.query.blank) {
    // when user opens a new tab
  }
})

// const pageVisibility = usePageVisibility()
// watch(pageVisibility, (value) => {
//   if (value === 'visible') {
//     window.location.reload()
//   }
// })

function setDocumentInnerHeight() {
  useEventListener(
    'resize',
    () => {
      document.documentElement.style.setProperty(
        '--window-inner-height',
        `${window.innerHeight}px`
      )
    },
    { immediate: true }
  )
}
</script>

<style scoped></style>
