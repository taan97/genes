<template>
  <BaseHeader :title="$t('PageUsdtWithdrawal.UsdtWithdrawal')" />

  <div class="p-5 pt-0">
    <BaseIcon
      name="record-circle"
      class="block ml-auto"
      render-as-image
      @click="onClickShowRecords"
    />

    <BaseIcon
      name="usdt-big"
      class="mb-6 mx-auto"
    />

    <form
      class="flex flex-col gap-8"
      @submit.prevent="onSubmitWithdraw"
    >
      <BaseInputText
        :ref="setFieldRef('trcAddress')"
        v-model="withdrawalForm.trcAddress"
        :placeholder="$t('PageUsdtWithdrawal.InputTrc20Address')"
        :rules="withdrawalFormRules.trcAddress"
      >
        <template #left-icon>
          <BaseIcon
            name="trc"
            render-as-image
          />
        </template>
        <template #right-icon>
          <QrCodeScanner @succeeded="(e) => (withdrawalForm.trcAddress = e)" />
        </template>
      </BaseInputText>

      <BaseInputText
        :ref="setFieldRef('withdrawAmount')"
        v-model="withdrawalForm.withdrawAmount"
        type="number"
        :placeholder="$t('PageUsdtWithdrawal.InputWithdrawAmount')"
        :rules="withdrawalFormRules.withdrawAmount"
      >
        <template #left-icon>
          <BaseIcon
            name="usdt-square"
            render-as-image
          />
        </template>
        <template #right-icon>
          <button
            type="button"
            class="text-orange-v-1"
            @click="onClickSetUsdtMax"
          >
            {{ $t('PageUsdtWithdrawal.Max') }}
          </button>
        </template>
      </BaseInputText>

      <div class="flex gap-4">
        <div
          class="flex flex-col gap-2 shadow-inner-dark-v-1 rounded-xl p-5 w-1/2"
        >
          <p class="text-size-2">
            {{ $t('PageUsdtWithdrawal.AvailableAmount') }}
          </p>
          <p class="text-size-3 font-bold">USDT</p>
          <p class="text-size-3 font-bold">
            {{ $formatCurrency(informationWallet.amount) }}
          </p>
        </div>
        <div
          class="flex flex-col gap-2 shadow-inner-dark-v-1 rounded-xl p-5 w-1/2"
        >
          <p class="text-size-2">{{ $t('PageUsdtWithdrawal.HandlingFee') }}</p>
          <p class="text-size-3 font-bold break-words">USDT</p>
          <p class="text-size-3 font-bold break-words">
            {{ feeRate }}
          </p>
          <p class="text-size-1">{{ $t('PageUsdtWithdrawal.HandlingFee2') }}</p>
        </div>
      </div>

      <div
        class="flex flex-col gap-2 shadow-inner-dark-v-1 rounded-xl px-9 py-5 w-full text-center"
      >
        <p class="text-size-2">
          {{ $t('PageUsdtWithdrawal.AmountReceive') }}
        </p>
        <p class="text-size-3 font-bold">USDT {{ receiveAmount }}</p>
      </div>

      <BaseInputPassword
        :ref="setFieldRef('googleVerificationCode')"
        v-model="withdrawalForm.googleVerificationCode"
        :placeholder="$t('PageUsdtWithdrawal.EnterTheGoogleAuthenticatorCode')"
        :rules="withdrawalFormRules.googleVerificationCode"
      >
        <template #left-icon>
          <BaseIcon
            name="google-authenticator"
            render-as-image
          />
        </template>
      </BaseInputPassword>

      <p class="whitespace-pre-line text-size-2 px-4">
        {{ $t('PageUsdtWithdrawal.Explain') }}
      </p>

      <button
        v-toggle-active-state="getValidationStatus()"
        type="submit"
        class="self-center rounded-lg w-[18rem] py-2 px-4 mb-8 font-bold text-size-5"
      >
        {{ $t('Button.Withdraw') }}
        <BaseIcon
          name="withdraw"
          class="absolute left-5 top-0 bottom-0 my-auto"
        />
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import WalletService from '@/services/wallet-service.js'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { $formatCurrency } from '@/plugins/global-methods'

const router = useRouter()
const { t } = useI18n()
const withdrawalForm = reactive({
  trcAddress: '',
  withdrawAmount: '',
  googleVerificationCode: ''
})

const informationWallet = ref({
  amount: '',
  fee: '',
  receive: ''
})

const withdrawalFormRules = {
  trcAddress: ['required'],
  withdrawAmount: [
    {
      validator: (v) =>
        v >= Number(informationWallet.value.min) &&
        v <= Number(informationWallet.value.amount),
      message: () =>
        t('ValidationMessage.AmountNeedsGreaterThanFiftyAndSmallerThanAmount', {
          number: informationWallet.value.min
        })
    }
  ],
  googleVerificationCode: ['required']
}

const { setFieldRef, getValidationStatus } =
  useFormValidation(withdrawalFormRules)

const feeRate = computed(() => {
  return (
    (Number(withdrawalForm.withdrawAmount) *
      Number(informationWallet.value.fee)) /
      100 +
    1
  ).toFixed(2)
})

const receiveAmount = computed(() => {
  return withdrawalForm.withdrawAmount - feeRate.value < 0
    ? 0
    : $formatCurrency(withdrawalForm.withdrawAmount - feeRate.value)
})

setWalletOverView()

function onClickSetUsdtMax() {
  withdrawalForm.withdrawAmount = informationWallet.value.amount
}

async function onSubmitWithdraw() {
  try {
    await WalletService.chainWithdraw(withdrawalForm)
    router.push({ name: 'PageUsdtWithdrawalRecords' })
  } catch {}
}

async function setWalletOverView() {
  try {
    const { data } = await WalletService.getWalletOverview()

    informationWallet.value = {
      amount: data.capital,
      fee: data.fee_rate,
      min: data.min
    }
  } catch {}
}

function onClickShowRecords() {
  router.push({ name: 'PageUsdtWithdrawalRecords' })
}
</script>

<style scoped></style>
