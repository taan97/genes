<template>
  <LayoutPromotionGoldBar :setups="layoutSetups">
    <div
      class="p-4 m-4 bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl"
    >
      <!-- <h1 class="text-orange-1 text-size-6 font-semibold mb-4">
        {{ $t('PagePromotionGoldBarTerms.Title') }}:
      </h1> -->

      <i18n-t
        keypath="PagePromotionGoldBarListingConfirmCancel.Terms"
        tag="p"
        class="text-start text-size-4 text-white-1 whitespace-pre-line mb-8"
        scope="global"
      >
        <template #fee>
          <span class="text-orange-1">{{ $route.query.fee }}</span>
        </template>
        <template #gold>
          <span class="text-orange-1">{{ $route.query.gold }}</span>
        </template>
        <template #total>
          <span class="text-orange-1">{{ $route.query.total }}</span>
        </template>
      </i18n-t>

      <BaseFormInputCheckbox
        v-model="termsCheckbox"
        name="terms"
        color="var(--root-orange-1)"
        class="mt-6"
      >
        <p class="text-orange-1">
          {{ $t('PagePromotionGoldBarListingConfirmCancel.TermsCheckbox') }}
        </p>
      </BaseFormInputCheckbox>
    </div>
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PromotionGoldBarService from '@/services/promotion-gold-bar-service'

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
    activeIcon: 'active-redeem',
    inactiveIcon: 'inactive-redeem',
    active: false,
    label: 'PagePromotionGoldBar.ButtonRedeem',
    handler: () => {}
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: true,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: handleRedeem
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

async function handleRedeem() {
  try {
    await PromotionGoldBarService.cancel(route.query.id)

    router.go(-1)
  } catch {}
}
</script>

<style scoped></style>
