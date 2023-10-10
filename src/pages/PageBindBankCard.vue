<template>
  <BaseHeader :title="$t('PageBindBankCard.Title')" />

  <BaseForm
    class="flex-1 flex flex-col gap-7 p-5 pb-10"
    @submitted="doSubmitted"
  >
    <!-- <BaseFormInputDropdown
      v-model="bindForm.country"
      name="country"
      :placeholder="$t('PageBindBankCard.SelectCountry')"
      :rules="bindFormRules.country"
      :options="countryOptions"
      :title="$t('PageBindBankCard.SelectCountry')"
    >
      <template #left-icon>
        <BaseIcon name="globe" />
      </template>
    </BaseFormInputDropdown> -->

    <BaseFormInputDropdown
      v-model="bindForm.bankId"
      name="bankId"
      :placeholder="$t('PageBindBankCard.SelectBankName')"
      :rules="bindFormRules.bankId"
      :options="bankOptions"
      :title="$t('PageBindBankCard.SelectBankName')"
    >
      <template #left-icon>
        <BaseIcon name="bank" />
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="bindForm.bankAccountName"
      name="bankAccountName"
      :placeholder="$t('PageBindBankCard.BankAccountName')"
      :rules="bindFormRules.bankAccountName"
    >
      <template #left-icon>
        <BaseIcon name="user" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="bindForm.bankCardNumber"
      name="bankCardNumber"
      :placeholder="$t('PageBindBankCard.BankCardNumber')"
      :rules="bindFormRules.bankCardNumber"
    >
      <template #left-icon>
        <BaseIcon name="dark-card" />
      </template>
    </BaseFormInputText>

    <fieldset>
      <BaseFormInputPassword
        v-model="bindForm.transactionPassword"
        name="transactionPassword"
        :placeholder="$t('PageBindBankCard.TransactionPassword')"
        :rules="bindFormRules.transactionPassword"
      >
        <template #left-icon>
          <BaseIcon name="security-verify" />
        </template>
      </BaseFormInputPassword>

      <router-link
        :to="{ name: 'PageSettingsChangeTransactionPassword' }"
        class="float-right mt-2 underline"
      >
        {{ $t('PageBindBankCard.ForgotPassword') }}
      </router-link>
    </fieldset>

    <BaseFormInputDropdown
      v-model="bindForm.questionId"
      name="questionId"
      :placeholder="$t('PageBindBankCard.ChooseSecurityQuestion')"
      :rules="bindFormRules.questionId"
      :options="questionOptions"
      :title="$t('PageBindBankCard.ChooseSecurityQuestion')"
    >
      <template #left-icon>
        <BaseIcon name="securityq" />
      </template>
    </BaseFormInputDropdown>

    <fieldset>
      <BaseFormInputPassword
        v-model="bindForm.answer"
        name="answer"
        :placeholder="$t('PageBindBankCard.SecurityAnswer')"
        :rules="bindFormRules.answer"
      >
        <template #left-icon>
          <BaseIcon name="securitya" />
        </template>
      </BaseFormInputPassword>

      <router-link
        :to="{ name: 'PageResetSecurityQuestion' }"
        class="float-right mt-2 underline"
      >
        {{ $t('PageBindBankCard.ForgotAnswer') }}
      </router-link>
    </fieldset>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full w-full bg-black-1 p-3 border-gradient-1 shadow-outer-orange-dark-1"
    >
      <div class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageBindBankCard.Bind') }}
      </div>
      <BaseIcon
        name="bind"
        class="absolute top-0 bottom-0 my-auto"
      />
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

import UserService from '@/services/user-service.js'
import FiatService from '@/services/fiat-service'
import { useRouter } from 'vue-router'
// import countryJson from '@/assets/country_code.json'

const router = useRouter()

const bankOptions = ref([])
const questionOptions = ref([])

const bindForm = reactive({
  // country: '',
  bankId: '',
  bankAccountName: '',
  bankCardNumber: '',
  transactionPassword: '',
  questionId: '',
  answer: ''
})

const bindFormRules = {
  // country: ['required'],
  bankId: ['required'],
  bankAccountName: ['required'],
  bankCardNumber: ['required'],
  transactionPassword: ['password'],
  questionId: ['required'],
  answer: ['required']
}

// const countryOptions = countryJson.map((c) => ({
//   label: c.native_name,
//   value: c.alpha_2
// }))

setSecretQuestions()
setBankOptions()

async function doSubmitted() {
  try {
    await FiatService.bindBankCard(bindForm)
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

async function setBankOptions() {
  try {
    const res = await FiatService.getBanks()
    bankOptions.value = res.data.map((d) => ({
      label: d.bank,
      value: d.id
    }))
  } catch {}
}
</script>

<style scoped></style>
