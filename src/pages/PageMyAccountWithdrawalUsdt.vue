<template>
  <BaseHeader :title="$t('PageMyAccountWithdrawalUsdt.Title')" />

  <BaseForm
    ref="withdrawalFormRef"
    class="flex-1 flex flex-col gap-8 p-5"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="withdrawalForm.trcAddress"
      name="trcAddress"
      class="!overflow-visible"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.InputAddress')"
      :rules="withdrawalFormRules.trcAddress"
    >
      <template #left-icon>
        <BaseIcon name="tron" />
      </template>
      <template #right-icon>
        <QrCodeScanner @succeeded="(e) => (withdrawalForm.trcAddress = e)" />
      </template>
    </BaseFormInputText>

    <fieldset>
      <BaseFormInputText
        v-model="withdrawalForm.amount"
        name="amount"
        type="number"
        :formatter="(v) => v.replace(/(\.\d{2})\d+/g, '$1')"
        :placeholder="$t('PageMyAccountWithdrawalUsdt.InputAmount')"
        :rules="withdrawalFormRules.amount"
      >
        <template #left-icon>
          <BaseIcon name="usdt-plain" />
        </template>
        <template #right-icon>
          <button
            type="button"
            class="uppercase text-black-1 underline"
            @click="
              withdrawalForm.amount = String(Number(walletStore.wallet.usd))
            "
          >
            {{ $t('Button.Max') }}
          </button>
        </template>
      </BaseFormInputText>

      <p class="text-white-1 pt-6">
        {{ $t('PageMyAccountWithdrawalUsdt.AvailableAmount') }}:
        {{ $formatCurrency(walletStore.wallet.usd) }} USDT
      </p>
    </fieldset>

    <BaseFormInputPassword
      v-model="withdrawalForm.password"
      name="password"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.TransactionPassword')"
      :rules="withdrawalFormRules.password"
    >
      <template #left-icon>
        <BaseIcon name="security-verify" />
      </template>
    </BaseFormInputPassword>

    <BaseFormInputDropdown
      v-model="withdrawalForm.question"
      name="question"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.SecurityQuestion')"
      :rules="withdrawalFormRules.question"
      :options="questionOptions"
      :title="$t('PageMyAccountWithdrawalUsdt.SelectQuestion')"
    >
      <template #left-icon>
        <BaseIcon name="securityq" />
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="withdrawalForm.answer"
      name="answer"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.SecurityAnswer')"
      :rules="withdrawalFormRules.answer"
    >
      <template #left-icon>
        <BaseIcon name="answer" />
      </template>
      <template #right-icon>
        <BaseIcon name="arrow-down" />
      </template>
    </BaseFormInputText>

    <div class="grid grid-cols-[auto_auto_1fr] gap-1">
      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalUsdt.WithdrawalAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">{{ $formatCurrency(withdrawalForm.amount) }} USDT</p>

      <p class="text-white-1">
        {{
          $t('PageMyAccountWithdrawalUsdt.AdminFee', {
            number: walletStore.wallet.fee_rate
          })
        }}%
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(adminFee) }}
      </p>

      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalUsdt.NetworkFee') }}
      </p>
      <p>:</p>
      <p class="break-all">{{ $formatCurrency(NETWORK_FEE) }} USDT</p>

      <p class="text-white-1">
        {{ $t('PageMyAccountWithdrawalUsdt.ReceiveAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">{{ $formatCurrency(receiveAmount) }}</p>
    </div>

    <div>
      <p class="text-red-1 font-bold">
        {{ $t('PageMyAccountWithdrawalUsdt.Important') }}
      </p>
      <p class="flex-1 whitespace-pre-line">
        {{ $t('PageMyAccountWithdrawalUsdt.Notes') }}
      </p>
    </div>

    <button
      type="submit"
      class="relative rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="withdrawal-fiat"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Withdraw') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import UserService from '@/services/user-service.js'
import { useWalletStore } from '@/stores'
import WalletService from '@/services/wallet-service'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { $formatCurrency } from '@/plugins/global-methods'

const { t } = useI18n()
const router = useRouter()
const walletStore = useWalletStore()
walletStore.setWallet()

const MINIMUM_WITHDRAW_AMOUNT = 50

const withdrawalForm = reactive({
  trcAddress: '',
  amount: '',
  password: '',
  question: '',
  answer: ''
})

const withdrawalFormRules = {
  trcAddress: ['required'],
  amount: [
    'required',
    {
      validator: (v) =>
        v >= MINIMUM_WITHDRAW_AMOUNT && v <= Number(walletStore.wallet.usd),
      message: () =>
        t('ValidationMessage.MustBeBetween', {
          min: MINIMUM_WITHDRAW_AMOUNT,
          max: $formatCurrency(walletStore.wallet.usd)
        })
    }
  ],
  password: ['password'],
  question: ['required'],
  answer: ['required']
}

const withdrawalFormRef = ref(null)

const questionOptions = ref([])

const NETWORK_FEE = 1

const adminFee = computed(
  () => (withdrawalForm.amount * walletStore.wallet.fee_rate) / 100
)

const receiveAmount = computed(
  () =>
    withdrawalForm.amount * (1 - walletStore.wallet.fee_rate / 100) -
    NETWORK_FEE
)

setSecretQuestions()

async function doSubmitted() {
  try {
    await WalletService.usdtWithdraw(withdrawalForm)
    router.go(-1)
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
