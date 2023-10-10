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
    class="bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl p-4 mb-8 flex justify-between"
  >
    <p>{{ $t('PageOtc.SellerNickname') }}</p>
    <p>{{ props.merchantName }}</p>
  </div>

  <div class="flex gap-4 mt-auto mb-10">
    <OnlineHelpDesk />

    <button
      class="flex-1 bg-gradient-orange shadow-outer-orange-v-1 rounded-[10px] p-2 font-bold text-size-5 text-center"
      @click="emit('cancelled')"
    >
      {{ $t('PageOtc.CancelOrder') }}
    </button>

    <button
      class="flex-1 rounded-[10px] p-2 font-bold text-size-5 text-center bg-gradient-orange shadow-outer-orange-v-1"
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
    ? 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none'
    : 'bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1'
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
