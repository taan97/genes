<template>
  <LayoutPromotionGoldBar
    active-tab="2nd"
    :setups="layoutSetups"
  >
    <div
      class="p-4 m-4 bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl"
    >
      <h1 class="text-orange-1 text-size-6 font-semibold mb-4">
        {{ $t('PagePromotionGoldBarTerms2nd.Title') }}:
      </h1>

      <p class="text-white-1 whitespace-pre-line">
        {{ $t('PagePromotionGoldBarTerms2nd.Content') }}
      </p>

      <BaseFormInputCheckbox
        v-model="termsCheckbox"
        name="terms"
        color="var(--root-orange-1)"
        class="mt-6"
      >
        <p class="text-orange-1">
          {{ $t('PagePromotionGoldBarTerms.AgreeTermsNote') }}
        </p>
      </BaseFormInputCheckbox>
    </div>
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PromotionGoldBarService2nd from '@/services/promotion-gold-bar-service-2nd'

const router = useRouter()
const route = useRoute()
const termsCheckbox = ref(false)

const layoutSetups = reactive([
  {
    activeIcon: 'active-close',
    inactiveIcon: 'inactive-close',
    active: true,
    label: 'PagePromotionGoldBar.ButtonClose',
    handler: () => {
      router.go(-1)
    }
  },
  {
    activeIcon: 'active-deposit',
    inactiveIcon: 'inactive-deposit',
    active: false,
    label: 'PagePromotionGoldBar.ButtonDeposit',
    handler: () => {}
  },
  {
    activeIcon: 'active-listing',
    inactiveIcon: 'inactive-listing',
    active: false,
    label: 'PagePromotionGoldBar.ButtonListing',
    handler: () => {}
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: true,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: handleSubmit
  }
])

watch(
  termsCheckbox,
  (newValue) => {
    const confirmButton = layoutSetups.find(
      (l) => l.activeIcon === 'active-confirm'
    )
    confirmButton.active = newValue
  },
  { immediate: true }
)

async function handleSubmit() {
  try {
    await PromotionGoldBarService2nd.pledge({ quantity: route.query.quantity })

    router.push({
      name: 'PagePromotionGoldBarListing2nd',
      replace: true
    })
  } catch {}
}
</script>

<style scoped></style>
