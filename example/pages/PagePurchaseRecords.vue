/* eslint-disable vue/no-parsing-error */
<template>
  <BaseHeader :title="$t('PageInvestment.PurchaseRecords')" />

  <InfinityList
    class="p-5 pt-0"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <li
        class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 py-4 px-4 text-size-1 grid grid-cols-[auto,auto,1fr] gap-x-3 gap-y-1 mb-4"
      >
        <div class="col-span-full flex justify-between">
          <p class="text-yellow-v-1 text-size-4 font-bold">
            {{ $t('PageInvestment.PurchaseAmount') }}
          </p>
          <p class="font-bold text-size-base">
            {{ $formatCurrency(item.amount) }}
          </p>
        </div>

        <p>{{ $t('PageInvestment.Date/Time') }}</p>
        <p>:</p>
        <p class="break-words">{{ item.created_at }}</p>

        <p>{{ $t('PageInvestment.Quantity') }}</p>
        <p>:</p>
        <p>{{ item.pin_amount }}</p>

        <p>{{ $t('PageInvestment.PinCode') }}</p>
        <p>:</p>
        <div class="grid grid-cols-2">
          <p
            v-for="(i, ind) in item.pin_code"
            :key="ind"
            class="mr-2 break-words"
            :class="[{ 'text-red-v-2': i.status === PIN_CODE_STATUS.USED }]"
          >
            {{ i.code }}
          </p>
        </div>
      </li>
    </template>
  </InfinityList>
</template>

<script setup>
import dayjs from 'dayjs'
import InvestmentService from '@/services/investment-service.js'
import { PIN_CODE_STATUS } from '@/utils/const.js'

async function doMoreRequested(nextPage, finish) {
  try {
    const res = await InvestmentService.getPinCodeOrderList({
      page: nextPage
    })

    const list = res.data.items.map((i) => ({
      amount: i.amount,
      created_at: dayjs(i.created_at).format('YYYY-MM-DD hh:mm:ss'),
      pin_amount: i.pin_amount,
      pin_code: i.pin_code
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
