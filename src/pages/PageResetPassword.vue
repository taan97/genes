<template>
  <BaseHeader />

  <div class="p-5 pb-10 flex-1 flex flex-col">
    <BaseIcon
      name="logo-big"
      class="place-self-center mx-auto"
      render-as-image
    />

    <h1 class="text-size-8 font-bold text-black-2 text-start mt-3 mb-6">
      {{ $t('PageResetPassword.Title') }}
    </h1>

    <BaseForm
      ref="formRef"
      class="flex-1 flex flex-col gap-6"
      @submitted="onSubmitForm"
    >
      <BaseFormInputText
        v-model="userInfo.email"
        name="email"
        :rules="userFormRules.email"
        :placeholder="$t('PageResetPassword.Email')"
      >
        <template #left-icon>
          <BaseIcon name="email" />
        </template>
      </BaseFormInputText>

      <BaseFormInputPassword
        v-model="userInfo.password"
        name="password"
        :rules="userFormRules.password"
        :placeholder="$t('PageResetPassword.CreatPassword')"
        @blur="formRef?.formInputs.confirmPassword.validate()"
      >
        <template #left-icon>
          <BaseIcon name="lock-no-bg" />
        </template>
      </BaseFormInputPassword>

      <BaseFormInputPassword
        v-model="userInfo.confirmPassword"
        name="confirmPassword"
        :placeholder="$t('PageResetPassword.ReEnterPassword')"
        :rules="userFormRules.confirmPassword"
      >
        <template #left-icon>
          <BaseIcon name="lock-checkmark" />
        </template>
      </BaseFormInputPassword>

      <fieldset class="flex gap-3 items-end">
        <BaseFormInputText
          v-model="userInfo.emailVerificationCode"
          name="emailVerificationCode"
          :placeholder="$t('PageResetPassword.EmailVerificationCode')"
          :rules="userFormRules.emailVerificationCode"
        >
          <template #left-icon>
            <BaseIcon name="email-verify" />
          </template>
        </BaseFormInputText>

        <ButtonGetCode
          :email="userInfo.email"
          :type="EMAIL_VERIFICATION_CODE_TYPE.FORGOT_PASSWORD"
          @empty-email-detected="() => formRef.formInputs.email.forceValidate()"
        />
      </fieldset>

      <div class="flex-1" />

      <button
        type="submit"
        class="items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center"
      >
        <BaseIcon
          name="save"
          fill="orange-1"
          class="absolute"
        />
        <p class="font-bold text-size-5">{{ $t('Button.Save') }}</p>
      </button>
    </BaseForm>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import AuthService from '@/services/auth-service'
import { EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const.js'

const { t } = useI18n()
const router = useRouter()

const formRef = ref(null)

const userInfo = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailVerificationCode: ''
})

const userFormRules = {
  email: ['required', 'email'],
  password: ['password'],
  confirmPassword: [
    {
      validator: (v) => v === userInfo.password,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  emailVerificationCode: ['required']
}

async function onSubmitForm() {
  try {
    await AuthService.forgotPassword(userInfo)
    router.push({ name: 'PageSignIn' })
  } catch {}
}
</script>

<style scoped></style>
