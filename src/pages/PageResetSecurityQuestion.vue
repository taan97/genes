<template>
  <BaseHeader :title="$t('PageResetSecurityQuestion.Title')" />

  <div class="px-5 pb-10 flex flex-col flex-1">
    <BaseIcon
      name="logo-big"
      class="place-self-center mx-auto"
    />

    <BaseForm
      ref="securityFormRef"
      class="flex-1 flex flex-col gap-6 my-4"
      @submitted="onSubmitSecurityForm"
    >
      <BaseFormInputText
        v-model="userStore.email"
        readonly
      >
        <template #left-icon>
          <BaseIcon
            name="email"
            width="13"
            height="11"
          />
        </template>
      </BaseFormInputText>

      <BaseFormInputDropdown
        v-model="securityForm.question"
        name="question"
        :placeholder="$t('PageResetSecurityQuestion.QuestionPlaceholder')"
        :rules="securityFormRules.question"
        :options="questionOptions"
        :title="$t('PageResetSecurityQuestion.SelectQuestion')"
      >
        <template #left-icon>
          <BaseIcon name="securityq" />
        </template>
      </BaseFormInputDropdown>

      <BaseFormInputText
        v-model="securityForm.answer"
        name="answer"
        :placeholder="$t('PageResetSecurityQuestion.AnswerPlaceholder')"
        :rules="securityFormRules.answer"
      >
        <template #left-icon>
          <BaseIcon name="securitya" />
        </template>
      </BaseFormInputText>

      <fieldset class="flex gap-4 items-center">
        <BaseFormInputText
          v-model="securityForm.emailVerificationCode"
          name="emailVerificationCode"
          :placeholder="
            $t('PageResetSecurityQuestion.EmailVerficationPlaceholder')
          "
          :rules="securityFormRules.emailVerificationCode"
        >
          <template #left-icon>
            <BaseIcon name="email-verify" />
          </template>
        </BaseFormInputText>

        <ButtonGetCode @clicked="doClickedSendCode" />
      </fieldset>

      <div class="flex-1" />

      <button
        type="submit"
        class="relative rounded-full w-full bg-black-1 p-3 border-gradient-1 shadow-outer-orange-dark-1"
      >
        <div class="text-orange-1 text-size-5 font-bold">
          {{ $t('Button.Save') }}
        </div>
        <BaseIcon
          name="security-reset-question"
          class="absolute top-0 bottom-0 my-auto"
        />
      </button>
    </BaseForm>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const'
import AuthService from '@/services/auth-service'
import UserService from '@/services/user-service.js'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()

const questionOptions = ref([])

const securityForm = reactive({
  email: userStore.email,
  emailVerificationCode: '',
  question: '',
  answer: ''
})

const securityFormRules = {
  emailVerificationCode: ['required'],
  question: ['required'],
  answer: ['required']
}

const securityFormRef = ref(null)

setSecretQuestions()

async function onSubmitSecurityForm() {
  try {
    await UserService.changeSecurityQuestion(securityForm)
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

async function doClickedSendCode(startCountdown) {
  try {
    await AuthService.sendCodeToUserEmail(
      EMAIL_VERIFICATION_CODE_TYPE.SECURITY_QUESTION
    )
    startCountdown()
  } catch {}
}
</script>

<style scoped></style>
