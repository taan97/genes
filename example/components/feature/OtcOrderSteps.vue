<template>
  <div class="bg-black-v-1 shadow-inner-dark-input rounded-lg p-2">
    <ul class="flex gap-1">
      <li
        v-for="step in steps"
        :key="step.value"
        class="flex-1 text-size-2 font-semibold shadow-inner-dark-v-1 rounded-md w-full py-2 text-center"
        :class="
          props.currentStep >= step.value ? 'bg-yellow-v-1' : 'bg-black-v-5'
        "
      >
        {{ step.label }}
      </li>
    </ul>

    <ul class="steps-wrapper flex flex-row text-center pb-9">
      <li
        v-for="step in steps"
        :key="step.value"
        class="relative w-full"
        :class="props.currentStep >= step.value ? 'active' : ''"
      ></li>
    </ul>

    <div
      class="flex items-center bg-black-v-5 shadow-inner-dark-v-1 rounded-md px-3 py-4"
    >
      <template v-if="props.currentStep === OTC_ORDER_STEP.CONFIRM">
        <div>
          <h3 class="text-size-4">{{ $t('PageOtc.StepConfirmOrderTitle') }}</h3>

          <p class="text-size-2">
            {{ $t('PageOtc.StepConfirmOrderDescription') }}
            {{ displayTimeLeftInConfirmation }}
          </p>
        </div>

        <div class="flex h-[36px] w-[36px] bg-green-v-3 rounded-full ml-auto">
          <span class="m-auto text-[22px] font-bold">S</span>
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

const { t } = useI18n()

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

const emit = defineEmits(['confirmation-time-expired', 'payment-time-expired'])

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
  content: ' ';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: var(--root-gradient-dark);
  top: 10px;
  left: 45%;
  z-index: 1;
}

.steps-wrapper > li.active:before {
  background: var(--root-gradient-orange);
}

.steps-wrapper > li:after {
  content: ' ';
  position: absolute;
  height: 1px;
  width: 100%;
  background: var(--root-black-v-4);
  top: 13px;
  left: -52%;
}
.steps-wrapper > li.active:after {
  background: var(--root-gradient-orange);
}

.steps-wrapper > li:first-child.active:after {
  background: transparent;
}
</style>
