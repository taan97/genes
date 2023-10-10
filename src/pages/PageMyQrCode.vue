<template>
  <BaseHeader :title="$t('PageMyQrCode.Title')" />

  <div class="px-5">
    <div class="rounded-3xl pt-20">
      <QrCode
        ref="qrCodeRef"
        icon="logo-yellow"
        :value="address"
      />

      <p class="text-white-1 text-center pt-6 font-bold">
        {{ $t('PageMyQrCode.ReferralLink') }} :
      </p>

      <p class="text-center px-6 pt-4 break-words underline">{{ address }}</p>
    </div>

    <div class="flex gap-5 justify-center gap pt-14">
      <button
        type="button"
        class="w-[10rem] items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center"
        @click="onClickShare(null, address)"
      >
        <BaseIcon
          name="referral"
          width="18"
          height="19"
          class="absolute fill-orange-1"
        />

        <p>{{ $t('PageMyQrCode.Share') }}</p>
      </button>

      <button
        type="button"
        class="w-[10rem] items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center"
        @click="onClickCopy(address)"
      >
        <BaseIcon
          name="copy"
          width="15"
          height="16"
          class="absolute fill-orange-1"
        />

        <p>{{ $t('PageMyQrCode.CopyLink') }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores'
import {
  copyText as onClickCopy,
  share as onClickShare
} from '@/utils/shared-methods.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const address = computed(() => {
  const origin = window.location.origin
  const referralRoute = router.resolve({
    name: 'PageSignUpForm',
    query: {
      referral: userStore.id
    }
  })
  return `${origin}${referralRoute.href}`
})

const qrCodeRef = ref(null)
</script>

<style scoped></style>
