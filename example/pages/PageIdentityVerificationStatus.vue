<template>
  <BaseHeader :number-of-step-back="numberOfStepBack" />

  <div class="flex-1 pt-[7rem] flex flex-col gap-10 items-center pb-10 px-6">
    <BaseIcon :name="statusMap[status].icon" />

    <h1
      class="text-size-8 font-bold text-center"
      :class="statusMap[status].titleClass"
    >
      {{ $t(statusMap[status].title) }}
    </h1>

    <p class="flex-1 text-center">
      {{ statusMap[status].message && $t(statusMap[status].message) }}
    </p>

    <button
      class="text-size-5 font-bold rounded-[8px] w-[18rem] py-2 px-4 bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1"
      @click="onClick"
    >
      {{ $t(statusMap[status].buttonText) }}
    </button>
  </div>
</template>

<script setup>
import { IDENTITY_VERIFICATION } from '@/utils/const.js'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { STATE } = IDENTITY_VERIFICATION
const status = ref(route.meta.status ?? STATE.UNDER_REVIEW)

const statusMap = {
  [STATE.SUCCESS_VERIFIED]: {
    icon: 'verified',
    title: 'PageIdentityVerification.VerificationSuccessTitle',
    titleClass: 'text-orange-v-1',
    buttonText: 'Button.Ok',
    goToRouteName: null
  },

  [STATE.UNDER_REVIEW]: {
    icon: 'underreview',
    title: 'PageIdentityVerification.VerificationUnderReviewTitle',
    titleClass: 'text-orange-v-1',
    message: 'PageIdentityVerification.VerificationUnderReviewMessage',
    buttonText: 'Button.Ok',
    goToRouteName: null
  },

  [STATE.FAIL_VERIFY]: {
    icon: 'failed',
    title: 'PageIdentityVerification.VerificationFailedTitle',
    titleClass: 'text-red-v-1',
    buttonText: 'Button.TryAgain',
    goToRouteName: 'PageIdentityVerificationFirstStep'
  }
}

const numberOfStepBack = computed(() => {
  const history = router.options.history.state

  if (history.back?.includes('/identity-verification')) return -3
  return -1
})

function onClick() {
  const options = {
    name: statusMap[status.value].goToRouteName ?? 'PageUserProfile'
  }
  if (status.value === STATE.FAIL_VERIFY) options.params = { retry: true }

  router.push(options)
}
</script>

<style scoped></style>
