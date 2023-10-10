<template>
  <BaseHeader />

  <div class="p-5">
    <BaseIcon
      name="forgotpasswordbig"
      class="place-self-center mx-auto"
      render-as-image
    />

    <p class="text-size-5 font-medium pt-6 text-center mb-1">
      {{ $t('PageForgotPassword.Title') }}
    </p>

    <p class="text-size-2 text-orange-v-1 text-center">
      {{ $t('PageForgotPassword.Description') }}
    </p>

    <form
      class="flex-1 flex flex-col gap-6 mt-8 mb-6"
      @submit.prevent="onSubmitForm"
    >
      <BaseInputText
        :ref="setFieldRef('email')"
        v-model="userInfo.email"
        :rules="userFormRules.email"
        :placeholder="$t('PageForgotPassword.Email')"
      >
        <template #left-icon>
          <BaseIcon name="email" />
        </template>
      </BaseInputText>

      <BaseInputPassword
        :ref="setFieldRef('password')"
        v-model="userInfo.password"
        :rules="userFormRules.password"
        :placeholder="$t('PageForgotPassword.CreatPassword')"
        @blur="() => fieldRefs.confirmPassword.validate()"
      >
        <template #left-icon>
          <BaseIcon name="lock-plus" />
        </template>
      </BaseInputPassword>

      <BaseInputPassword
        :ref="setFieldRef('confirmPassword')"
        v-model="userInfo.confirmPassword"
        :placeholder="$t('PageForgotPassword.ReEnterPassword')"
        :rules="userFormRules.confirmPassword"
      >
        <template #left-icon>
          <BaseIcon name="lock-checkmark" />
        </template>
      </BaseInputPassword>

      <BaseInputText
        :ref="setFieldRef('emailVerificationCode')"
        v-model="userInfo.emailVerificationCode"
        :placeholder="$t('PageForgotPassword.EmailVerificationCode')"
        :rules="userFormRules.emailVerificationCode"
      >
        <template #left-icon>
          <BaseIcon name="email-verify" />
        </template>

        <template #right-icon>
          <ButtonGetCode
            :email="userInfo.email"
            :type="EMAIL_VERIFICATION_CODE_TYPE.FORGOT_PASSWORD"
          />
        </template>
      </BaseInputText>

      <button
        v-toggle-active-state="getValidationStatus()"
        type="submit"
        class="mt-auto mb-4 w-[18rem] rounded-lg py-2 px-4 font-bold text-size-5 place-self-center"
      >
        {{ $t('Button.Confirm') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import AuthService from '@/services/auth-service'
import { EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const.js'

const { t } = useI18n()
const router = useRouter()

const userInfo = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailVerificationCode: ''
})

const userFormRules = {
  email: ['email'],
  password: ['password'],
  confirmPassword: [
    {
      validator: (v) => v === userInfo.password,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  emailVerificationCode: ['required']
}

const { fieldRefs, setFieldRef, getValidationStatus } =
  useFormValidation(userFormRules)

async function onSubmitForm() {
  try {
    await AuthService.forgotPassword(userInfo)
    router.push({ name: 'PageSignIn' })
  } catch {}
}
</script>

<style scoped></style>
