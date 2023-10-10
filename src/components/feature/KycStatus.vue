<template>
  <BaseHeader v-if="props.status === FAIL_VERIFY" />

  <div class="flex-1 pt-[7rem] flex flex-col gap-10 pb-10 px-6">
    <BaseIcon
      :name="statusMap[props.status].icon"
      class="self-center"
    />

    <h1 class="text-size-9 text-black-1 font-semibold text-center">
      {{ $t(statusMap[props.status].title) }}
    </h1>

    <p class="flex-1 text-center text-size-5">
      {{
        statusMap[props.status].message && $t(statusMap[props.status].message)
      }}
    </p>

    <button
      type="button"
      class="rounded-full py-3 px-10 text-orange-1 font-bold text-size-5 text-center shadow-outer-orange-dark-1 border-gradient-1"
      @click="statusMap[props.status].goTo"
    >
      {{ $t(statusMap[props.status].buttonText) }}
    </button>
  </div>
</template>

<script>
import { VERIFICATION_STATUS } from '@/utils/const.js'
const { FAIL_VERIFY, SUCCESS_VERIFIED, UNDER_REVIEW } = VERIFICATION_STATUS
</script>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  status: {
    type: [String, Number],
    default: SUCCESS_VERIFIED
  }
})

const emit = defineEmits(['retried'])

const router = useRouter()

const statusMap = {
  [SUCCESS_VERIFIED]: {
    icon: 'verified',
    title: 'PageKycVerification.StatusSuccessTitle',
    message: 'PageKycVerification.StatusSuccessDescription',
    buttonText: 'Button.Ok',
    goTo: () => router.go(-1)
  },
  [UNDER_REVIEW]: {
    icon: 'reviewing',
    title: 'PageKycVerification.StatusUnderReviewTitle',
    message: 'PageKycVerification.StatusUnderReviewMessage',
    buttonText: 'Button.Ok',
    goTo: () => router.go(-1)
  },
  [FAIL_VERIFY]: {
    icon: 'failed-verify',
    title: 'PageKycVerification.StatusFailedTitle',
    buttonText: 'Button.TryAgain',
    goTo: () => emit('retried')
  }
}
</script>

<style scoped></style>
