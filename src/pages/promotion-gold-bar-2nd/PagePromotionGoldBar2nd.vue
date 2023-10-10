<template>
  <LayoutPromotionGoldBar
    active-tab="2nd"
    :setups="layoutSetups"
  >
    <div
      class="p-4 m-4 bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl"
    >
      <BaseIcon
        name="logo-orange"
        class="mx-auto"
      />

      <p class="text-white-1 text-size-6 text-center my-4 font-bold">
        {{ $t('PagePromotionGoldBar2nd.Title') }}
      </p>

      <BaseFormInputText
        v-model="form.quantity"
        type="digit"
        name="quantity"
        light-theme
        :formatter="
          (v) =>
            v >= Number(walletStore.wallet.ticket)
              ? Math.floor(walletStore.wallet.ticket)
              : v
        "
        :placeholder="$t('PagePromotionGoldBar.InputPlaceholder')"
      >
        <template #left-icon>
          <BaseIcon
            name="gcrorange"
            render-as-image="png"
          />
        </template>
      </BaseFormInputText>

      <p
        class="mt-2 mb-14"
        :class="isQuantityValid ? 'text-orange-1' : 'text-red-2'"
      >
        {{ $t('PagePromotionGoldBar2nd.InputNote') }}
      </p>

      <p class="text-white-1 mt-1">
        {{ $t('PagePromotionGoldBar.AvailableConv') }} :
        <span class="text-orange-1">
          {{ $formatUnits(walletStore.wallet.ticket) }}
        </span>
      </p>
      <i18n-t
        keypath="PagePromotionGoldBar2nd.PageNote"
        tag="p"
        class="text-white-1 mt-1"
        scope="global"
      >
        <template #count>
          <span class="text-orange-1 font-bold">
            {{
              form.quantity % BASE_QUANTITY === 0
                ? (form.quantity * 12) / BASE_QUANTITY
                : 0
            }}
          </span>
        </template>
      </i18n-t>
    </div>
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useWalletStore } from '@/stores'
import PromotionGoldBarService2nd from '@/services/promotion-gold-bar-service-2nd'

const router = useRouter()
const walletStore = useWalletStore()
walletStore.setWallet()

const form = reactive({
  quantity: ''
})

const BASE_QUANTITY = 100
const isQuantityValid = computed(
  () => form.quantity > 0 && form.quantity % BASE_QUANTITY === 0
)

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
    active: true,
    label: 'PagePromotionGoldBar.ButtonDeposit',
    handler: checkQuantity
  },
  {
    activeIcon: 'active-listing',
    inactiveIcon: 'inactive-listing',
    active: true,
    label: 'PagePromotionGoldBar.ButtonListing',
    handler: () => {
      router.push({ name: 'PagePromotionGoldBarListing2nd' })
    }
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: false,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: () => {}
  }
])

watch(
  isQuantityValid,
  (newValue) => {
    const redeemButton = layoutSetups.find(
      (l) => l.activeIcon === 'active-deposit'
    )
    redeemButton.active = newValue
  },
  { immediate: true }
)

async function checkQuantity() {
  try {
    await PromotionGoldBarService2nd.canPledge(form.quantity)

    router.push({
      name: 'PagePromotionGoldBarTerms2nd',
      query: { quantity: form.quantity }
    })
  } catch {}
}
</script>

<style scoped></style>
