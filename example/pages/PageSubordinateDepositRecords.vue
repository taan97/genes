<template>
  <BaseHeader
    :title="$t('PageManagementInformation.SubordinateDepositRecords')"
  >
    <template #sub-header>
      <div class="flex items-center gap-2">
        <DateTimePicker
          :title="$t('PageWallet.StartDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />
        <span>-</span>
        <DateTimePicker
          :title="$t('PageWallet.EndDate')"
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
    <div class="flex flex-col shadow-inner-dark-v-1 rounded-3xl p-4">
      <p class="self-center text-orange-v-1 font-bold text-size-7">
        {{ $t('PageManagementInformation.TotalDeposit') }}
      </p>
      <p class="self-center text-white-v-1 text-size-7">
        USD {{ $formatCurrency(totalBalance) }}
      </p>
    </div>

    <ul class="my-9 px-3 py-2 rounded-3xl shadow-inner-dark-v-1">
      <li
        class="flex items-center text-center px-[16px] py-2 border-b-[1px] border-black-v-4 last:border-none"
      >
        <p class="flex-none text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.MemberId') }}
        </p>
        <p class="flex-auto w-64 text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.Amount') }}
        </p>
        <p class="flex-auto w-32 text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.Date/Time') }}
        </p>
      </li>

      <InfinityList
        ref="rechargeListRef"
        @more-requested="doMoreRequested"
      >
        <template #item="{ item }">
          <li
            class="flex items-center text-center py-2 px-6 border-b-[1px] border-black-v-4 last:border-none"
          >
            <p class="flex-none text-size-1">{{ item.user_id }}</p>
            <p class="flex-auto w-80 text-size-1">
              {{ $formatCurrency(item.amount) }}
            </p>
            <!-- eslint-disable vue/no-v-html-->
            <p
              class="flex-auto w-32 text-size-1 break-words"
              v-html="item.created_at"
            ></p>
            <!-- eslint-enable vue/no-v-html-->
          </li>
        </template>
      </InfinityList>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

import UserCenterService from '@/services/user-center-service'

const startDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const endDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))

const totalBalance = ref('')
const rechargeListRef = ref(null)

async function doMoreRequested(nextPage, finish) {
  try {
    const res = await UserCenterService.getRechargeList({
      startDate: startDate.value,
      endDate: endDate.value,
      pageNumber: nextPage
    })

    totalBalance.value = res.data.total_deposit

    const list = res.data.items.map((i) => ({
      user_id: i.user_id,
      amount: i.amount,
      created_at: dayjs(i.created_at).format('YYYY-MM-DD<br>HH:mm:ss')
    }))

    finish(list, res.data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  rechargeListRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  rechargeListRef.value.onRefresh()
}
</script>

<style scoped></style>
