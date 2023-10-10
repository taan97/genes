<template>
  <BaseHeader :title="$t('PageInvestment.ManagementIncomeRecords')">
    <template #sub-header>
      <div class="flex pb-2 items-center gap-2">
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

  <div class="p-5 pt-0">
    <ul>
      <li
        v-for="(item, index) in recordList"
        :key="index"
        class="shadow-inner-dark-v-1 rounded-3xl py-6 px-6 mt-4 grid grid-cols-[auto,auto,1fr] gap-x-3 gap-y-1"
      >
        <div class="col-span-full flex justify-between">
          <p class="text-yellow-v-1 text-size-4 font-bold break-all">
            {{ $t('PageInvestment.ManagementIncome') }}
          </p>
          <DisplayCurrency :amount="item.management" />
        </div>

        <p
          class="col-span-full text-size-1 break-words font-bold whitespace-nowrap py-4"
        >
          {{ item.date_at }}
        </p>

        <p>{{ $t('PageInvestment.CommunityRewards') }}</p>
        <p>:</p>
        <p>{{ item.manage_award }}</p>

        <p>{{ $t('PageInvestment.RankRewards') }}</p>
        <p>:</p>
        <p>{{ item.team_award }}</p>

        <p>{{ $t('PageInvestment.AchievementRewards') }}</p>
        <p>:</p>
        <p>{{ item.dividend }}</p>

        <template v-if="Number(item.leader_team_award) > 0">
          <p>{{ $t('PageInvestment.SpecialRankRewards') }}</p>
          <p>:</p>
          <p>
            {{ item.leader_team_award }}
          </p>
        </template>

        <template v-if="Number(item.leader_dividend) > 0">
          <p>
            {{ $t('PageInvestment.SpecialAchievementRewards') }}
          </p>
          <p>:</p>
          <p>
            {{ item.leader_dividend }}
          </p>
        </template>
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
    management: item.management,
    manage_award: item.manage_award,
    team_award: item.team_award,
    leader_dividend: item.leader_dividend,
    leader_team_award: item.leader_team_award,
    dividend: item.dividend
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
