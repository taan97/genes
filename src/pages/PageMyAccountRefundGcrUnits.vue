<template>
  <BaseHeader
    :title="$t('PageMyAccountRefundGcrUnits.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <router-link
        :to="{ name: 'PageMyAccountRefundHistory' }"
        class="flex items-center gap-1 w-max ml-auto"
      >
        <BaseIcon name="listing" />

        <span class="underline text-white-1">{{
          $t('PageMyAccountRefundGcrUnits.List')
        }}</span>
      </router-link>

      <h2 class="text-orange-1 font-bold text-center text-size-5 pt-3 pb-5">
        {{ $t('PageMyAccountRefundGcrUnits.SelectDate') }}
      </h2>
      <p class="flex justify-around">
        <DateTimePicker
          :title="$t('PageMyAccountRefundGcrUnits.DateTime')"
          :placeholder="$t('PageMyAccountRefundGcrUnits.FromDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />

        <DateTimePicker
          :title="$t('PageMyAccountRefundGcrUnits.DateTime')"
          :placeholder="$t('PageMyAccountRefundGcrUnits.ToDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
      </p>
    </template>
  </BaseHeader>

  <InfinityList
    ref="myAccountRefundRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2 flex-1 flex flex-col">
        <h2 class="flex justify-between items-center pb-4">
          <p class="text-white-1 font-bold">
            {{ $t('PageMyAccountRefundGcrUnits.GcrShares') }}
          </p>
          <p class="text-orange-1 font-bold">
            {{ $formatUnits(item.total) }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-1">
          <p class="text-white-1">
            {{ $t('PageMyAccountRefundGcrUnits.OrderNumber') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.order_no }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundGcrUnits.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.time) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountRefundGcrUnits.PaidAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.paidAmount) }} USDT
          </p>
        </div>

        <button
          type="button"
          class="self-center w-[12rem] rounded-full py-3 px-4 text-orange-1 text-center my-4 flex"
          :class="
            item.redeem === REFUND_STATUS.REFUNDED ? 'bg-grey-5' : 'bg-white-1'
          "
          :disabled="item.redeem === REFUND_STATUS.REFUNDED"
          @click="onClickRefund(item)"
        >
          <BaseIcon
            name="refund"
            :class="
              item.redeem === REFUND_STATUS.REFUNDED
                ? 'fill-grey-2'
                : 'fill-orange-1'
            "
          />
          <span
            class="flex-1 font-bold text-size-5"
            :class="
              item.redeem === REFUND_STATUS.REFUNDED
                ? 'text-grey-2'
                : 'text-orange-1'
            "
          >
            {{ $t('Button.Redemption') }}
          </span>
        </button>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { REFUND_STATUS } from '@/utils/const.js'
import InvestmentService from '@/services/investment-service.js'

const router = useRouter()

const startDate = ref(null)
const endDate = ref(null)
const myAccountRefundRef = ref([])

async function doMoreRequested(nextPage, finish) {
  try {
    const { data } = await InvestmentService.getListInvest({
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    })

    const list = data.items.map((item) => ({
      id: item.id,
      type: item.type,
      order_no: item.order_no,
      total: item.balance,
      time: item.created_at,
      refund_date: item.invest_at,
      units: item.balance,
      paidAmount: item.amount,
      status: item.status,
      redeem: item.redeem
    }))

    finish(list, data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  myAccountRefundRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  myAccountRefundRef.value.onRefresh()
}

function onClickRefund(item) {
  router.push({
    name: 'PageMyAccountRefundGcrUnitsForm',
    query: item
  })
}
</script>

<style scoped></style>
