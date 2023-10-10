<template>
  <CardOtcBuyItemDetail
    class="mb-4"
    :is-expanded="true"
    :total-price="props.totalPrice"
    :price="props.price"
    :quantity="props.number"
    :order-number="props.tradeNumber"
    :payment-name="props.bankRealName"
    :payment-account="props.bankAccount"
    :payment-bank="props.bankName"
  />

  <div
    class="px-6 py-4 mb-8 flex justify-between text-white-1 bg-black-opacity-1"
  >
    <p>{{ $t('PageOtc.SellerNickname') }}</p>
    <p>{{ props.merchantName }}</p>
  </div>

  <div class="flex gap-2 mt-auto mb-10 px-4">
    <OnlineHelpDesk class="basis-[52px] shadow-outer-orange-dark-1" />

    <button
      type="button"
      class="flex-1 rounded-full py-3 px-4 text-size-5 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      @click="emit('cancelled')"
    >
      {{ $t('PageOtc.CancelOrder') }}
    </button>

    <button
      type="button"
      class="flex-1 rounded-full py-3 px-4 text-size-5 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      @click="emit('confirmed')"
    >
      {{ $t('PageOtc.ToPay') }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
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
</script>

<style scoped></style>
