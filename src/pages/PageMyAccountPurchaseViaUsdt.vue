<template>
  <BaseHeader
    class="!bg-none !bg-black-1 text-white-1"
    :title="
      getPlan() === PLAN_TYPE._A
        ? $t('PageMyAccountPurchaseViaUsdt.Title')
        : $t('PageMyAccountPurchaseViaUsdt.TitlePlanB')
    "
  >
    <template #sub-header>
      <div class="text-center">
        <h3 class="text-size-5 font-bold">
          {{ $t('PageMyAccountPurchaseViaUsdt.UsdtBalance') }}
        </h3>
        <p class="text-size-8 text-orange-1">
          {{ $formatCurrency(walletStore.wallet.usd) }}
        </p>
      </div>
    </template>
  </BaseHeader>

  <BaseForm
    class="flex-1 flex flex-col gap-8 p-5"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="form.quantity"
      type="digit"
      name="quantity"
      :placeholder="
        getPlan() === PLAN_TYPE._A
          ? $t('PageMyAccountPurchaseViaUsdt.InputAmount')
          : $t('PageMyAccountPurchaseViaUsdt.InputAmountPlanB')
      "
      :rules="formRules.quantity"
    >
      <template #left-icon>
        <BaseIcon name="gcrblack" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-if="!userStore.parent_id"
      v-model="form.referralId"
      name="referralId"
      type="number"
      :placeholder="$t('PageMyAccountPurchaseViaUsdt.ReferralId')"
      :rules="formRules.referralId"
    >
      <template #left-icon>
        <BaseIcon
          name="referral"
          width="13"
          height="13"
          class="fill-black-1"
        />
        <p
          v-if="form.referralId"
          class="text-black-1 ml-3 !mr-0"
        >
          GR
        </p>
      </template>
    </BaseFormInputText>

    <div class="grid grid-cols-[auto_auto_1fr] gap-1">
      <p class="text-white-1">
        {{ $t('PageMyAccountPurchaseViaUsdt.AvailableAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(form.quantity * walletStore.wallet.gcr_rate) }} USDT
      </p>

      <p class="text-white-1">
        {{
          getPlan() === PLAN_TYPE._A
            ? $t('PageMyAccountPurchaseViaUsdt.NavPrice')
            : $t('PageMyAccountPurchaseViaUsdt.NavPricePlanB')
        }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(walletStore.wallet.gcr_rate) }} USD
      </p>
    </div>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="buy-via-usdt"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Purchase') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { $formatCurrency } from '@/plugins/global-methods'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'
import InvestmentService from '@/services/investment-service'
import { useWalletStore, useUserStore } from '@/stores'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const walletStore = useWalletStore()
const userStore = useUserStore()
walletStore.setWallet()

const router = useRouter()
const form = reactive({
  quantity: '',
  referralId: ''
})

const formRules = {
  quantity: ['required'],
  referralId: ['required']
}

async function doSubmitted() {
  try {
    await InvestmentService.getInvestCheck({
      amount: form.quantity,
      uid: form.referralId || userStore.parent_id
    })

    router.replace({
      name: 'PageGcrSharesPurchaseAgreement',
      query: {
        amount: form.quantity,
        referralId: form.referralId || userStore.parent_id,
        rate: walletStore.wallet.gcr_rate
      }
    })
  } catch {}
}
</script>

<style scoped></style>
