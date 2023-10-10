<template>
  <BaseHeader :title="$t('PageReferral.ReferralQRcode')" />

  <div class="p-5 pt-0">
    <div class="shadow-inner-dark-v-1 rounded-3xl pt-20 pb-8 mt-20">
      <BaseIcon
        name="multiple-users-dark"
        class="absolute -top-[52px] left-0 right-0 mx-auto"
        render-as-image
      />

      <p class="text-center py-4 font-bold text-size-4">
        {{ $t('PageReferral.ScanQRcode') }}
      </p>

      <QrCode
        ref="qrCodeRef"
        icon="logo-square-yellow"
        :value="address"
      />

      <p class="text-orange-v-1 text-center pt-10 font-bold">
        {{ $t('PageReferral.ReferralLink') }} :
      </p>

      <p class="text-center px-6 pt-4 break-words">{{ address }}</p>
    </div>

    <div class="flex gap-12 justify-center gap pt-3 pb-10">
      <div class="flex flex-col gap-2 items-center">
        <div
          class="flex items-center justify-center w-[48px] h-[48px] bg-orange-v-1 rounded-full"
        >
          <BaseIcon
            name="save"
            render-as-image
            @click="onClickSave"
          />
        </div>

        <p class="text-size-1">{{ $t('PageReferral.SaveImage') }}</p>
      </div>

      <div class="flex flex-col gap-2 items-center">
        <div
          class="flex items-center justify-center w-[48px] h-[48px] bg-orange-v-1 rounded-full"
        >
          <BaseIcon
            name="copy"
            width="15"
            height="16"
            render-as-image
            class="fill-white-v-1"
            @click="onClickCopy(address)"
          />
        </div>

        <p class="text-size-1">{{ $t('PageReferral.CopyAddress') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'
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

function onClickSave() {
  qrCodeRef.value.saveAsImage('referral-qr-code')
}
</script>

<style scoped></style>
