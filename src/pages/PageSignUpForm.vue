<template>
  <SignUpSuccess v-if="isSignUpSuccessful" />

  <template v-else>
    <BaseHeader :back-option="{ name: 'PageStart' }" />

    <div class="p-5">
      <h1 class="text-size-8 font-bold mb-1">{{ $t('PageSignUp.Title') }}</h1>

      <BaseForm
        ref="signUpFormRef"
        class="flex-1 flex flex-col gap-7 my-6"
        @submitted="onSubmitSignUpForm"
      >
        <fieldset class="flex gap-4">
          <BaseFormInputText
            v-model="userForm.lastName"
            type="text"
            name="lastName"
            :formatter="(v) => v.replace(/\d/g, '')"
            :placeholder="$t('PageSignUp.FieldLastName')"
            :rules="userFormRules.lastName"
          >
            <template #left-icon>
              <BaseIcon name="last-name" />
            </template>
          </BaseFormInputText>

          <BaseFormInputText
            v-model="userForm.firstName"
            type="text"
            name="firstName"
            :formatter="(v) => v.replace(/\d/g, '')"
            :placeholder="$t('PageSignUp.FieldFirstName')"
            :rules="userFormRules.firstName"
          />
        </fieldset>

        <BaseFormInputText
          v-model="userForm.username"
          name="username"
          :formatter="(v) => v.replace(/\W|_/g, '')"
          :placeholder="$t('PageSignUp.FieldUsername')"
          :rules="userFormRules.username"
        >
          <template #left-icon>
            <BaseIcon name="user" />
          </template>
        </BaseFormInputText>

        <BaseFormInputText
          v-model="userForm.email"
          name="email"
          :placeholder="$t('PageSignUp.FieldEmail')"
          :rules="userFormRules.email"
        >
          <template #left-icon>
            <BaseIcon name="email" />
          </template>
        </BaseFormInputText>

        <fieldset class="flex gap-4 items-center">
          <BaseFormInputText
            v-model="userForm.emailVerificationCode"
            name="emailVerificationCode"
            :placeholder="$t('PageSignUp.FieldEmailVerificationCode')"
            :rules="userFormRules.emailVerificationCode"
          >
            <template #left-icon>
              <BaseIcon name="email-verify" />
            </template>
          </BaseFormInputText>

          <ButtonGetCode
            :email="userForm.email"
            :type="EMAIL_VERIFICATION_CODE_TYPE.SIGN_UP"
            @empty-email-detected="
              () => signUpFormRef.formInputs.email.forceValidate()
            "
          />
        </fieldset>

        <fieldset class="flex gap-4">
          <BaseFormInputText
            v-model="userForm.countryCode"
            readonly
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
            v-model="userForm.phoneNumber"
            name="phoneNumber"
            type="digit"
            :formatter="(v) => v.replace(/^0/, '')"
            :placeholder="$t('PageSignUp.FieldPhoneNumber')"
            :rules="userFormRules.phoneNumber"
          />
        </fieldset>

        <BaseFormInputPassword
          v-model="userForm.password"
          name="password"
          :placeholder="$t('PageSignUp.FieldCreatePassword')"
          :rules="userFormRules.password"
          @blur="signUpFormRef.formInputs.confirmPassword.validate()"
        >
          <template #left-icon>
            <BaseIcon name="lock" />
          </template>
        </BaseFormInputPassword>

        <BaseFormInputPassword
          v-model="userForm.confirmPassword"
          name="confirmPassword"
          :placeholder="$t('PageSignUp.FieldReEnterPassword')"
          :rules="userFormRules.confirmPassword"
        >
          <template #left-icon>
            <BaseIcon name="lock-checkmark" />
          </template>
        </BaseFormInputPassword>

        <BaseFormInputPassword
          v-model="userForm.transactionPassword"
          name="transactionPassword"
          :placeholder="$t('PageSignUp.FieldCreateTransactionPassword')"
          :rules="userFormRules.transactionPassword"
          @blur="signUpFormRef.formInputs.confirmTransactionPassword.validate()"
        >
          <template #left-icon>
            <BaseIcon name="security" />
          </template>
        </BaseFormInputPassword>

        <BaseFormInputPassword
          v-model="userForm.confirmTransactionPassword"
          name="confirmTransactionPassword"
          :placeholder="$t('PageSignUp.FieldReEnterTransactionPassword')"
          :rules="userFormRules.confirmTransactionPassword"
        >
          <template #left-icon>
            <BaseIcon name="security-verify" />
          </template>
        </BaseFormInputPassword>

        <BaseFormInputDropdown
          v-model="userForm.question"
          name="question"
          :placeholder="$t('PageSignUp.FieldQuestionPlaceholder')"
          :rules="userFormRules.question"
          :options="questionOptions"
          :title="$t('PageSignUp.SelectQuestion')"
        >
          <template #left-icon>
            <BaseIcon name="securityq" />
          </template>
        </BaseFormInputDropdown>

        <BaseFormInputPassword
          v-model="userForm.answer"
          name="answer"
          :placeholder="$t('PageSignUp.FieldAnswerPlaceholder')"
          :rules="userFormRules.answer"
        >
          <template #left-icon>
            <BaseIcon name="securitya" />
          </template>
        </BaseFormInputPassword>

        <fieldset class="flex flex-col gap-10 mt-2">
          <BaseFormInputCheckbox
            v-model="termsCheckbox"
            name="terms"
            required
          >
            <i18n-t
              keypath="PageSignUp.CheckboxTerms"
              tag="p"
              scope="global"
            >
              <template #terms>
                <router-link
                  class="underline text-white-1"
                  :to="{ name: 'PageSignUpTerm' }"
                  @click.stop
                >
                  {{ $t('PageSignUp.Terms') }}
                </router-link>
              </template>
            </i18n-t>
          </BaseFormInputCheckbox>

          <button
            type="submit"
            class="relative rounded-full w-full bg-black-1 p-3 border-gradient-1 shadow-outer-orange-dark-1"
          >
            <div class="text-orange-1 text-size-5 font-bold">
              {{ $t('Button.SignUp') }}
            </div>
            <BaseIcon
              name="signup"
              class="absolute top-0 bottom-0 my-auto"
            />
          </button>
        </fieldset>
      </BaseForm>
    </div>
  </template>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (userForm.countryCode = e)"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AuthService from '@/services/auth-service.js'
