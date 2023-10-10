<template>
  <BaseHeader
    :title="$t('PageMyAccountRefundGcrUnits.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <h2 class="flex justify-between items-center py-4">
        <p class="text-white-1 font-bold">
          {{ $t('PageMyAccountRefundGcrUnits.GcrShares') }}
        </p>
        <p class="text-orange-1 font-bold">
          {{ $formatUnits(detail.total) }}
        </p>
      </h2>

      <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 pb-6">
        <p class="text-white-1">
          {{ $t('PageMyAccountRefundGcrUnits.DateTime') }}
        </p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all">
          {{ $formatDateTime(detail.time) }}
        </p>

        <p class="text-white-1">
          {{ $t('PageMyAccountRefundGcrUnits.PaidAmount') }}
        </p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all">
          {{ $formatCurrency(detail.paidAmount) }} USDT
        </p>
      </div>
    </template>
  </BaseHeader>

  <BaseForm
    ref="refundFormRef"
    class="p-8 flex flex-1 flex-col gap-6"
    @submitted="onSubmitRefund"
  >
    <BaseFormInputText
      v-model="refundForm.amount"
      v-debounce="setRedeemEstimation"
      type="digit"
      name="amount"
      :placeholder="$t('PageMyAccountRefundGcrUnits.InputAmount')"
      :rules="refundFormRules.amount"
    >
      <template #left-icon>
        <BaseIcon name="gcrblack" />
      </template>
      <template #right-icon>
        <button
          type="button"
          class="uppercase text-black-1 underline"
          @click="onClickMax"
        >
          {{ $t('Button.Max') }}
        </button>
      </template>
    </BaseFormInputText>

    <div>
      <p class="text-white-1">
        {{ $t('PageMyAccountRefundGcrUnits.EstYourRefundAmount') }} :
        <span class="text-black-1">
          {{ $formatCurrency(estimatedRefundableAmount.amount) }} USDT
        </span>
      </p>

      <p
        v-if="Number(estimatedRefundableAmount.price) > 0"
        class="text-white-1"
      >
        {{ $t('PageMyAccountRefundGcrUnits.Price') }} :
        <span class="text-black-1">
          {{ $formatCurrency(estimatedRefundableAmount.price) }} USDT
        </span>
      </p>
    </div>

    <BaseFormInputText
      v-model="refundForm.reason"
      name="reason"
      :rules="refundFormRules.reason"
      rows="5"
      autosize
      type="textarea"
      maxlength="100"
      :placeholder="$t('PageMyAccountRefundGcrUnits.ReasonDescription')"
      show-word-limit
      class="!text-black-1 rounded-xl border-2 border-black-1"
    />

    <fieldset class="flex gap-4">
      <BaseFormInputText
        v-model="refundForm.countryCode"
        readonly
        :formatter="(v) => `+${v}`"
        class="!w-[95px]"
        container-class="!w-min"
        @click="isCountryDropdownVisible = true"
      >
        <template #left-icon>
          <BaseIcon name="mobile" />
        </template>
        <template #right-icon>
          <BaseIcon
            name="arrow-down"
            width="14"
            class="fill-black-1"
          />
        </template>
      </BaseFormInputText>

      <BaseFormInputText
        v-model="refundForm.phoneNumber"
        name="phoneNumber"
        :placeholder="$t('PageMyAccountRefundGcrUnits.MobilePhoneNumber')"
        :rules="refundFormRules.phoneNumber"
      />
    </fieldset>

    <BaseFormInputText
      v-model="refundForm.email"
      name="email"
      :placeholder="$t('PageMyAccountRefundGcrUnits.Email')"
      :rules="refundFormRules.email"
    >
      <template #left-icon>
        <BaseIcon
          name="email"
          width="13"
          height="11"
        />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="refundForm.trcAddress"
      name="trcAddress"
      class="!overflow-visible"
      :placeholder="$t('PageMyAccountRefundGcrUnits.InputAddress')"
      :rules="refundFormRules.trcAddress"
    >
      <template #left-icon>
        <BaseIcon name="tron" />
      </template>
      <template #right-icon>
        <QrCodeScanner @succeeded="(e) => (refundForm.trcAddress = e)" />
      </template>
    </BaseFormInputText>

    <BaseFormInputPassword
      v-model="refundForm.password"
      name="password"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.TransactionPassword')"
      :rules="refundFormRules.password"
    >
      <template #left-icon>
        <BaseIcon name="security-verify" />
      </template>
    </BaseFormInputPassword>

    <BaseFormInputDropdown
      v-model="refundForm.question"
      name="question"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.SecurityQuestion')"
      :rules="refundFormRules.question"
      :options="questionOptions"
      :title="$t('PageMyAccountWithdrawalUsdt.SelectQuestion')"
    >
      <template #left-icon>
        <BaseIcon name="securityq" />
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="refundForm.answer"
      name="answer"
      :placeholder="$t('PageMyAccountWithdrawalUsdt.SecurityAnswer')"
      :rules="refundFormRules.answer"
    >
      <template #left-icon>
        <BaseIcon name="answer" />
      </template>
      <template #right-icon>
        <BaseIcon name="arrow-down" />
      </template>
    </BaseFormInputText>

    <div class="mt-6">
      <p class="text-red-1 font-bold">
        {{ $t('PageMyAccountRefundGcrUnits.PleaseNote') }}
      </p>
      <p class="whitespace-pre-line">
        {{ $t('PageMyAccountRefundGcrUnits.Note') }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        type="button"
        class="rounded-full py-3 text-orange-1 text-center bg-black-1 shadow-outer-orange-dark-1 border-gradient-1"
        @click="$router.go(-1)"
      >
        <span class="font-bold text-size-5">{{ $t('Button.Cancel') }}</span>
      </button>

      <button
        type="submit"
        class="rounded-full py-3 text-orange-1 text-center bg-white-1 shadow-outer-orange-dark-1 border-gradient-dark-1"
      >
        <span class="font-bold text-size-5">{{ $t('Button.Submit') }}</span>
      </button>
    </div>
  </BaseForm>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (refundForm.countryCode = e)"
  />
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import investmentService from '@/services/investment-service.js'
import { useI18n } from 'vue-i18n'
import { $formatCurrency } from '@/plugins/global-methods'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal'
import UserService from '@/services/user-service.js'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const detail = route.query
const isCountryDropdownVisible = ref(false)
const refundFormRef = ref(null)
const estimatedRefundableAmount = ref({
  amount: 0,
  num: 0,
  price: 0
})

const refundForm = reactive({
  amount: '',
  reason: '',
  phoneNumber: '',
  countryCode: '',
  email: '',
  trcAddress: '',
  password: '',
  question: '',
  answer: ''
})

const refundFormRules = ref({
  amount: [
    'required',
    {
      validator: (v) => v >= 1 && v <= Number(detail.total),
      message: () =>
        t('ValidationMessage.MustBeBetween', {
          min: $formatCurrency(1),
          max: $formatCurrency(detail.total)
        })
    }
  ],
  phoneNumber: ['required'],
  email: ['required', 'email'],
  trcAddress: ['required'],
  password: ['password'],
  question: ['required'],
  answer: ['required']
})

const questionOptions = ref([])

setSecretQuestions()

async function setSecretQuestions() {
  try {
    const { data } = await UserService.secretQuestion()

    questionOptions.value = data.map((d) => ({
      label: d.name,
      value: d.id
    }))
  } catch {}
}

async function onClickMax() {
  refundForm.amount = String(Number(detail.total) || 0)
  await nextTick()
  refundFormRef.value?.formInputs.amount.forceValidate()
  setRedeemEstimation()
}

async function onSubmitRefund() {
  const Modal = useConfirmModal()

  try {
    if (Number(estimatedRefundableAmount.value.price) > 0) {
      await Modal.open({
        headerIcon: 'dollar-sign',
        message: t('PageMyAccountRefundGcrUnits.RefundConfirmModalMessage'),
        confirmText: t('PageMyAccountRefundGcrUnits.RefundConfirmModalButton')
      })
    }

    await investmentService.refund({
      order_no: detail.order_no,
      amount: refundForm.amount,
      address: refundForm.trcAddress,
      phone: refundForm.phoneNumber,
      email: refundForm.email,
      reason: refundForm.reason,
      password: refundForm.password,
      question: refundForm.question,
      answer: refundForm.answer
    })
    router.go(-1)
  } catch {}
}

async function setRedeemEstimation() {
  try {
    const res = await investmentService.getRedeemEstimation({
      amount: refundForm.amount,
      order_no: detail.order_no
    })
    estimatedRefundableAmount.value = res.data
  } catch {}
}
</script>

<style scoped></style>
