<template>
  <div class="p-5 pt-12">
    <div class="flex justify-end items-center gap-6 pb-7">
      <OnlineHelpDesk />
      <LanguageSelector />
    </div>

    <BaseIcon
      name="logo-with-text"
      class="mx-auto"
    />

    <h1 class="text-size-5 mb-1 mt-14">{{ $t('PageSignIn.Title') }}</h1>
    <p class="text-orange-v-1">{{ $t('PageSignIn.Description') }}</p>

    <form
      class="flex-1 flex flex-col gap-2 mt-5"
      @submit.prevent="onSubmitSignIn"
    >
      <BaseInputText
        :ref="setFieldRef('email')"
        v-model="userForm.email"
        :placeholder="$t('PageSignIn.Email')"
        :rules="userFormRules.email"
      >
        <template #left-icon>
          <BaseIcon name="email" />
        </template>
      </BaseInputText>

      <router-link
        :to="{ name: 'PageForgotPassword' }"
        class="mt-4 underline w-min whitespace-nowrap self-end"
      >
        {{ $t('PageSignIn.ForgotPassword') }}
      </router-link>

      <BaseInputPassword
        :ref="setFieldRef('password')"
        v-model="userForm.password"
        :placeholder="$t('PageSignIn.Password')"
        :rules="userFormRules.password"
      >
        <template #left-icon>
          <BaseIcon name="lock-plus" />
        </template>
      </BaseInputPassword>

      <div class="flex-1"></div>

      <button
        v-toggle-active-state="getValidationStatus()"
        type="submit"
        class="mt-8 self-center rounded-lg w-[18rem] py-1 px-4 font-bold text-size-5"
      >
        {{ $t('Button.SignIn') }}
        <BaseIcon
          name="login"
          class="absolute left-0 ml-3.5 top-0 bottom-0 my-auto"
        />
      </button>
    </form>

    <p class="text-center mt-5 mb-6">
      {{ $t('PageSignIn.NewToNordlys') }}
      <router-link
        :to="{ name: 'PageSignUpForm' }"
        class="underline text-orange-v-1"
      >
        {{ $t('PageSignIn.JoinNow') }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

const token = route.query.token

if (token) {
  userStore.handleSignIn(token)
}

const userForm = reactive({
  email: '',
  password: ''
})

const userFormRules = {
  email: ['email'],
  password: ['password']
}

const { setFieldRef, getValidationStatus } = useFormValidation(userFormRules)

async function onSubmitSignIn() {
  try {
    const res = await AuthService.signIn(userForm)
    await userStore.handleSignIn(res.data)
  } catch {}
}
</script>

<style scoped></style>
