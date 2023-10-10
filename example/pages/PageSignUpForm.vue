<template>
  <div class="p-5 pt-12">
    <SignUpSuccess v-if="isSignUpSuccessful" />

    <template v-else>
      <h1 class="text-size-5 mt-16 mb-1">{{ $t('PageSignUp.Title') }}</h1>
      <p class="text-orange-v-1">{{ $t('PageSignUp.Description') }}</p>

      <BaseForm
        ref="signUpFormRef"
        class="flex-1 flex flex-col gap-7 my-6"
        @submitted="onSubmitSignUpForm"
      >
        <BaseInputText
          v-model="userForm.username"
          name="username"
          :placeholder="$t('PageSignUp.FieldUsername')"
          :rules="userFormRules.username"
        >
          <template #left-icon>
            <BaseIcon name="user" />
          </template>
        </BaseInputText>

        <BaseInputText
          v-model="userForm.email"
          name="email"
          :placeholder="$t('PageSignUp.FieldEmail')"
          :rules="userFormRules.email"
        >
          <template #left-icon>
            <BaseIcon name="email" />
          </template>
        </BaseInputText>

        <BaseInputText
          v-model="userForm.emailVerificationCode"
          name="emailVerificationCode"
          :placeholder="$t('PageSignUp.FieldEmailVerificationCode')"
          :rules="userFormRules.emailVerificationCode"
        >
          <template #left-icon>
            <BaseIcon name="email-verify" />
          </template>

          <template #right-icon>
            <ButtonGetCode
              :email="userForm.email"
              :type="EMAIL_VERIFICATION_CODE_TYPE.SIGN_UP"
            />
          </template>
        </BaseInputText>

        <BaseInputText
          v-model="userForm.phoneNumber"
          name="phoneNumber"
          :placeholder="$t('PageSignUp.FieldPhoneNumber')"
          :rules="userFormRules.phoneNumber"
        >
          <template #left-icon>
            <button
              type="button"
              class="min-w-[54px] px-2 flex justify-around items-center rounded-md bg-black-v-3"
              @click="isCountryDropdownVisible = true"
            >
              <span class="text-white-v-1">+ {{ userForm.countryCode }}</span>
              <BaseIcon
                name="arrow-down"
                width="14"
              />
            </button>
          </template>
        </BaseInputText>

        <BaseInputPassword
          v-model="userForm.password"
          name="password"
          :placeholder="$t('PageSignUp.FieldCreatePassword')"
          :rules="userFormRules.password"
          @blur="signUpFormRef.formInputs.confirmPassword.validate()"
        >
          <template #left-icon>
            <BaseIcon name="lock-plus" />
          </template>
        </BaseInputPassword>

        <BaseInputPassword
          v-model="userForm.confirmPassword"
          name="confirmPassword"
          :placeholder="$t('PageSignUp.FieldReEnterPassword')"
          :rules="userFormRules.confirmPassword"
        >
          <template #left-icon>
            <BaseIcon name="lock-checkmark" />
          </template>
        </BaseInputPassword>

        <BaseInputText
          v-model="userForm.invitationCode"
          name="invitationCode"
          :placeholder="$t('PageSignUp.FieldInvitationCode')"
          :rules="userFormRules.invitationCode"
        >
          <template #left-icon>
            <BaseIcon name="multiple-users-dot" />
          </template>
        </BaseInputText>

        <BaseInputCheckbox
          v-model="termsCheckbox"
          class="m-2"
        >
          <i18n-t
            keypath="PageSignUp.CheckboxTerms"
            tag="p"
            scope="global"
          >
            <template #terms>
              <router-link
                class="underline text-orange-v-1 font-bold"
                :to="{ name: 'PageSignUpTerm' }"
                @click.stop
              >
                {{ $t('PageSignUp.Terms') }}
              </router-link>
            </template>
          </i18n-t>
        </BaseInputCheckbox>

        <button
          v-toggle-active-state="
            termsCheckbox && signUpFormRef?.getValidationStatus
          "
          type="submit"
          class="mt-auto self-center rounded-lg w-[18rem] py-1 px-4"
        >
          <div class="text-size-5 font-bold">{{ $t('Button.SignUp') }}</div>
          <BaseIcon
            name="login"
            class="absolute top-0 bottom-0 my-auto"
          />
        </button>
      </BaseForm>

      <i18n-t
        keypath="PageSignUp.LinkToSignIn"
        tag="p"
        scope="global"
        class="text-center mb-6"
      >
        <template #signIn>
          <router-link
            class="underline text-orange-v-1 font-bold"
            :to="{ name: 'PageSignIn' }"
          >
            {{ $t('PageSignUp.SignIn') }}
          </router-link>
        </template>
      </i18n-t>
    </template>
  </div>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (userForm.countryCode = e)"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AuthService from '@/services/auth-service.js'
import { setItemToStorage } from '@/utils/storage-adapter'
import { STORAGE_KEY, EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const isCountryDropdownVisible = ref(false)

const userForm = reactive({
  username: '',
  email: '',
  phoneNumber: '',
  countryCode: '',
  emailVerificationCode: '',
  password: '',
  confirmPassword: '',
  invitationCode: route.query.referral ?? ''
})

const userFormRules = {
  username: ['between6And12Characters'],
  email: ['email'],
  phoneNumber: ['required'],
  emailVerificationCode: ['required'],
  password: ['password'],
  confirmPassword: [
    {
      validator: (v) => v === userForm.password,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  invitationCode: ['required']
}

const signUpFormRef = ref(null)
const termsCheckbox = ref(false)

const isSignUpSuccessful = ref(false)

async function onSubmitSignUpForm() {
  try {
    const res = await AuthService.signUp(userForm)

    setItemToStorage(STORAGE_KEY.TOKEN, res.data.token)
    isSignUpSuccessful.value = true
  } catch {}
}
</script>

<style scoped></style>
