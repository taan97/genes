<template>
  <BaseHeader
    :title="$t('PageMyAccountDepositFiat.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <router-link
        :to="{ name: 'PageMyAccountDepositFiatTransactionList' }"
        class="flex items-center gap-1 w-max ml-auto"
      >
        <BaseIcon name="listing" />

        <span class="underline text-white-1">{{
          $t('PageMyAccountDepositFiat.List')
        }}</span>
      </router-link>
    </template>
  </BaseHeader>

  <BaseForm
    ref="formRef"
    class="flex-1 flex flex-col gap-8 p-5 pb-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputDropdown
      v-model="depositForm.currentCurrency"
      name="currency"
      :rules="depositFormRules.currentCurrency"
      :options="currencyOptions"
      :placeholder="$t('PageMyAccountDepositFiat.SelectCurrency')"
      :title="$t('PageMyAccountDepositFiat.SelectCurrency')"
      @selected="doSelected"
    >
      <template #item="{ item }">
        <div class="flex gap-2 text-white-1">
          <p>{{ item.flag }}</p>
          <p>{{ item.label }}</p>
        </div>
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="depositForm.amount"
      type="digit"
      name="amount"
      :placeholder="
        $t('PageMyAccountDepositFiat.InputAmount', {
          currency:
            depositForm.currentCurrency && `(${depositForm.currentCurrency})`
        })
      "
      :rules="depositFormRules.amount"
    >
      <template #left-icon>
        <BaseIcon name="currency" />
      </template>
    </BaseFormInputText>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      style="--bg-color: var(--root-orange-2)"
    >
      <BaseIcon
        name="deposit-fiat"
        class="fill-black-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-black-1 text-size-5 font-bold">
        {{ $t('Button.Deposit') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { $formatCurrency } from '@/plugins/global-methods'
import FiatService from '@/services/fiat-service'
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const depositForm = reactive({
  amount: '',
  currentCurrency: ''
})

const flagsMap = {
  AED: '🇦🇪',
  ARS: '🇦🇷',
  AUD: '🇦🇺',
  BGN: '🇧🇬',
  BRL: '🇧🇷',
  CAD: '🇨🇦',
  CHF: '🇨🇭',
  CLP: '🇨🇱',
  COP: '🇨🇴',
  CZK: '🇨🇿',
  DKK: '🇩🇰',
  DOP: '🇩🇴',
  EGP: '🇪🇬',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  HKD: '🇭🇰',
  HRK: '🇭🇷',
  HUF: '🇭🇺',
  IDR: '🇮🇩',
  ILS: '🇮🇱',
  INR: '🇮🇳',
  ISK: '🇮🇸',
  JOD: '🇯🇴',
  JPY: '🇯🇵',
  KES: '🇰🇪',
  KRW: '🇰🇷',
  KWD: '🇰🇼',
  KZT: '🇰🇿',
  LKR: '🇱🇰',
  MAD: '🇲🇦',
  MDL: '🇲🇩',
  MKD: '🇲🇰',
  MXN: '🇲🇽',
  MYR: '🇲🇾',
  NGN: '🇳🇬',
  NOK: '🇳🇴',
  NZD: '🇳🇿',
  OMR: '🇴🇲',
  PEN: '🇵🇪',
  PHP: '🇵🇭',
  PKR: '🇵🇰',
  PLN: '🇵🇱',
  QAR: '🇶🇦',
  RON: '🇷🇴',
  SAR: '🇸🇦',
  SEK: '🇸🇪',
  SGD: '🇸🇬',
  THB: '🇹🇭',
  TRY: '🇹🇷',
  TWD: '🇹🇼',
  USD: '🇺🇸',
  VND: '🇻🇳',
  ZAR: '🇿🇦'
}

const currencyOptions = ref([])
const formRef = ref(null)

const depositFormRules = {
  amount: [
    {
      validator: (v) => v >= Number(deposit.min) && v <= Number(deposit.max),
      message: () =>
        t('ValidationMessage.MustBeBetween', {
          max: $formatCurrency(deposit.max),
          min: $formatCurrency(deposit.min)
        })
    },
    'required'
  ],
  currentCurrency: ['required']
}

const deposit = reactive({
  max: '',
  min: ''
})

getCurrency()

async function getCurrency() {
  try {
    const { data } = await FiatService.getCurrency()
    currencyOptions.value = data.map((item) => ({
      label: item.currency,
      value: item.currency,
      max: item.max,
      min: item.min,
      flag: flagsMap[item.currency.toUpperCase()]
    }))
  } catch {}
}

async function doSubmitted() {
  try {
    const { data } = await FiatService.createRechargeOrder({
      amount: depositForm.amount,
      currency: depositForm.currentCurrency
    })

    window.open(data.get_account, '_blank')
    router.push({ name: 'PageMyAccountDepositFiatTransactionList' })
  } catch {}
}

function doSelected(val) {
  depositForm.currentCurrency = val.value
  deposit.max = val.max
  deposit.min = val.min
  formRef.value?.formInputs.amount.forceValidate()
}
</script>

<style scoped></style>
