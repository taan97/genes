<template>
  <BaseHeader :title="$t('PageBindingValidator.BindingValidator')" />

  <div class="p-5">
    <div class="shadow-inner-dark-v-1 rounded-3xl pb-8">
      <p class="text-center py-5 font-bold text-size-4">
        {{ $t('PageBindingValidator.ScanQRCode') }}
      </p>

      <QrCode
        ref="qrCodeRef"
        :value="address"
      />

      <p class="text-orange-v-1 text-center pt-10 font-bold">
        {{ $t('PageBindingValidator.SecretKey') }}
      </p>

      <p class="text-center px-6 pt-4 break-words">{{ secret }}</p>
    </div>

    <div class="flex pt-3 gap-12 justify-center">
      <div
        class="flex items-center justify-center h-full bg-orange-v-1 rounded-full p-4"
      >
        <BaseIcon
          name="save"
          @click="onClickSave"
        />
      </div>

      <div
        class="flex items-center justify-center h-full bg-orange-v-1 rounded-full p-4"
      >
        <BaseIcon
          name="copy"
          width="15"
          height="16"
          class="fill-white-v-1"
          @click="onClickCopy(secret)"
        />
      </div>
    </div>

    <form
      class="flex flex-col gap-7 mt-6"
      @submit.prevent="onSubmitBinding"
    >
      <BaseInputPassword
        v-model="authenticatorCode"
        :placeholder="
          $t('PageBindingValidator.EnterTheGoogleAuthenticatorCode')
        "
      >
        <template #left-icon>
          <BaseIcon
            name="google-authenticator"
            render-as-image
          />
        </template>
      </BaseInputPassword>

      <button
        v-toggle-active-state="Boolean(authenticatorCode)"
        type="submit"
        class="self-center rounded-lg w-[18rem] py-2 px-4 mb-6"
      >
        <BaseIcon
          name="unbind"
          class="absolute left-0 ml-3.5 top-0 bottom-0 my-auto"
        />

        <div class="text-size-5 font-bold">{{ $t('Button.Bind') }}</div>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import UserCenterService from '@/services/user-center-service'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()

const address = ref('')
const secret = ref('')
const authenticatorCode = ref('')
const qrCodeRef = ref(null)

getGoogleAuthentication()

function onClickSave() {
  qrCodeRef.value.saveAsImage('binding-qr-code')
}

async function onSubmitBinding() {
  const data = {
    secret: secret.value,
    key: authenticatorCode.value
  }
  try {
    await UserCenterService.bind2Factor(data)
    handleBindingSuccess()
  } catch {}
}

async function handleBindingSuccess() {
  await userStore.setUser({ replace: true })
  router.replace({ name: 'PageUserProfile' })
}

async function getGoogleAuthentication() {
  try {
    const res = await UserCenterService.getGoogleAuthentication()
    address.value = res.data.url
    secret.value = res.data.secret
  } catch {}
}
</script>

<style></style>
