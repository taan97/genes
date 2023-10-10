<template>
  <BaseHeader :back-option="{ name: 'PageStart' }" />

  <div class="relative px-5 pb-5 flex flex-1 flex-col">
    <OnlineHelpDesk
      class="absolute -top-10 right-2 w-min whitespace-nowrap self-end flex flex-col items-center gap-1"
    >
      <template #button>
        <BaseIcon
          name="livechat"
          fill="var(--root-black-1)"
          min-height="22px"
        />
        <span class="underline">
          {{ $t('PageSignIn.LiveChat') }}
        </span>
      </template>
    </OnlineHelpDesk>

    <BaseIcon
      name="logo-big"
      class="place-self-center mx-auto"
      min-height="196px"
    />

    <h1 class="text-size-8 font-bold text-black-2 text-start mt-3 mb-6">
      {{ $t('PageSignIn.Title') }}
    </h1>

    <BaseForm
      ref="formRef"
      class="flex-1 flex flex-col gap-5"
      @submitted="onSubmitSignIn"
    >
      <BaseFormInputText
        v-model="userForm.username"
        name="username"
        :placeholder="$t('PageSignIn.Username')"
        :rules="userFormRules.username"
      >
        <template #left-icon>
          <BaseIcon name="user" />
        </template>
      </BaseFormInputText>

      <BaseFormInputPassword
        v-model="userForm.password"
        name="password"
        :placeholder="$t('PageSignIn.Password')"
        :rules="userFormRules.password"
      >
        <template #left-icon>
          <BaseIcon name="password" />
        </template>
      </BaseFormInputPassword>

      <fieldset class="flex items-center gap-2">
        <BaseFormInputText
          v-model="userForm.captcha"
          name="captcha"
          :placeholder="$t('PageSignIn.Captcha')"
          :rules="userFormRules.captcha"
        >
          <template #left-icon>
            <BaseIcon name="captcha" />
          </template>
        </BaseFormInputText>

        <div>
          <van-image
            width="120px"
            height="36px"
            :src="captchaUrl"
          />
        </div>

        <button
          type="button"
          @click="() => setCaptcha()"
        >
          <BaseIcon name="reload" />
        </button>
      </fieldset>

      <div class="flex-1">
        <i18n-t
          v-if="accountDisabled"
          keypath="PageSignIn.FailToLoginOver5TimesMessage"
          tag="p"
          class="whitespace-pre text-red-1 text-size-2 italic"
          scope="global"
        >
          <template #contactCustomerService>
            <OnlineHelpDesk>
              <template #button>
                <span class="underline text-black-1 max-w-max">
                  {{ $t('PageSignIn.ContactOnlineCustomerService') }}
                </span>
              </template>
            </OnlineHelpDesk>
          </template>
        </i18n-t>
      </div>

      <button
        type="submit"
        class="items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      >
        <BaseIcon
          name="login"
          class="absolute fill-orange-1"
        />
        <span class="font-bold text-size-5">{{ $t('Button.Login') }}</span>
      </button>
    </BaseForm>
    <router-link
      :to="{ name: 'PageResetPassword' }"
      class="underline w-min whitespace-nowrap self-center my-4"
    >
      {{ $t('PageSignIn.ResetPassword') }}
    </router-link>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const formRef = ref(null)

const token = route.query.token

if (token) {
  userStore.handleSignIn(token)
}

const userForm = reactive({
  username: '',
  password: '',
  key: '',
  captcha: ''
})

const captchaUrl = ref('')
const accountDisabled = ref(false)

const userFormRules = {
  username: ['required'],
  password: ['password'],
  captcha: ['required']
}

setCaptcha()

async function setCaptcha() {
  try {
    const { data } = await AuthService.getCaptcha()
    userForm.key = data.key
    captchaUrl.value = data.img
  } catch {}
}

async function onSubmitSignIn() {
  try {
    const res = await AuthService.signIn(userForm)

    if (res.code === 2) {
      accountDisabled.value = true
      throw new Error()
    }

    await userStore.handleSignIn(res.data)
  } catch {
    setCaptcha()
  }
}
</script>

<style scoped></style>
