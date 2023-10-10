<template>
  <BaseHeader />

  <div class="p-5 pt-0 flex-1 flex flex-col">
    <div
      class="bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl p-6 mb-4 flex justify-between items-center"
    >
      <div>
        <h3 class="text-size-5 font-bold mb-2">
          {{ orderDetail.status_desc }}
        </h3>
        <p v-if="isCancelled">
          {{ $t('PageOtc.CancelledOrderCantViewPaymentMethod') }}
        </p>
      </div>

      <BaseIcon
        v-if="isCancelled"
        name="exclamation-mark"
      />
    </div>

    <CardOtcBuyItemDetailHidden
      v-if="isDetailHidden"
      class="mb-4"
      :total-price="orderDetail.total_price"
      :price="orderDetail.price"
      :quantity="orderDetail.number"
      :order-number="orderDetail.order_number"
      :order-time="orderDetail.created_at"
    />

    <CardOtcBuyItemDetail
      v-else
      class="mb-4"
      :total-price="orderDetail.total_price"
      :price="orderDetail.price"
      :quantity="orderDetail.number"
      :order-number="orderDetail.order_number"
      :payment-name="orderDetail.payment_name"
      :payment-account="orderDetail.payment_account"
      :payment-bank="orderDetail.payment_bank"
    />

    <div
      class="bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl p-6 mb-4 flex justify-between items-center"
    >
      <span>{{ $t('PageOtc.SellerNickname') }}</span>
      <span>{{ orderDetail.merchant_name }}</span>
    </div>

    <OnlineHelpDesk class="mt-auto" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import otcService from '@/services/otc-service'
import { ORDER_STATUS } from '@/utils/const.js'

const route = useRoute()

const orderDetail = ref({
  merchant_name: '',
  total_price: '',
  price: '',
  number: '',
  order_number: '',
  created_at: '',
  status_desc: '',
  status: '',
  payment_name: '',
  payment_account: '',
  payment_bank: ''
})

const isCancelled = computed(
  () => orderDetail.value.status === ORDER_STATUS.CANCELLED
)

const isDetailHidden = computed(
  () =>
    orderDetail.value.status === ORDER_STATUS.CANCELLED ||
    orderDetail.value.status === ORDER_STATUS.COMPLETED
)

getOrderDetail()

async function getOrderDetail() {
  try {
    const { data } = await otcService.getOrderDetail(route.params.id)

    orderDetail.value = {
      merchant_name: data.merchant_name,
      total_price: data.total_price,
      price: data.price,
      number: data.number,
      order_number: data.order_number,
      created_at: data.created_at,
      status_desc: data.status_desc,
      status: data.status,
      payment_name: data.payment_name,
      payment_account: data.payment_account,
      payment_bank: data.payment_bank
    }
  } catch {}
}
</script>

<style scoped></style>
