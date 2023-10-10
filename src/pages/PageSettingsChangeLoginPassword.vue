<template>
  <BaseHeader :title="$t('PageSettingsChangeLoginPassword.Title')" />

  <BaseIcon
    name="logo-big"
    class="place-self-center mx-auto"
  />

  <BaseForm
    ref="formRef"
    class="flex-1 flex flex-col gap-8 p-5 pb-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputPassword
      v-model="form.currentPassword"
      name="currentPassword"
      :placeholder="$t('PageSettingsChangeLoginPassword.CurrentPassword')"
      :rules="formRules.currentPassword"
    >
      <template #left-icon>
        <BaseIcon name="password" />
      </template>
    </BaseFormInputPassword>

    <BaseFormInputPassword
      v-model="form.newPassword"
      name="newPassword"
      :placeholder="$t('PageSettingsChangeLoginPassword.CreatePassword')"
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
      :placeholder="$t('PageSettingsChangeLoginPassword.ConfirmPassword')"
      :rules="formRules.confirmNewPassword"
    >
      <template #left-icon>
        <BaseIcon name="lock-checkmark" />
      </template>
    </BaseFormInputPassword>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full py-3 px-4 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="change-login-password"
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

import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'

const { t } = useI18n()
const userStore = useUserStore()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const formRules = {
  currentPassword: ['password'],
  newPassword: ['password'],
  confirmNewPassword: [
    {
      validator: (v) => v === form.newPassword,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ]
}

const formRef = ref(null)

async function doSubmitted() {
  try {
    await AuthService.changePassword(form)
    userStore.handleSignOut()
  } catch {}
}
</script>

<style scoped></style>
