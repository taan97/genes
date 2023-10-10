<template>
  <component :is="layout">
    <RouterView />
  </component>

  <TheConfirmModal />

  <TheLoading />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Layouts from '@/components/layouts'
import { APP } from '@/utils/const.js'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import { useUserStore } from '@/stores'
import { REWARD_STATUS } from '@/utils/const.js'

const { t } = useI18n()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const layout = computed(
  () => Layouts[route.meta.layout] || Layouts[APP.LAYOUT.DEFAULT]
)

onMounted(async () => {
  setBodyMinHeight()

  try {
    await router.isReady()
    if (route.query.blank) return

    if (route.name === 'PageRedeemForm') return

    showRewardModal()
  } catch {}
})

async function showRewardModal() {
  if (userStore.reward === REWARD_STATUS.NO_REWARD) return

  const Modal = useConfirmModal()

  try {
    await Modal.open({
      title: t('PageRedeem.TitleModal'),
      message: t('PageRedeem.Content'),
      buttonText: t('Button.AcceptAward'),
      headerIcon: 'redeem-square',
      buttonClass: 'bg-gradient-red shadow-outer-red-v-1 '
    })

    router.push({ name: 'PageRedeemForm' })
  } catch {}
}

function setBodyMinHeight() {
  // body min height is initially set to 100vh
  // however, 100vh is different across devices, especially ios ones
  document.body.style.minHeight = window.innerHeight + 'px'
}
</script>

<style scoped></style>
