<template>
  <BaseHeader
    :title="$t('PageMyAccountHistoryGcrBond.Title')"
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

      <h2 class="text-orange-1 font-bold text-center text-size-5 pt-3 pb-5">
        {{ $t('PageMyAccountRefundGcrUnits.SelectDate') }}
      </h2>
      <p class="flex justify-evenly">
        <DateTimePicker
          :title="$t('PageMyAccountHistoryGcrBond.DateTime')"
          :placeholder="$t('PageMyAccountHistoryGcrBond.FromDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />

        <DateTimePicker
          :title="$t('PageMyAccountHistoryGcrBond.DateTime')"
          :placeholder="$t('PageMyAccountHistoryGcrBond.ToDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
      </p>
    </template>
  </BaseHeader>

  <InfinityList
    ref="historyGcrRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <h2 class="flex justify-between items-center pb-4">
          <p class="text-white-1 font-bold">
            {{ item.act_desc }}
          </p>
          <p class="text-orange-1 font-bold">
            {{ $formatUnits(item.amount) }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-1">
          <p class="text-white-1">
            {{ $t('PageMyAccountHistoryGcrBond.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>
        </div>
      </div>
    </template>
  </InfinityList>

  <BaseDropdown
    v-model:show="showSelectFilterModal"
    :value="currentFilter"
    keyed-by="value"
    :title="$t('PageWithdrawalStatementHistory.Filter')"
    :options="walletStore.actType"
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { WITHDRAW_RECORD_STATE } from '@/utils/const'
import WalletService from '@/services/wallet-service.js'
import { useWalletStore } from '@/stores'
import { BALANCE_TYPE } from '@/utils/const'

const walletStore = useWalletStore()
const showSelectFilterModal = ref(false)
const currentFilter = ref(WITHDRAW_RECORD_STATE.ALL)
const historyGcrRef = ref(null)
const startDate = ref(null)
const endDate = ref(null)

async function doMoreRequested(nextPage, finish) {
  await walletStore.setActType()

  try {
    const data = {
      start_time: startDate.value,
      end_time: endDate.value,
      balance_type: BALANCE_TYPE.BOND,
      status: currentFilter.value,
      page: nextPage
    }
    const res = await WalletService.getDetailsWallet(data)
    const list = res.data.items.map((item) => ({
      act_desc: item.act_desc,
      act_type: item.act_type,
      amount: item.amount,
      created_at: item.created_at,
      user_id: item.user_id
    }))

    finish(list, res.data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  historyGcrRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  historyGcrRef.value.onRefresh()
}

function doSelectedFilterStatus(text) {
  currentFilter.value = text.value
  historyGcrRef.value.onRefresh()
}
</script>

<style scoped></style>
