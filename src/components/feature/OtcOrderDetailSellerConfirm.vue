<template>
  <CardOtcBuyItemDetail
    class="mb-4"
    :total-price="props.totalPrice"
    :price="props.price"
    :quantity="props.number"
    :order-number="props.tradeNumber"
    :payment-name="props.bankRealName"
    :payment-account="props.bankAccount"
    :payment-bank="props.bankName"
  />

  <div
    class="bg-black-opacity-1 text-white-1 px-6 py-4 mb-8 flex justify-between"
  >
    <p>{{ $t('PageOtc.SellerNickname') }}</p>
    <p>{{ props.merchantName }}</p>
  </div>

  <div class="flex gap-2 mt-auto mb-10 px-4">
    <OnlineHelpDesk class="basis-[52px] shadow-outer-orange-dark-1" />

    <button
      type="button"
      class="flex-1 rounded-full py-3 px-4 text-size-5 text-center text-orange-1 border-gradient-1 shadow-outer-orange-dark-1"
      @click="emit('cancelled')"
    >
      {{ $t('PageOtc.CancelOrder') }}
    </button>

    <button
      type="button"
      class="flex-1 rounded-full py-3 px-4 text-size-5 text-center"
      :class="appealButtonStyle"
      @click="isAppealFormVisible = true"
    >
      {{ $t('PageOtc.Appeal') }}
    </button>
  </div>

  <ActionSheetOtcAppealForm
    v-model:show="isAppealFormVisible"
    @submitted="doSubmittedAppeal"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

import OtcService from '@/services/otc-service'
import { useRoute } from 'vue-router'

const props = defineProps({
  disableAppeal: {
    type: Boolean,
    default: true
  },

  /* eslint-disable vue/require-default-prop */
  totalPrice: String,
  price: String,
  number: String,
  tradeNumber: String,
  bankRealName: String,
  bankAccount: String,
  bankName: String,
  merchantName: String
  /* eslint-enable vue/require-default-prop */
})

const emit = defineEmits(['cancelled', 'confirmed'])

const appealButtonStyle = computed(() =>
  props.disableAppeal
    ? 'bg-grey-5 text-grey-2 pointer-events-none'
    : 'text-orange-1 border-gradient-1 shadow-outer-orange-dark-1'
)

const route = useRoute()

const isAppealFormVisible = ref(false)

async function doSubmittedAppeal(form) {
  try {
    await OtcService.appealOrder({
      ...form,
      tradeNumber: route.params.id
    })
    emit('confirmed')
  } catch {}
}
</script>

<style scoped></style>
