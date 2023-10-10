<template>
  <BaseHeader
    :title="filterDetail.title || walletStore.actTypeMap[filterDetail.act_type]"
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

  <div class="p-5 pt-0">
    <div class="flex justify-end">
      <p class="text-grey-v-2 text-size-2">
        {{
          $t('PageWallet.Transactions', {
            count: totalRecords
          })
        }}
      </p>
    </div>

    <InfinityList
      ref="walletRecordsListRef"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <div
          class="flex justify-between shadow-inner-dark-v-1 rounded-3xl py-6 px-4 mt-4"
        >
          <div class="break-words w-1/2">
            <p class="text-yellow-v-1 font-bold">
              {{ item.balance_type }}
            </p>
            <p class="text-size-2">{{ item.act_desc }}</p>
          </div>
          <div class="text-end">
            <DisplayCurrency :amount="item.amount" />
            <p class="text-size-2 text-grey-v-2">{{ item.created_at }}</p>
          </div>
        </div>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

import WalletService from '@/services/wallet-service.js'
import { useWalletStore } from '@/stores'

const walletStore = useWalletStore()

const route = useRoute()

const filterDetail = reactive({
  title: route.query.title,
  balance_type: route.query.balance_type,
  act_type: route.query.act_type,
  process_at: route.query.process_at
    ? dayjs(route.query.process_at).format('YYYY-MM-DD')
    : dayjs(new Date()).format('YYYY-MM-DD')
})

const startDate = ref(filterDetail.process_at)
const endDate = ref(filterDetail.process_at)

const walletRecordsListRef = ref(null)
const totalRecords = ref(0)

async function doMoreRequested(nextPage, finish) {
  try {
    await walletStore.setActType()

    const data = {
      act_type: filterDetail.act_type,
      balance_type: walletStore.convertBalanceType[filterDetail.balance_type],
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    }
    const res = await WalletService.getWalletDetail(data)

    const list = res.data.items.map((item) => ({
      user_id: item.user_id,
      balance_type: item.balance_type,
      act_type: item.act_type,
      act_desc: item.act_desc,
      amount: item.amount,
      process_at: item.process_at,
      created_at: item.created_at
    }))

    totalRecords.value = res.data.total

    finish(list, res.data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  walletRecordsListRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  walletRecordsListRef.value.onRefresh()
}
</script>

<style scoped></style>
