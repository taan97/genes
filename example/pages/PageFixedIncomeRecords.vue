<template>
  <BaseHeader :title="$t('PageInvestment.FixedIncomeRecords')">
    <template #sub-header>
      <div class="flex pb-6 items-center gap-2">
        <DateTimePicker
          :title="$t('PageInvestment.DateTime')"
          :content="dateTime"
          @changed="doChangedDateTime"
        />

        <BaseIcon
          name="arrow-down-small"
          class="fill-yellow-v-1"
        />
      </div>
    </template>
  </BaseHeader>

  <div class="p-5">
    <ul>
      <li
        v-for="(item, index) in recordList"
        :key="index"
        class="shadow-inner-dark-v-1 rounded-3xl py-6 px-6 mt-4"
      >
        <div class="flex justify-between flex-1 items-center">
          <p class="text-size-3 text-yellow-v-1 pb-1 break-all font-bold">
            {{ $t('PageInvestment.FixedIncome') }}
          </p>
          <DisplayCurrency :amount="item.static_award" />
        </div>
        <p class="break-words whitespace-nowrap text-size-1 py-2">
          {{ item.date_at }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import InvestmentService from '@/services/investment-service.js'

const dateTime = ref(dayjs(new Date()).format('YYYY-MM-DD'))

const recordList = ref([])

setRecordList()

function setRecordItem(wallet) {
  recordList.value = wallet.data.map((item) => ({
    date_at: item.date_at,
    balance: item.balance,
    static_award: item.static_award
  }))
}

async function setRecordList() {
  try {
    const wallet = await InvestmentService.investRecords(dateTime.value)
    setRecordItem(wallet)
  } catch {}
}

function doChangedDateTime(date) {
  dateTime.value = date
  setRecordList()
}
</script>

<style scoped></style>
