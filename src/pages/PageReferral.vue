<template>
  <BaseHeader class="!bg-none !bg-black-2 text-white-1">
    <template #sub-header>
      <BaseIcon
        name="logo-orange"
        class="mx-auto -mt-5"
      />

      <p class="text-center font-bold text-size-4 mt-4">
        {{ $t('PageReferral.Slogan') }}
      </p>
    </template>
  </BaseHeader>

  <QrCode
    icon="logo-yellow"
    :value="address"
    class="my-5"
  />

  <p class="text-orange-v-1 text-center text-size-4 font-bold">
    {{ $t('PageReferral.ScanToRegister') }}
  </p>

  <p
    class="text-center mx-auto my-3 p-2 break-words max-w-max rounded-full border border-black-1"
  >
    {{ address }}
  </p>

  <button
    type="button"
    class="mx-auto flex gap-4 items-center rounded-full py-2 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1 max-w-max"
    @click="onClickCopy(address)"
  >
    <BaseIcon
      name="copy"
      class="fill-orange-1"
    />
    <p class="underline font-bold">
      {{ $t('PageReferral.CopyRegistrationLink') }}
    </p>
  </button>

  <p class="text-size-5 text-white-1 font-bold text-center mt-5">
    {{ $t('PageReferral.MyReferralID') }}
  </p>

  <p
    class="text-size-4 underline text-center mt-1 flex gap-2 items-center justify-center mb-10"
  >
    <span>GR {{ userStore.id }}</span>

    <BaseIcon
      name="copy"
      class="fill-white-1"
      @click="onClickCopy(userStore.id)"
    />
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const address = computed(() => {
  const origin = window.location.origin
  const referralRoute = router.resolve({
    name: 'PageSignUpForm'
  })
  return `${origin}${referralRoute.href}`
})
</script>

<style scoped></style>