import UserService from '@/services/user-service.js'

import { setItemToStorage, STORAGE_KEY } from '@/utils/storage-adapter'
import { EMAIL_VERIFICATION_CODE_TYPE } from '@/utils/const'

const { t } = useI18n()

const isCountryDropdownVisible = ref(false)
const isSignUpSuccessful = ref(false)
const questionOptions = ref([])

const userForm = reactive({
  lastName: '',
  firstName: '',
  username: '',
  email: '',
  phoneNumber: '',
  countryCode: '',
  emailVerificationCode: '',
  password: '',
  confirmPassword: '',
  transactionPassword: '',
  confirmTransactionPassword: '',
  question: '',
  answer: ''
})

const userFormRules = {
  lastName: ['required'],
  firstName: ['required'],
  username: ['between6And20Characters'],
  email: ['required', 'email'],
  phoneNumber: ['required'],
  emailVerificationCode: ['required'],
  password: ['password'],
  confirmPassword: [
    {
      validator: (v) => v === userForm.password,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  transactionPassword: ['password'],
  confirmTransactionPassword: [
    {
      validator: (v) => v === userForm.transactionPassword,
      message: () => t('ValidationMessage.PasswordsNotMatch')
    }
  ],
  question: [
    {
      validator: (v) => Boolean(v.length),
      message: () => t('ValidationMessage.SelectQuestion')
    }
  ],
  answer: ['required']
}

const signUpFormRef = ref(null)
const termsCheckbox = ref(false)

setSecretQuestions()

async function onSubmitSignUpForm() {
  if (!termsCheckbox.value) return

  try {
    const res = await AuthService.signUp(userForm)

    setItemToStorage(STORAGE_KEY.TOKEN, res.data.token)
    isSignUpSuccessful.value = true
    // TODO: sign up success
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
