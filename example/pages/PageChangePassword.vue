<template>
  <BaseHeader :title="$t('PageChangePassword.Title')" />

  <div class="p-5">
    <BaseIcon
      name="lock-question-mark"
      render-as-image
      class="mx-auto my-4"
    />

    <p class="text-center text-size-5 font-medium mt-5 mb-12">
      {{ $t('PageChangePassword.Description') }}
    </p>

    <BaseForm
      ref="userFormRef"
      class="flex-1 flex flex-col gap-7 my-6"
      @submitted="onSubmitSignUpForm"
    >
      <BaseInputPassword
        v-model="userForm.currentPassword"
        name="currentPassword"
        :rules="userFormRules.currentPassword"
        :placeholder="$t('PageChangePassword.EnterCurrentPassword')"
      >
        <template #left-icon>
          <BaseIcon name="lock"></BaseIcon>
        </template>
      </BaseInputPassword>

      <BaseInputPassword
        v-model="userForm.newPassword"
        name="newPassword"
        :rules="userFormRules.newPassword"
        :placeholder="$t('PageChangePassword.CreateNewPassword')"
        @blur="() => userFormRef?.formInputs.confirmNewPassword.validate()"
      >
        <template #left-icon>
          <BaseIcon name="lock-plus" />
        </template>
      </BaseInputPassword>

      <BaseInputPassword
        v-model="userForm.confirmNewPassword"
        name="confirmNewPassword"
        :rules="userFormRules.confirmNewPassword"
        :placeholder="$t('PageChangePassword.ConfirmNewPassword')"
      >
        <template #left-icon>
          <BaseIcon name="lock-checkmark" />
        </template>
      </BaseInputPassword>

      <button
        v-toggle-active-state="userFormRef?.getValidationStatus"
        type="submit"
        class="mt-auto mb-4 self-center rounded-lg w-[18rem] py-2 px-4"
      >
        <div class="text-size-5 font-bold">{{ $t('Button.Submit') }}</div>
      </button>
    </BaseForm>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'

const { t } = useI18n()
const userStore = useUserStore()

const userFormRef = ref(null)

const userForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const userFormRules = {
  currentPassword: ['password'],
  newPassword: ['password'],
  confirmNewPassword: [
    {
      validator: (v) => v === userForm.newPassword,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ]
}

async function onSubmitSignUpForm() {
  try {
    await AuthService.changePassword(userForm)
    userStore.handleSignOut()
  } catch {}
}
</script>

<style scoped></style>
