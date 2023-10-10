<template>
  <BaseActionSheet
    v-model:show="isVisible"
    class="px-4 !pb-4"
  >
    <template #content>
      <div
        class="flex gap-2 items-center pb-3 border-b border-orange-3 text-white-1 mb-4"
      >
        <div
          class="font-bold text-size-4 rounded-full bg-orange-1 w-[26px] h-[26px] leading-[26px] text-center uppercase"
        >
          {{ firstSellerNameCharacter }}
        </div>
        <span class="flex-1 font-bold">
          {{ props.sellerName }}
        </span>
      </div>

      <div class="flex text-white-1">
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
          name="usdt"
          render-as-image
          width="40"
          height="40"
          class="ml-auto"
        />
      </div>

      <BaseForm
        ref="formRef"
        class="text-white-1"
        @submitted="onSubmitPlaceOrder"
      >
        <fieldset class="mt-4 pb-3 border-b border-orange-3">
          <BaseFormInputText
            ref="quantityInputRef"
            v-model="form.quantity"
            name="quantity"
            :rules="formRules.quantity"
            type="number"
            light-theme
            class="mt-3 text-white-1"
          >
            <template #right-icon>
              <span class="text-white-1 mr-2 border-r border-black-4">
                USDT
              </span>

              <button
                type="button"
                class="text-orange-1 underline"
                @click="onClickSetMax"
              >
                {{ $t('PageOtc.BuyAll') }}
              </button>
            </template>
          </BaseFormInputText>

          <p class="text-size-2 leading-4 mt-6">
            {{ $t('PageOtc.Limit') }} {{ props.limitMin }} -
            {{ props.limitMax }}
          </p>

          <p class="text-size-2 leading-4 mt-4 flex justify-between">
            <span>{{ $t('PageOtc.Quantity') }}</span>
            <span class="text-orange-1">{{ form.quantity }}</span>
          </p>
        </fieldset>

        <p class="text-size-2 leading-4 mt-4 flex justify-between">
          <span>{{ $t('PageOtc.RealPayment') }}</span>
          <span class="text-size-4 text-orange-1 font-semibold leading-5">
            {{ $formatCurrency(totalAmount) }} {{ otcStore.currency }}
          </span>
        </p>

        <fieldset class="grid grid-flow-col gap-4 mt-10">
          <button
            type="button"
            class="border-gradient-1 rounded-full text-orange-1 text-size-5 p-2"
            style="--bg-color: var(--root-black-2)"
            @click="isVisible = false"
          >
            {{ currentInSeconds + 's' }}
            {{ $t('PageOtc.ButtonAutomaticallyCancelAfter') }}
          </button>

          <button
            type="submit"
            class="border-gradient-1 rounded-full text-white-1 text-size-5 p-2"
            style="--bg-color: var(--root-black-2)"
          >
            {{ $t('PageOtc.ButtonPlaceAnOrder') }}
          </button>
        </fieldset>
      </BaseForm>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountDown } from '@vant/use'
import OtcService from '@/services/otc-service.js'
import { useOtcStore } from '@/stores'

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

const { t } = useI18n()

const otcStore = useOtcStore()
const formRef = ref(null)
const quantityInputRef = ref(null)

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
      quantityInputRef.value.$el.querySelector('input').focus()
    }
  },
  { immediate: true }
)

function clearOrderFormState() {
  form.quantity = ''
  formRef.value?.clearValidation()
  formRef.value?.markAsUnTouched()
  countDown.reset()
}

function onClickSetMax() {
  form.quantity = Math.min(props.limitMax, props.remain)
  formRef.value?.clearValidation()
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
