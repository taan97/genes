<template>
  <BaseHeader v-if="status === FAIL_VERIFY" />

  <div class="flex-1 pt-[7rem] flex flex-col gap-10 pb-10 px-6">
    <BaseIcon
      :name="statusMap[status].icon"
      class="self-center"
    />

    <h1 class="text-size-9 text-black-1 font-semibold text-center">
      {{ $t(statusMap[status].title) }}
    </h1>

    <p class="flex-1 text-center text-size-5">
      {{ statusMap[status].message && $t(statusMap[status].message) }}
    </p>

    <button
      type="button"
      class="rounded-full py-3 px-10 text-orange-1 font-bold text-size-5 text-center shadow-outer-orange-dark-1 border-gradient-1"
      @click="statusMap[status].goTo"
    >
      {{ $t(statusMap[status].buttonText) }}
    </button>
  </div>
</template>

<script setup>
import { VERIFICATION_STATUS } from '@/utils/const.js'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { UNDER_REVIEW, FAIL_VERIFY } = VERIFICATION_STATUS
const status = computed(() => route.meta.status ?? UNDER_REVIEW)

const statusMap = {
  [UNDER_REVIEW]: {
    icon: 'reviewing',
    title: 'PageIdentityVerification.VerificationUnderReviewTitle',
    message: 'PageIdentityVerification.VerificationUnderReviewMessage',
    buttonText: 'Button.Ok',
    goTo: () => router.go(-1)
  },

  [FAIL_VERIFY]: {
    icon: 'failed-verify',
    title: 'PageIdentityVerification.VerificationFailedTitle',
    buttonText: 'Button.TryAgain',
    goTo: () =>
      router.replace({
        name: 'PageIdentityVerificationFirstStep',
        params: { retry: true }
      })
  }
}
</script>

<style scoped></style>
