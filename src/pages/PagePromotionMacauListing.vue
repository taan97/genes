<template>
  <BaseHeader
    class="text-white-1"
    :title="$t('PagePromotionMacau.PromotionListing')"
  />

  <div class="flex-1 p-5 pt-0">
    <InfinityList @more-requested="doMoreRequested">
      <template #item="{ item }">
        <div
          class="bg-transparent rounded-md border border-yellow-1 backdrop-blur p-4 mb-4 text-white-1 grid grid-cols-[auto_auto_minmax(0,_1fr)] gap-x-1 gap-y-2"
        >
          <p>{{ $t('App.Order') }}</p>
          <p>:</p>
          <p>{{ item.id }}</p>

          <p>{{ $t('PagePromotionMacau.Deposit') }}</p>
          <p>:</p>
          <p>{{ $formatNumber(item.amount) }} USD</p>

          <p>{{ $t('PageTeamDepositRecord.DateTime') }}</p>
          <p>:</p>
          <p>{{ $formatDateTime(item.created_at) }}</p>
        </div>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import PromotionMacauService from '@/services/promotion-macau-service'

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage
    }
    const res = await PromotionMacauService.getHistoryList(data)

    const list = res.data.items.map((item) => ({
      id: item.order_no,
      amount: item.amount,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
