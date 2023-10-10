<template>
  <BaseHeader :title="$t('PageSettingsChangeTransactionPassword.Title')" />

  <BaseIcon
    name="logo-big"
    class="place-self-center mx-auto"
  />

  <BaseForm
    ref="formRef"
    class="flex-1 flex flex-col gap-8 p-5 pb-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="userStore.email"
      readonly
    >
      <template #left-icon>
        <BaseIcon name="email" />
      </template>
    </BaseFormInputText>

    <BaseFormInputPassword
      v-model="form.newPassword"
      name="newPassword"
      :placeholder="$t('PageSettingsChangeTransactionPassword.CreatePassword')"
      :rules="formRules.newPassword"
      @blur="() => formRef.formInputs.confirmNewPassword.validate()"
    >
      <template #left-icon>
        <BaseIcon name="password" />
      </template>
    </BaseFormInputPassword>

    <BaseFormInputPassword
      v-model="form.confirmNewPassword"
      name="confirmNewPassword"
      :placeholder="$t('PageSettingsChangeTransactionPassword.ConfirmPassword')"
      :rules="formRules.confirmNewPassword"
    >
      <template #left-icon>
        <BaseIcon name="lock-checkmark" />
      </template>
    </BaseFormInputPassword>

    <fieldset class="flex gap-4 items-center">
      <BaseFormInputText
        v-model="form.emailVerificationCode"
        name="emailVerificationCode"
        :placeholder="
          $t('PageSettingsChangeTransactionPassword.EmailVerficationCode')
        "
        :rules="formRules.emailVerificationCode"
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
      class="relative rounded-full py-3 px-4 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="change-transaction-password"
        width="26"
        height="26"
        class="absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Save') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import UserService from '@/services/user-service.js'
import AuthService from '@/services/auth-service'
import { useRouter } from 'vue-router'
import { EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const'
import { useUserStore } from '@/stores'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  email: userStore.email,
  newPassword: '',
  confirmNewPassword: '',
  emailVerificationCode: ''
})

const formRules = {
  newPassword: ['password'],
  confirmNewPassword: [
    {
      validator: (v) => v === form.newPassword,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  emailVerificationCode: ['required']
}

const formRef = ref(null)

async function doSubmitted() {
  try {
    await UserService.changeTransactionPassword(form)
    router.go(-1, { name: 'PageSettings' })
  } catch {}
}

async function doClickedSendCode(startCountdown) {
  try {
    await AuthService.sendCodeToUserEmail(
      EMAIL_VERIFICATION_CODE_TYPE.TRANSACTION_PASSWORD
    )
    startCountdown()
  } catch {}
}
</script>

<style scoped></style>
