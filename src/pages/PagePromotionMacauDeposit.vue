<template>
  <BaseHeader
    class="text-white-1"
    :title="$t('PagePromotionMacau.PromotionDeposit')"
  />

  <div
    class="flex-1 bg-transparent rounded-md border border-yellow-1 backdrop-blur px-4 pb-4 m-5 mt-0 flex flex-col gap-4 items-center text-white-1"
  >
    <div
      class="rounded-b-md bg-gradient-brown text-center font-bold text-size-4 py-1 px-2"
    >
      {{ $t('Button.Deposit') }}
    </div>

    <p class="text-white-1 pt-6 self-start">
      {{ $t('PageMyAccountWithdrawalUsdt.AvailableAmount') }}:
      {{ $formatCurrency(walletStore.wallet.usd) }} USD
    </p>

    <BaseForm
      class="flex-1 flex flex-col"
      @submitted="doSubmitted"
    >
      <BaseFormInputText
        v-model="deposit.amount"
        name="amount"
        type="digit"
        :placeholder="$t('PageMyAccountWithdrawalUsdt.InputAmount')"
        :rules="depositRules"
      >
        <template #right-icon>
          <button
            type="button"
            class="uppercase text-black-1 underline"
            @click="deposit.amount = String(deposit.max())"
          >
            {{ $t('Button.Max') }}
          </button>
        </template>
      </BaseFormInputText>

      <div class="flex-1" />

      <button
        type="submit"
        class="rounded-full p-3 border-gradient-1 w-[18rem] mx-auto text-orange-1 text-size-5 text-center font-bold"
      >
        {{
          isNewOrder
            ? $t('PagePromotionMacau.CreateNewOrder')
            : $t('Button.DepositMore')
        }}
      </button>
    </BaseForm>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PromotionMacauService from '@/services/promotion-macau-service'
import { $formatCurrency } from '@/plugins/global-methods'
import { useWalletStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { PROMOTION_MACAU_AMOUNT } from '@/utils/const'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const walletStore = useWalletStore()
walletStore.setWallet()

const PROMOTION_MACAU_DEFAULT_AMOUNT = 2000

const isNewOrder = computed(() => !route.query.orderNumber)

const deposit = reactive({
  amount: isNewOrder.value ? String(PROMOTION_MACAU_DEFAULT_AMOUNT) : '',
  min: 1,
  max: () =>
    Math.min(
      PROMOTION_MACAU_AMOUNT - (route.query.amount || 0),
      Number(walletStore.wallet.usd || 0)
    )
})

const depositRules = [
  {
    validator: (v) => v >= Number(deposit.min) && v <= Number(deposit.max()),
    message: () =>
      t('ValidationMessage.MustBeBetween', {
        max: $formatCurrency(deposit.max()),
        min: $formatCurrency(deposit.min)
      })
  },
  'required'
]

async function doSubmitted() {
  try {
    isNewOrder.value
      ? await PromotionMacauService.create(deposit.amount)
      : await PromotionMacauService.deposit(
          deposit.amount,
          route.query.orderNumber
        )

    router.go(-1)
  } catch {}
}
</script>

<style scoped>
:deep(.van-field__body) {
  --van-field-placeholder-text-color: white;
  --van-field-input-text-color: white;
}
:deep(.van-field__body) > .van-field__right-icon > * {
  color: white;
}
:deep(.van-field) {
  border-bottom-color: white !important;
}
</style>
