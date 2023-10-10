<template>
  <BaseActionSheet v-model:show="isVisible">
    <template #content>
      <div
        class="flex items-center bottom-4 pb-3 border-b border-black-v-4 text-white-v-1"
      >
        <div
          class="font-bold text-size-4 rounded-full bg-green-v-3 w-[26px] h-[26px] leading-[26px] text-center uppercase"
        >
          {{ firstSellerNameCharacter }}
        </div>
        <span class="flex-1 text-size-3 font-bold">
          {{ props.sellerName }}
        </span>
      </div>

      <div class="flex text-white-v-1">
        <div>
          <p class="text-size-5 font-semibold mb-2">
            {{ $t('PageOtc.BuyUsdt') }}
          </p>

          <p class="text-size-2 font-medium mb-1">
            {{ $t('PageOtc.UnitPrice') }} {{ props.unitPrice }}
            {{ otcStore.currency }}
          </p>

          <p>
            {{ $t('PageOtc.Quantity') }} {{ props.availableAmount }}
            {{ $formatCurrency(props.remain) }} USDT
          </p>
        </div>

        <BaseIcon
          name="usdticon"
          render-as-image
          class="ml-auto"
        />
      </div>

      <form
        class="text-white-v-1"
        @submit.prevent="onSubmitPlaceOrder"
      >
        <div class="mt-4 pb-3 border-b border-black-v-4">
          <BaseInputText
            :ref="setFieldRef('quantity')"
            v-model="form.quantity"
            :rules="formRules.quantity"
            type="number"
            class="mt-3"
          >
            <template #right-icon>
              <span class="text-size-3 mr-2 border-r border-black-v-4">
                USDT
              </span>

              <button
                type="button"
                class="text-yellow-v-1 text-size-2 underline"
                @click="onClickSetMax"
              >
                {{ $t('PageOtc.BuyAll') }}
              </button>
            </template>
          </BaseInputText>

          <p class="text-size-2 leading-4 mt-6">
            {{ $t('PageOtc.Limit') }} {{ props.limitMin }} -
            {{ props.limitMax }}
          </p>

          <p class="text-size-2 leading-4 mt-4">
            <span>{{ $t('PageOtc.Quantity') }}</span>
            <span class="float-right">{{ form.quantity }}</span>
          </p>
        </div>

        <p class="text-size-2 leading-4 mt-4">
          <span>{{ $t('PageOtc.RealPayment') }}</span>
          <span class="text-size-4 font-semibold leading-5 float-right">
            {{ $formatCurrency(totalAmount) }} {{ otcStore.currency }}
          </span>
        </p>

        <div class="grid grid-flow-col gap-4 mt-10">
          <button
            type="button"
            class="bg-gradient-orange shadow-outer-orange-v-1 rounded-[10px] p-2 font-bold text-size-5 text-center"
            @click="isVisible = false"
          >
            {{ currentInSeconds }}s
            {{ $t('PageOtc.ButtonAutomaticallyCancelAfter') }}
          </button>

          <button
            type="submit"
            class="rounded-[10px] p-2 font-bold text-size-5 text-center"
            :class="submitButtonStyle"
          >
            {{ $t('PageOtc.ButtonPlaceAnOrder') }}
          </button>
        </div>
      </form>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import { useCountDown } from '@vant/use'
import OtcService from '@/services/otc-service.js'
import { useOtcStore } from '@/stores'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  /* eslint-disable vue/require-default-prop */
  sellerName: String,
  orderNumber: String,
  unitPrice: String,
  limitMin: String,
  limitMax: String,
  remain: String
  /* eslint-enable vue/require-default-prop */
})

const emit = defineEmits(['update:show', 'submitted'])

const otcStore = useOtcStore()

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const TOTAL_COUNTDOWN_IN_SECONDS = 60

const currentInSeconds = ref(TOTAL_COUNTDOWN_IN_SECONDS)

const firstSellerNameCharacter = computed(() => props.sellerName[0] || '')

const form = reactive({
  quantity: ''
})

const formRules = {
  quantity: [
    {
      validator: (v) =>
        v >= Number(props.limitMin) && v <= Number(props.limitMax),
      message: () =>
        t('ValidationMessage.AmountNeedInLimitRange', {
          range: `${props.limitMin}-${props.limitMax}`
        })
    }
  ]
}

const {
  fieldRefs,
  setFieldRef,
  getValidationStatus,
  clearValidation,
  markAsUnTouched
} = useFormValidation(formRules)

const isReadyToSubmit = computed(() => {
  return getValidationStatus()
})

const submitButtonStyle = computed(() =>
  isReadyToSubmit.value
    ? 'bg-gradient-orange shadow-outer-orange-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none'
)

const totalAmount = computed(() =>
  Number(form.quantity * props.unitPrice).toFixed(2)
)

const countDown = useCountDown({
  time: TOTAL_COUNTDOWN_IN_SECONDS * 1000,

  onChange: ({ seconds }) => {
    currentInSeconds.value = seconds
  },

  onFinish: () => {
    currentInSeconds.value = TOTAL_COUNTDOWN_IN_SECONDS
    isVisible.value = false
  }
})

watch(
  isVisible,
  async (newValue) => {
    if (newValue) {
      clearOrderFormState()
      countDown.start()
      await nextTick()
      fieldRefs.quantity.$el.querySelector('input').focus()
    }
  },
  { immediate: true }
)

function clearOrderFormState() {
  form.quantity = ''
  clearValidation()
  markAsUnTouched()
  countDown.reset()
}

function onClickSetMax() {
  form.quantity = Math.min(props.limitMax, props.remain)
  clearValidation()
}

async function onSubmitPlaceOrder() {
  try {
    const { data: tradeNumber } = await OtcService.placeOrder(
      props.orderNumber,
      form.quantity
    )
    emit('submitted', tradeNumber)
  } catch {}
}
</script>

<style scoped></style>
