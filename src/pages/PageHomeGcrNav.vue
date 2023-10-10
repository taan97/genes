<template>
  <BaseHeader class="!bg-none !bg-black-2 text-white-1">
    <template #sub-header>
      <h2 class="flex flex-col gap-y-4 justify-between items-center pb-2">
        <BaseIcon name="grc-nav" />

        <p class="text-white-1 font-bold text-size-5">
          {{
            getPlan() === PLAN_TYPE._A
              ? $t('PageHome.GcrNav')
              : $t('PageHome.GcrNavPlanB')
          }}
          :
          <span class="text-orange-1"
            >$ {{ $formatCurrency(investmentInfo.nav) }}</span
          >
        </p>
      </h2>
    </template>
  </BaseHeader>

  <div class="bg-black-opacity-1 px-2 py-4">
    <GcrChart :data-sets="investmentInfo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InvestmentService from '@/services/home-service.js'
import dayjs from 'dayjs'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

const investmentInfo = ref({
  date: [],
  nav: [],
  price: []
})

getInvestmentInfo()

async function getInvestmentInfo() {
  try {
    const { data } = await InvestmentService.getInvestmentInfo()
    investmentInfo.value = {
      date: data.date
        .map((item) => {
          return dayjs(item).date() === 1
            ? dayjs(item).format('MMM')
            : dayjs(item).date()
        })
        .reverse(),
      nav: data.nav,
      price: data.price
    }
  } catch {}
}
</script>

<style scoped></style>
