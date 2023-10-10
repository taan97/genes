<template>
  <BaseHeader
    :title="$t('PageShareCertificateConfirm.PaymentModalTitle')"
    class="bg-black-2 text-white-1"
    :back-option="{
      name: 'PageShareCertificateConfirm',
      params: $route.params
    }"
  >
    <template #sub-header>
      <h3 class="text-center text-size-5 text-white-1 font-bold">
        {{ $t('PageShareCertificateConfirm.PaymentModalAvailableAmount') }}
      </h3>
      <p class="text-center text-size-8 text-orange-1">
        {{ $formatCurrency(walletStore.wallet.usd) }} USDT
      </p>
    </template>
  </BaseHeader>

  <BaseForm
    class="flex-1 p-6 pb-10 flex flex-col gap-6"
    @submitted="doSubmitted"
  >
    <BaseFormInputPassword
      v-model="form.transactionPassword"
      name="transactionPassword"
      :placeholder="
        $t('PageShareCertificateConfirm.PaymentModalEnterTransactionPassword')
      "
      :rules="formRules.transactionPassword"
    >
      <template #left-icon>
        <BaseIcon name="security-verify" />
      </template>
    </BaseFormInputPassword>

    <BaseFormInputDropdown
      v-model="form.question"
      name="question"
      :placeholder="$t('PageResetSecurityQuestion.QuestionPlaceholder')"
      :rules="formRules.question"
      :options="questionOptions"
      :title="$t('PageResetSecurityQuestion.SelectQuestion')"
    >
      <template #left-icon>
        <BaseIcon name="securityq" />
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="form.answer"
      name="answer"
      :placeholder="$t('PageResetSecurityQuestion.AnswerPlaceholder')"
      :rules="formRules.answer"
    >
      <template #left-icon>
        <BaseIcon name="securitya" />
      </template>
    </BaseFormInputText>

    <div class="grid grid-cols-[auto_auto_1fr] gap-2 text-left mt-4">
      <p class="text-white-1">
        {{ $t('PageShareCertificateConfirm.PaymentModalApplicationFee') }}
      </p>
      <p>:</p>
      <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
      <p>100 USDT</p>

      <p class="text-white-1 mt-4">
        {{ $t('PageShareCertificateConfirm.PaymentModalTotalPayment') }}
      </p>
      <p class="mt-4">:</p>
      <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
      <p class="mt-4">100 USDT</p>
    </div>

    <div class="flex-1" />

    <button
      type="submit"
      class="w-full self-center rounded-full py-2 text-orange-1 text-center bg-black-1 border-gradient-1"
    >
      <span class="font-bold text-size-5">{{ $t('Button.Confirm') }}</span>
    </button>
  </BaseForm>
</template>

<script setup>
import { ref, reactive } from 'vue'
import UserService from '@/services/user-service.js'
import { useWalletStore } from '@/stores'
import userCenterService from '@/services/user-center-service'
import { useRoute, useRouter } from 'vue-router'

const walletStore = useWalletStore()
walletStore.setWallet()

const route = useRoute()
const router = useRouter()

const form = reactive({
  transactionPassword: '',
  question: '',
  answer: ''
})

const formRules = {
  transactionPassword: ['required'],
  question: ['required'],
  answer: ['required']
}

const questionOptions = ref([])

setSecretQuestions()

async function doSubmitted() {
  try {
    await userCenterService.orderCertificate({
      contactName: route.params.contactName,
      address: route.params.streetAddress,
      phone: route.params.countryPhoneCode + route.params.phoneNumber,
      postalCode: route.params.postalCode,
      city: route.params.city,
      country: route.params.countryCode,
      question: form.question,
      answer: form.answer,
      transactionPassword: form.transactionPassword
    })

    router.push({ name: 'PageShareCertificateList' })
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
