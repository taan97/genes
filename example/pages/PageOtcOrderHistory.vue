<template>
  <BaseHeader :title="$t('PageOtc.OrderList')">
    <template #sub-header>
      <div class="flex mb-4">
        <TabButtonGroup
          v-model:active="currentActionType"
          :tabs="actionType"
        />
      </div>

      <TabBar
        :active="currentStatusTab.value"
        :tabs="orderStatusList"
        @tab-changed="(e) => (currentStatusTab = e)"
      />
    </template>
  </BaseHeader>

  <div class="p-5 pt-0">
    <InfinityList
      ref="orderListRef"
      keyed-by="trade_number"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item: order }">
        <router-link
          :to="order.to"
          class="!block bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl p-4 mb-4"
        >
          <div class="flex justify-between mb-6">
            <h3 class="text-size-4 font-bold">{{ order.merchant_name }}</h3>
            <p class="text-size-2">{{ order.created_at }}</p>
          </div>

          <div class="flex justify-between">
            <div>
              <p class="mb-1">
                {{ $t('PageOtc.Quantity') }}:
                {{ $formatCurrency(order.number) }} USDT
              </p>
              <p>
                {{ $t('PageOtc.ActualPayment') }}:
                {{ $formatCurrency(order.total_price) }} {{ otcStore.currency }}
              </p>
            </div>

            <div>
              <p class="text-end mb-1">{{ $t('PageOtc.Status') }}</p>
              <p class="text-size-4 text-orange-v-1">{{ order.status_desc }}</p>
            </div>
          </div>
        </router-link>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { OTC_ACTION_TYPE, ORDER_STATUS, OTC_ORDER_STEP } from '@/utils/const.js'
import OtcService from '@/services/otc-service'
import { useOtcStore } from '@/stores'

const { t } = useI18n()
const otcStore = useOtcStore()

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

const orderStatusList = computed(() => [
  {
    label: t('PageOtc.Undone'),
    value: ORDER_STATUS.PENDING
  },
  {
    label: t('PageOtc.Completed'),
    value: ORDER_STATUS.COMPLETED
  },
  {
    label: t('PageOtc.UnderAppeal'),
    value: ORDER_STATUS.APPEAL
  },
  {
    label: t('PageOtc.Cancelled'),
    value: ORDER_STATUS.CANCELLED
  }
])

const currentStatusTab = ref(orderStatusList.value[0])
const orderListRef = ref(null)

watch([currentActionType, currentStatusTab], () => {
  orderListRef.value.onRefresh()
})

function getToRoute({ status, trade_number }) {
  const map = [
    {
      status: [ORDER_STATUS.PENDING, ORDER_STATUS.PAID],
      to: {
        name: 'PageOtcOrderDetail',
        params: {
          id: trade_number,
          step:
            status === ORDER_STATUS.PENDING
              ? OTC_ORDER_STEP.CONFIRM
              : OTC_ORDER_STEP.SELLER_CONFIRM
        }
      }
    },
    {
      status: [
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.APPEAL_FAILED,
        ORDER_STATUS.MERCHANT_REJECTED,
        ORDER_STATUS.COMPLETED,
        ORDER_STATUS.APPEAL
      ],
      to: {
        name: 'PageOtcOrderHistoryItem',
        params: {
          id: trade_number
        }
      }
    }
  ]
  return map.find((m) => m.status.includes(status)).to
}

async function doMoreRequested(nextPage, finish) {
  // currently only support OTC_ACTION_TYPE.BUY
  if (currentActionType.value !== OTC_ACTION_TYPE.BUY) return

  try {
    const { data } = await OtcService.getOrders({
      status: currentStatusTab.value.value,
      page: nextPage
    })

    const list = data.items
      .map((i) => ({
        created_at: i.created_at,
        merchant_name: i.merchant_name,
        number: i.number,
        status: i.status,
        status_desc: i.status_desc,
        total_price: i.total_price,
        trade_number: i.trade_number
      }))
      .map((i) => ({
        ...i,
        to: getToRoute(i)
      }))

    finish(list, data.total)
  } catch {}
}
</script>

<style scoped></style>
