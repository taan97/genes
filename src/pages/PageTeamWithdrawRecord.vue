<template>
  <BaseHeader
    :title="$t('PageTeamWithdrawRecord.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <div class="text-center flex flex-col gap-2">
        <p class="text-orange-1 text-size-5 font-bold">
          {{ $t('PageTeamWithdrawRecord.TeamTotalWithdraw') }}
        </p>
        <p class="text-size-5 font-bold">
          USDT {{ $formatCurrency(totalWithrawal) }}
        </p>
      </div>
      <h2 class="text-orange-1 font-bold text-center text-size-5 pt-3 pb-5">
        {{ $t('PageTeamWithdrawRecord.SelectDate') }}
      </h2>
      <p class="flex justify-evenly">
        <DateTimePicker
          :title="$t('PageTeamWithdrawRecord.DateTime')"
          :placeholder="$t('PageTeamWithdrawRecord.FromDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />

        <DateTimePicker
          :title="$t('PageTeamWithdrawRecord.DateTime')"
          :placeholder="$t('PageTeamWithdrawRecord.ToDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
      </p>
    </template>
  </BaseHeader>

  <InfinityList
    ref="withdrawalRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2 flex flex-col gap-2">
        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ $t('PageTeamWithdrawRecord.WithdrawalAmount') }}
          </p>
          <p class="text-orange-1 font-bold">
            {{ $formatCurrencyWithPrefix(item.amount) }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2">
          <p class="text-white-1">
            {{ $t('PageTeamWithdrawRecord.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>
        </div>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2">
          <p class="text-white-1">
            {{ $t('PageTeamWithdrawRecord.AccountId') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.user_id }}
          </p>
        </div>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { ref } from 'vue'
import TeamService from '@/services/team-service.js'
import dayjs from 'dayjs'

const withdrawalRef = ref(null)
const startDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const endDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const totalWithrawal = ref('')

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    }
    const res = await TeamService.withdrawalList(data)
    totalWithrawal.value = res.data.total_withdrawal
    const list = res.data.items.map((item) => ({
      amount: item.amount,
      created_at: item.created_at,
      user_id: item.uid
    }))

    finish(list, res.data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  withdrawalRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  withdrawalRef.value.onRefresh()
}
</script>

<style scoped></style>
