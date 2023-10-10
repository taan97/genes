<template>
  <BaseHeader
    :title="$t('PageMyAccountWithdrawalFiat.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <router-link
        :to="{ name: 'PageMyAccounWithdrawalFiatTransactionList' }"
        class="flex items-center gap-1 w-max ml-auto"
      >
        <BaseIcon name="listing" />

        <span class="underline text-white-1">{{
          $t('PageMyAccountWithdrawalFiat.List')
        }}</span>
      </router-link>
    </template>
  </BaseHeader>

  <BaseForm
    ref="withdrawalFormRef"
    class="flex-1 flex flex-col gap-8 p-5 pb-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="withdrawalForm.amount"
      name="amount"
      type="digit"
      :placeholder="$t('PageMyAccountWithdrawalFiat.InputAmount')"
      :rules="withdrawalFormRules.amount"
    >
      <template #left-icon>
        <BaseIcon name="vnd" />
      </template>
      <template #right-icon>
        <button
          type="button"
          class="uppercase text-black-1 underline"
          @click="
            withdrawalForm.amount = Math.min(
              Number(walletService.wallet.usd) || 0,
              withdrawal.max
            )
          "
        >
          {{ $t('Button.Max') }}
        </button>
      </template>
    </BaseFormInputText>

    <fieldset>
      <BaseFormInputPassword
        v-model="withdrawalForm.password"
        name="password"
        :placeholder="$t('PageMyAccountWithdrawalFiat.TransactionPassword')"
        :rules="withdrawalFormRules.password"
      >
        <template #left-icon>
          <BaseIcon name="security-verify" />
        </template>
      </BaseFormInputPassword>

      <router-link
        :to="{ name: 'PageSettingsChangeTransactionPassword' }"
        class="float-right underline mt-2"
      >
        {{ $t('PageMyAccountWithdrawalFiat.ForgotPassword') }}
      </router-link>
    </fieldset>

    <BaseFormInputDropdown
      v-model="withdrawalForm.question"
      name="question"
      :placeholder="$t('PageMyAccountWithdrawalFiat.SecurityQuestion')"
      :rules="withdrawalFormRules.question"
      :options="questionOptions"
      :title="$t('PageMyAccountWithdrawalFiat.SelectQuestion')"
    >
      <template #left-icon>
        <BaseIcon name="securityq" />
      </template>
    </BaseFormInputDropdown>

    <fieldset>
      <BaseFormInputPassword
        v-model="withdrawalForm.answer"
        name="answer"
        :placeholder="$t('PageMyAccountWithdrawalFiat.SecurityAnswer')"
        :rules="withdrawalFormRules.answer"
      >
        <template #left-icon>
          <BaseIcon name="answer" />
        </template>
      </BaseFormInputPassword>

      <router-link
        :to="{ name: 'PageResetSecurityQuestion' }"
        class="float-right underline mt-2"
      >
        {{ $t('PageMyAccountWithdrawalFiat.ForgotAnswer') }}
      </router-link>
    </fieldset>

    <div class="flex flex-col gap-1">
      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalFiat.CreditBankAccount') }}
      </p>
      <p>
        {{ $route.params.bankName }} [{{ $route.params.bankAccountNumber }}]
      </p>
      <p class="capitalize">{{ $route.params.bankAccountName }}</p>
    </div>

    <div class="grid grid-cols-[auto_auto_1fr] gap-1">
      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalFiat.CurrencyRate') }}
      </p>
      <p>:</p>
      <p class="break-all">{{ $formatCurrency(withdrawal.rate) }}</p>

      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalFiat.WithdrawalAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(withdrawalForm.amount * withdrawal.rate) }} VND
      </p>

      <p class="text-white-1">
        {{
          $t('PageMyAccountWithdrawalFiat.AdminFee', {
            number: walletService.wallet.fee_rate
          })
        }}%
      </p>
      <p>:</p>
      <p class="break-all">{{ walletService.wallet.fee_rate / 100 }}</p>

      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalFiat.ReceiveAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{
          $formatCurrency(
            withdrawalForm.amount *
              withdrawal.rate *
              (1 - walletService.wallet.fee_rate / 100)
          )
        }}
        VND
      </p>
    </div>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      style="--bg-color: var(--root-orange-2)"
    >
      <BaseIcon
        name="withdrawal-fiat"
        class="fill-black-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-black-1 text-size-5 font-bold">
        {{ $t('Button.Withdraw') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useWalletStore } from '@/stores'
import { $formatCurrency } from '@/plugins/global-methods'
import UserService from '@/services/user-service.js'
import FiatService from '@/services/fiat-service'

const { t } = useI18n()
const router = useRouter()

const walletService = useWalletStore()
walletService.setWallet()

const withdrawalForm = reactive({
  amount: '',
  password: '',
  question: '',
  answer: ''
})

const withdrawalFormRules = {
  amount: [
    {
      validator: (v) =>
        v >= Number(withdrawal.min) && v <= Number(withdrawal.max),
      message: () =>
        t('ValidationMessage.MustBeBetween', {
          max: $formatCurrency(withdrawal.max),
          min: $formatCurrency(withdrawal.min)
        })
    }
  ],
  password: ['password'],
  question: ['required'],
  answer: ['required']
}

const withdrawal = reactive({
  rate: '',
  max: '',
  min: ''
})

const questionOptions = ref([])

const withdrawalFormRef = ref(null)

setSecretQuestions()

async function doSubmitted() {
  try {
    await FiatService.createWithdrawalOrder(withdrawalForm)

    router.push({ name: 'PageMyAccounWithdrawalFiatTransactionList' })
  } catch {}
}

setWithdrawal()

async function setWithdrawal() {
  try {
    const { data } = await FiatService.getRate()
    withdrawal.rate = data.withdrawal_rate
    withdrawal.max = data.withdraw_max
    withdrawal.min = data.withdraw_min
  } catch {}
}

async function setSecretQuestions() {
  try {
    const { data } = await UserService.secretQuestion()

    questionOptions.value = data.map((d) => ({
      label: d.name,
      value: d.id
    }))
  } catch {}
}
</script>

<style scoped></style>
