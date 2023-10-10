<template>
  <BaseHeader
    :title="
      getPlan() === PLAN_TYPE._A
        ? $t('PageGcrSharesPurchaseListing.Title')
        : $t('PageGcrSharesPurchaseListing.TitlePlanB')
    "
    class="!bg-none !bg-black-1 text-white-1 pb-10"
  />

  <InfinityList @more-requested="doMoreRequested">
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <div class="grid grid-cols-[auto_auto_1fr] gap-1">
          <router-link
            :class="[
              String(item.status) === WITHDRAW_RECORD_STATE.TRANSFER ||
              !item.contract
                ? 'pointer-events-none'
                : 'underline  underline-offset-4',
              String(item.status) === WITHDRAW_RECORD_STATE.TRANSFER
                ? 'text-grey-1'
                : 'text-orange-1'
            ]"
            class="col-span-full pb-4 text-center font-bold appearance-none"
            :to="{
              name: 'PagePdfViewer',
              query: {
                src: item.contract,
                downloadable: true
              }
            }"
          >
            {{ $t('PageGcrSharesPurchaseListing.SharesPurchaseAgreement') }}
          </router-link>

          <p class="text-white-1">
            {{ $t('PageGcrSharesPurchaseListing.OrderNumber') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.order_no }}
          </p>

          <p class="text-white-1">
            {{ $t('PageGcrSharesPurchaseListing.DateofPurchase') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{
              getPlan() === PLAN_TYPE._A
                ? $t('PageGcrSharesPurchaseListing.NumberofShares')
                : $t('PageGcrSharesPurchaseListing.NumberofSharesPlanB')
            }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatUnits(item.balance) }}
          </p>

          <p class="text-white-1">
            {{
              getPlan() === PLAN_TYPE._A
                ? $t('PageGcrSharesPurchaseListing.PriceperUnit')
                : $t('PageHome.GcrNavPlanB')
            }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.rate) }} USD
          </p>

          <p class="text-white-1">
            {{ $t('PageGcrSharesPurchaseListing.PaidAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.amount) }} USD
          </p>
        </div>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { LIST_INVEST_TYPE, WITHDRAW_RECORD_STATE } from '@/utils/const'
import InvestmentService from '@/services/investment-service.js'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage,
      type: LIST_INVEST_TYPE.PAGE_GCR_SHARE_PURCHASE_LISTING
    }
    const res = await InvestmentService.getListInvest(data)
    const list = res.data.items.map((item) => ({
      amount: item.amount,
      balance: item.balance,
      id: item.id,
      created_at: item.created_at,
      order_no: item.order_no,
      status: item.status,
      rate: item.rate,
      contract: item.contract
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
