<template>
  <BaseHeader>
    <template #right-action>
      <CurrencySelector v-model="currentCurrency" />
    </template>

    <template #sub-header>
      <div class="flex justify-between items-center mb-4">
        <TabButtonGroup
          v-model:active="currentActionType"
          :tabs="actionType"
        />

        <router-link :to="{ name: 'PageOtcOrderHistory' }">
          <BaseIcon name="record-circle" />
        </router-link>
      </div>

      <TabBar
        v-model:active="currentCryptocurrencyType"
        :tabs="cryptocurrencyList"
        class="mb-4"
      />
    </template>
  </BaseHeader>

  <div class="p-5 pt-0">
    <InfinityList
      ref="buyListRef"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <CardOtcBuyListItem
          class="mb-4"
          :seller-name="item.sellerName"
          :limit-min="item.limitMin"
          :limit-max="item.limitMax"
          :unit-price="item.unitPrice"
          :remain="item.remain"
          @clicked="doClickedItem(item)"
        />
      </template>
    </InfinityList>

    <ActionSheetOtcOrderForm
      v-model:show="isOrderFormVisible"
      :seller-name="selectedItem.sellerName"
      :order-number="selectedItem.orderNumber"
      :unit-price="selectedItem.unitPrice"
      :limit-min="selectedItem.limitMin"
      :limit-max="selectedItem.limitMax"
      :remain="selectedItem.remain"
      @submitted="doSubmittedOrder"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import OtcService from '@/services/otc-service.js'
import { useOtcStore } from '@/stores'
import { OTC_ACTION_TYPE, OTC_ORDER_STEP } from '@/utils/const.js'

const { t } = useI18n()
const router = useRouter()
const otcStore = useOtcStore()

const currentCurrency = computed({
  get: () => otcStore.currency,
  set: (newValue) => (otcStore.currency = newValue)
})

const currentActionType = ref(OTC_ACTION_TYPE.BUY)

const actionType = computed(() => [
  {
    label: t('PageOtc.WantToBuy'),
    value: OTC_ACTION_TYPE.BUY
  },
  {
    label: t('PageOtc.WantToSell'),
    value: OTC_ACTION_TYPE.SELL
  }
])

const CRYTOCURRENCY_TYPES = ['USDT', 'BTC', 'ETH', 'HT', 'EOS', 'XRP', 'LTC']
const currentCryptocurrencyType = ref(CRYTOCURRENCY_TYPES[0])
const cryptocurrencyList = CRYTOCURRENCY_TYPES.map((c) => ({
  label: c,
  value: c
}))

const isOrderFormVisible = ref(false)

const selectedItem = ref({
  orderNumber: '',
  sellerName: '',
  limitMin: '',
  limitMax: '',
  unitPrice: '',
  remain: ''
})

const buyListRef = ref(null)

watch([currentCurrency, currentActionType, currentCryptocurrencyType], () =>
  buyListRef.value.onRefresh()
)

async function doMoreRequested(nextPage, finish) {
  // currently only support currentActionType = buy and currentCryptocurrencyType = USDT
  if (
    currentActionType.value !== OTC_ACTION_TYPE.BUY ||
    currentCryptocurrencyType.value !== CRYTOCURRENCY_TYPES[0]
  )
    return

  try {
    const { data } = await OtcService.getBuyList({
      currency: currentCurrency.value,
      page: nextPage
    })

    const list = data.items.map((i) => ({
      orderNumber: i.order_number,
      sellerName: i.name,
      limitMin: i.limitMin,
      limitMax: i.limitMax,
      unitPrice: i.price,
      remain: i.remain
    }))

    finish(list, data.total)
  } catch {}
}

function doClickedItem(item) {
  selectedItem.value = item
  isOrderFormVisible.value = true
}

function doSubmittedOrder(tradeNumber) {
  router.push({
    name: 'PageOtcOrderDetail',
    params: { id: tradeNumber, step: OTC_ORDER_STEP.CONFIRM }
  })
}
</script>

<style scoped></style>
