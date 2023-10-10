<template>
  <BaseHeader
    :back-option="numberOfStepBack"
    class="!bg-none !bg-black-2 text-white-1"
  />

  <OtcOrderSteps
    v-if="hasLoaded"
    :current-step="currentStep"
    :time-left-to-cancel-in-seconds="orderDetail.cancelTime"
    :time-left-to-appeal-in-seconds="orderDetail.appealTime"
    class="mb-4"
    @confirmation-time-expired="$router.push({ name: 'PageOtc' })"
    @payment-time-expired="isAppealButtonDisabled = false"
  />

  <OtcOrderDetailConfirm
    v-if="currentStep === OTC_ORDER_STEP.CONFIRM"
    :total-price="orderDetail.totalPrice"
    :price="orderDetail.price"
    :number="orderDetail.number"
    :trade-number="orderDetail.tradeNumber"
    :bank-real-name="orderDetail.bankRealName"
    :bank-account="orderDetail.bankAccount"
    :bank-name="orderDetail.bankName"
    :merchant-name="orderDetail.merchantName"
    @cancelled="() => cancelOrder()"
    @confirmed="doConfirmedFirstStep"
  />

  <OtcOrderDetailPay
    v-else-if="currentStep === OTC_ORDER_STEP.PAY"
    :total-price="orderDetail.totalPrice"
    :bank-real-name="orderDetail.bankRealName"
    :bank-account="orderDetail.bankAccount"
    :bank-name="orderDetail.bankName"
    @cancelled="() => cancelOrder()"
    @confirmed="doConfirmedSecondStep"
  />

  <OtcOrderDetailSellerConfirm
    v-else-if="currentStep === OTC_ORDER_STEP.SELLER_CONFIRM"
    :disable-appeal="isAppealButtonDisabled"
    :total-price="orderDetail.totalPrice"
    :price="orderDetail.price"
    :number="orderDetail.number"
    :trade-number="orderDetail.tradeNumber"
    :bank-real-name="orderDetail.bankRealName"
    :bank-account="orderDetail.bankAccount"
    :bank-name="orderDetail.bankName"
    :merchant-name="orderDetail.merchantName"
    @cancelled="() => cancelOrder()"
    @confirmed="doConfirmedThirdStep"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { OTC_ORDER_STEP } from '@/utils/const'
import OtcService from '@/services/otc-service'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import { useOtcStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const otcStore = useOtcStore()

const numberOfStepBack = computed(() => {
  if (
    route.meta.from === 'PageOtcOrderDetail' &&
    currentStep.value === OTC_ORDER_STEP.SELLER_CONFIRM
  )
    return -3

  return -1
})

const currentStep = computed(() => Number(route.params.step))

const isAppealButtonDisabled = ref(true)

const orderDetail = computed(() => otcStore.order)

const hasLoaded = computed(() => orderDetail.value.tradeNumber)

async function cancelOrder() {
  const Modal = useConfirmModal()

  try {
    await Modal.open({
      title: t('PageOtc.CancelOrderConfirmModalTitle'),
      message: t('PageOtc.CancelOrderConfirmModalMessage'),
      buttonText: t('PageOtc.Confirm')
    })

    handleCancelOrder()
  } catch {}
}

async function handleCancelOrder() {
  try {
    await OtcService.cancelOrder(route.params.id)
    router.push({ name: 'PageOtc' })
  } catch {}
}

function doConfirmedFirstStep() {
  router.push({
    name: 'PageOtcOrderDetail',
    params: { id: route.params.id, step: OTC_ORDER_STEP.PAY }
  })
}

async function doConfirmedSecondStep() {
  await otcStore.setOrderDetail(route.params.id)

  router.push({
    name: 'PageOtcOrderDetail',
    params: { id: route.params.id, step: OTC_ORDER_STEP.SELLER_CONFIRM }
  })
}

function doConfirmedThirdStep() {
  router.push({
    name: 'PageOtcOrderHistory'
  })
}
</script>

<style scoped></style>
