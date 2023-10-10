<template>
  <BaseHeader
    :title="$t('PageMyAccountRefundHistory.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <div
        class="flex items-center justify-end gap-1 cursor-pointer"
        @click="showSelectFilterModal = true"
      >
        <BaseIcon name="filter" />

        <span class="underline text-white-1">{{ $t('Button.Filter') }}</span>
      </div>
    </template>
  </BaseHeader>

  <InfinityList
    ref="refundHistoryRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ $t('PageMyAccountRefundHistory.GcrSharesRedemption') }}
          </p>

          <p class="text-orange-1 font-bold">
            {{ $formatCurrency(item.amount) }} USDT
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.OrderNumber') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.order_no }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.RequestDate') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.InvestmentCapital') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.amount) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.NoofRedemptionUnits') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatUnits(item.balance) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.Address') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.address }}</p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.RedemptionFee') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.fee) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.ReceivableAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.real_money) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundHistory.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.status_desc }}</p>

          <template v-if="item.hash">
            <p class="text-white-1">
              {{ $t('PageMyAccountRefundHistory.HashCode') }}
            </p>
            <p class="text-white-1">:</p>
            <p class="text-orange-1 break-all">{{ item.hash }}</p>
          </template>
        </div>
      </div>
    </template>
  </InfinityList>

  <BaseDropdown
    v-model:show="showSelectFilterModal"
    :value="currentFilter"
    keyed-by="value"
    :options="options"
    :title="$t('PageMyAccountRefundHistory.Filter')"
    translate-item
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { REFUND_STATE } from '@/utils/const'
import InvestmentService from '@/services/investment-service.js'

const showSelectFilterModal = ref(false)

const currentFilter = ref(REFUND_STATE.COMPLETED)
const refundHistoryRef = ref(null)

const options = [
  {
    label: 'PageMyAccountRefundHistory.Completed',
    value: REFUND_STATE.COMPLETED
  },
  {
    label: 'PageMyAccountRefundHistory.Pending',
    value: REFUND_STATE.PENDING
  },
  {
    label: 'PageMyAccountRefundHistory.Rejected',
    value: REFUND_STATE.REJECTED
  },
  {
    label: 'PageMyAccountRefundHistory.Processing',
    value: REFUND_STATE.PROCESSING
  },
  {
    label: 'PageMyAccountRefundHistory.WithdrawalCompleted',
    value: REFUND_STATE.WITHDRAWAL_COMPLETED
  },
  {
    label: 'PageMyAccountRefundHistory.WithdrawalUnsuccessful',
    value: REFUND_STATE.WITHDRAWAL_UNSUCCESSFULL
  },
  {
    label: 'PageMyAccountRefundHistory.Cancelled',
    value: REFUND_STATE.CANCELLED
  }
]
async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage,
      status: currentFilter.value
    }
    const res = await InvestmentService.getRefundList(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      address: item.address,
      amount: item.amount,
      real_money: item.real_money,
      fee: item.fee,
      balance: item.balance,
      status: item.status,
      status_desc: item.status_desc,
      hash: item.hash,
      order_no: item.order_no,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}

function doSelectedFilterStatus(text) {
  currentFilter.value = text.value
  refundHistoryRef.value.onRefresh()
}
</script>

<style scoped></style>
