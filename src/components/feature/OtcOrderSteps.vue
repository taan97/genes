<template>
  <div>
    <ul class="flex gap-1 bg-black-2">
      <li
        v-for="step in steps"
        :key="step.value"
        class="flex-1 text-size-2 font-semibold rounded-md w-full py-2 text-center"
        :class="
          props.currentStep >= step.value ? 'text-white-1' : 'text-orange-1'
        "
      >
        {{ step.label }}
      </li>
    </ul>

    <ul class="steps-wrapper flex flex-row text-center pb-4 bg-black-2">
      <li
        v-for="step in steps"
        :key="step.value"
        class="relative w-full"
        :class="props.currentStep >= step.value ? 'active' : ''"
      />
    </ul>

    <div class="flex items-center bg-black-opacity-1 px-6 py-4 text-white-1">
      <template v-if="props.currentStep === OTC_ORDER_STEP.CONFIRM">
        <div>
          <h3 class="text-size-4">{{ $t('PageOtc.StepConfirmOrderTitle') }}</h3>

          <p class="text-size-2">
            {{ $t('PageOtc.StepConfirmOrderDescription') }}
            {{ displayTimeLeftInConfirmation }}
          </p>
        </div>

        <div class="flex h-[36px] w-[36px] bg-orange-1 rounded-full ml-auto">
          <span class="m-auto text-[22px] font-bold">{{
            otcStore.order.merchant_name[0] || ''
          }}</span>
        </div>
      </template>

      <div v-else-if="props.currentStep === OTC_ORDER_STEP.PAY">
        <h3 class="text-size-4">
          {{ $t('PageOtc.StepTransferMoneyToSellerTitle') }}
        </h3>

        <p class="text-size-2">
          {{ $t('PageOtc.StepTransferMoneyToSellerDescription') }}
          {{ displayTimeLeftInConfirmation }}
        </p>
      </div>

      <template v-else-if="props.currentStep === OTC_ORDER_STEP.SELLER_CONFIRM">
        <div>
          <h3 class="text-size-4">
            {{ $t('PageOtc.StepSellerConfirmedTitle') }}
          </h3>
        </div>

        <CircularCountdownTimer
          class="ml-auto"
          :time-left-in-seconds="props.timeLeftToAppealInSeconds"
          @finished="emit('payment-time-expired')"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCountDown } from '@vant/use'
import { useI18n } from 'vue-i18n'
import { OTC_ORDER_STEP } from '@/utils/const'
import CircularCountdownTimer from './CircularCountdownTimer.vue'
import { useOtcStore } from '@/stores'

const props = defineProps({
  currentStep: {
    type: Number,
    default: OTC_ORDER_STEP.CONFIRM
  },

  timeLeftToCancelInSeconds: {
    type: [String, Number],
    required: true
  },

  timeLeftToAppealInSeconds: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['confirmation-time-expired', 'payment-time-expired'])

const { t } = useI18n()
const otcStore = useOtcStore()

const steps = computed(() => ({
  [OTC_ORDER_STEP.CONFIRM]: {
    label: t('PageOtc.StepConfirmOrderTitle'),
    value: OTC_ORDER_STEP.CONFIRM
  },

  [OTC_ORDER_STEP.PAY]: {
    label: t('PageOtc.StepTransferMoneyToSeller'),
    value: OTC_ORDER_STEP.PAY
  },

  [OTC_ORDER_STEP.SELLER_CONFIRM]: {
    label: t('PageOtc.StepSellerConfirmed'),
    value: OTC_ORDER_STEP.SELLER_CONFIRM
  }
}))

const currentTimePassedInSeconds = ref('')
const displayTimeLeftInConfirmation = ref('')

const totalTimeLeftInMilliseconds = computed(() => {
  return props.timeLeftToCancelInSeconds * 1000
})

const countDown = useCountDown({
  time: totalTimeLeftInMilliseconds.value,

  onChange: ({ minutes, seconds }) => {
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')
    displayTimeLeftInConfirmation.value = `${mm}:${ss}`

    currentTimePassedInSeconds.value =
      (props.timeoutInMinutes - minutes) * 60 - seconds
  },

  onFinish: () => {
    if (
      props.currentStep === OTC_ORDER_STEP.CONFIRM ||
      props.currentStep === OTC_ORDER_STEP.PAY
    ) {
      emit('confirmation-time-expired')
    }
  }
})

countDown.start()
</script>

<style scoped>
.steps-wrapper li:before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: var(--root-white-1);
  top: 11px;
  left: 45%;
  z-index: 1;
}

.steps-wrapper > li.active:before {
  background: var(--root-orange-1);
}

.steps-wrapper > li:after {
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--root-white-2);
  top: 14px;
  left: -52%;
}
.steps-wrapper > li.active:after {
  background: var(--root-orange-1);
}

.steps-wrapper > li:first-child.active:after {
  background: transparent;
}
</style>
