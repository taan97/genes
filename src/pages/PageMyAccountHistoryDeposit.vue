<template>
  <BaseHeader
    :title="$t('DepositStatementHistory.Title')"
    class="flex flex-col py-4 px-3 sticky top-0 z-10 transition-all duration-300 !bg-none !bg-black-1 text-white-1 pb-10"
  />

  <InfinityList
    ref="historyDepositStatement"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ item.status_desc }}
          </p>
          <p class="text-orange-1 font-bold">
            {{ $formatCurrencyWithPrefix(item.balance) }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-4">
          <p class="text-white-1">
            {{ $t('DepositStatementHistory.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>
        </div>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { ref } from 'vue'
import WalletService from '@/services/wallet-service.js'

const historyDepositStatement = ref(null)

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage
    }
    const res = await WalletService.getChainDeposit(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      balance_type: item.balance_type,
      balance: item.balance,
      created_at: item.created_at,
      status_desc: item.status_desc
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
