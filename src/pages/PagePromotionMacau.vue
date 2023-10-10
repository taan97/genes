<template>
  <BaseHeader class="text-white-1" />

  <img
    src="@/assets/images/three-coins.png"
    class="w-[64%] mx-auto"
  />

  <div class="flex-1 flex flex-col gap-5 p-5 pt-0">
    <h1 class="text-white-1 text-size-6 font-bold text-center">
      {{ $t('PagePromotionMacau.MainTitle') }}
    </h1>

    <router-link
      :to="{ name: 'PagePromotionMacauTerms' }"
      class="rounded-full p-3 border-gradient-1 w-[18rem] mx-auto text-orange-1 text-size-5 text-center font-bold"
    >
      {{ $t('PagePromotionMacau.CreateNewOrder') }}
    </router-link>

    <router-link
      :to="{ name: 'PagePromotionMacauListing' }"
      class="flex gap-2 items-center max-w-max ml-auto"
    >
      <BaseIcon name="listing" />
      <span class="underline text-white-1">
        {{ $t('PageShareCertificate.Listing') }}
      </span>
    </router-link>

    <InfinityList @more-requested="doMoreRequested">
      <template #item="{ item }">
        <div
          class="bg-transparent rounded-md border border-yellow-1 backdrop-blur px-4 pb-4 mb-4 flex flex-col gap-4 items-center text-white-1 text-size-5"
        >
          <div
            class="rounded-b-md bg-gradient-brown text-white-1 text-center font-bold text-size-4 py-1 px-2"
          >
            {{ $t('App.Order') }} {{ item.id }}
          </div>

          <h3 class="font-semibold">
            {{ $t('PagePromotionMacau.DepositBalance') }}
          </h3>
          <p class="font-bold text-size-8">
            <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
            {{ $formatNumber(item.amount) }}/{{
              $formatNumber(PROMOTION_MACAU_AMOUNT)
            }}
            USD
          </p>

          <div class="flex gap-2 text-center">
            <router-link
              :to="{
                name: 'PagePromotionMacauDeposit',
                query: { orderNumber: item.id, amount: item.amount }
              }"
              class="rounded-full py-2 px-3 mx-auto text-size-4 font-semibold flex items-center"
              :class="
                item.status === PROMOTION_MACAU_ORDER_STATUS.INSUFFICIENT
                  ? 'border-gradient-1 text-orange-1'
                  : 'bg-black-2 text-grey-4 pointer-events-none'
              "
            >
              {{ $t('Button.DepositMore') }}
            </router-link>

            <router-link
              :to="{
                name: 'PagePromotionMacauPurchaseGcr',
                query: {
                  orderNumber: item.id,
                  amount: item.number,
                  rate: item.rate
                }
              }"
              class="rounded-full py-2 px-3 mx-auto text-size-4 font-semibold flex items-center"
              :class="
                item.status === PROMOTION_MACAU_ORDER_STATUS.INVESTING
                  ? 'border-gradient-1 text-orange-1'
                  : 'bg-black-2 text-grey-4 pointer-events-none'
              "
            >
              {{ $t('PagePromotionMacau.PurchaseGcr') }}
            </router-link>

            <router-link
              :to="{
                name: 'PagePromotionMacauClaimRewardForm',
                query: {
                  orderNumber: item.id
                }
              }"
              class="rounded-full py-2 px-3 mx-auto text-size-4 font-semibold flex items-center"
              :class="
                item.gold === 0
                  ? 'border-gradient-1 text-orange-1'
                  : 'bg-black-2 text-grey-4 pointer-events-none'
              "
            >
              {{
                item.gold === 0
                  ? $t('PagePromotionMacau.ClaimReward')
                  : $t('PagePromotionMacau.RewardReceived')
              }}
            </router-link>
          </div>
        </div>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import PromotionMacauService from '@/services/promotion-macau-service.js'
import {
  PROMOTION_MACAU_ORDER_STATUS,
  PROMOTION_MACAU_AMOUNT
} from '@/utils/const.js'

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage
    }
    const res = await PromotionMacauService.getList(data)

    const list = res.data.items.map((item) => ({
      id: item.order_no,
      amount: item.amount,
      gold: item.gold,
      number: item.number,
      rate: item.rate,
      status: item.status,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
