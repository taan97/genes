<template>
  <BaseHeader :title="$t('PageInvestment.SubscriptionRecords')">
    <template #sub-header>
      <div class="flex items-center gap-2">
        <DateTimePicker
          :title="$t('PageInvestment.StartDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />
        <span>-</span>
        <DateTimePicker
          :title="$t('PageInvestment.EndDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
        <BaseIcon
          name="arrow-down-small"
          class="fill-yellow-v-1"
        />
      </div>
    </template>
  </BaseHeader>

  <div class="p-5">
    <div class="shadow-inner-dark-v-1 rounded-3xl p-4 text-center">
      <p class="text-yellow-v-1 text-size-4 font-bold">
        {{ $t('PageInvestment.TotalRebated') }}
      </p>
      <p>{{ $t('PageInvestment.YourAccountBalance') }}</p>
      <p class="text-size-5">{{ totalRebated }}</p>
    </div>

    <InfinityList
      ref="subscriptionRecordsListRef"
      container-class="flex flex-col gap-4"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <div
          class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 py-4 px-3.5 grid grid-cols-[auto,auto,1fr] gap-x-3 gap-y-1"
        >
          <div class="col-span-full flex justify-between">
            <p class="text-yellow-v-1 text-size-4 font-bold break-all">
              {{ $t('PageInvestment.RebatedAmount') }}
            </p>
            <DisplayCurrency :amount="item.rebated" />
          </div>

          <p>{{ $t('PageInvestment.SubscriptionDateTime') }}</p>
          <p>:</p>
          <p>{{ item.created_at }}</p>

          <p>{{ $t('PageInvestment.SubscriptionEndDate') }}</p>
          <p>:</p>
          <p>{{ item.unlock_at }}</p>

          <p>{{ $t('PageInvestment.SubcriptionAmount') }}</p>
          <p>:</p>
          <p>{{ item.lock_balance }}</p>
        </div>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import InvestmentService from '@/services/investment-service.js'

const startDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const endDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const subscriptionRecordsListRef = ref([])
const totalRebated = ref('')

function doChangedStartDate(date) {
  startDate.value = date
  subscriptionRecordsListRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  subscriptionRecordsListRef.value.onRefresh()
}

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    }
    const res = await InvestmentService.getSubscribeList(data)
    totalRebated.value = res.data.extra

    const list = res.data.items.map((i) => ({
      lock_balance: i.lock_balance,
      rebated: i.rebated,
      unlock_at: i.unlock_at,
      created_at: i.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
