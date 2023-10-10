<template>
  <BaseHeader
    :title="$t('PageMyAccountHistoryConvertToUsdt.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <h2 class="text-orange-1 font-bold text-center text-size-5 pt-3 pb-5">
        {{ $t('PageMyAccountHistoryConvertToUsdt.SelectDate') }}
      </h2>
      <p class="flex justify-evenly">
        <DateTimePicker
          :title="$t('PageMyAccountHistoryConvertToUsdt.DateTime')"
          :placeholder="$t('PageMyAccountHistoryConvertToUsdt.FromDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />

        <DateTimePicker
          :title="$t('PageMyAccountHistoryConvertToUsdt.DateTime')"
          :placeholder="$t('PageMyAccountHistoryConvertToUsdt.ToDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
      </p>
    </template>
  </BaseHeader>

  <InfinityList
    ref="historyConvRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <h2 class="flex justify-between items-center pb-4">
          <p class="text-white-1 font-bold">
            {{ $t('PageMyAccountHistoryConvertToUsdt.TypeStatement') }}
          </p>
          <p class="text-orange-1 font-bold">
            - {{ $formatCurrency(item.ticket) }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-1">
          <p class="text-white-1">
            {{ $t('PageMyAccountHistoryConvertToUsdt.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountHistoryConvertToUsdt.ShareNetValue') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.rate) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountHistoryConvertToUsdt.ReceiveAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.usd) }} USDT
          </p>
        </div>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { ref } from 'vue'
import WalletService from '@/services/wallet-service.js'

const historyConvRef = ref(null)
const startDate = ref(null)
const endDate = ref(null)

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    }
    const res = await WalletService.getConvertList(data)
    const list = res.data.items.map((item) => ({
      rate: item.rate,
      ticket: item.ticket,
      usd: item.usd,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  historyConvRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  historyConvRef.value.onRefresh()
}
</script>

<style scoped></style>
