<template>
  <BaseHeader
    class=""
    :title="$t('PageInvestmentWithdraw.Title')"
  />

  <div class="p-5 pt-0">
    <BaseIcon
      class="ml-auto"
      name="record-circle"
      render-as-image
      @click="onNavigateDetail"
    />

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center pt-20 pb-10 mt-20 relative"
    >
      <div class="absolute w-full top-[-52px]">
        <BaseIcon
          class="mx-auto"
          name="withdraw-square"
          render-as-image
        ></BaseIcon>
      </div>
      <p class="text-size-5 text-yellow-v-1 font-bold mb-2">
        {{ $t('PageInvestmentWithdraw.CapitalWallet') }}
      </p>
      <p class="text-size-2 mb-8">
        {{ $t('PageInvestmentWithdraw.YourAccountBalance') }}
      </p>
      <p class="text-size-5 font-bold mb-2">USD</p>
      <p class="text-size-8">
        {{ $formatCurrency(investmentInfo.wallet.capital) }}
      </p>
    </div>

    <button
      class="self-center bg-gradient-orange shadow-outer-orange-v-1 rounded-lg w-full py-3 px-4 mt-11 mb-5"
      @click="onClickUsdtWithdrawal"
    >
      <div class="text-size-3 font-bold">
        {{ $t('PageInvestmentWithdraw.ButtonUsdtWithdrawal') }}
      </div>

      <BaseIcon
        name="usdt"
        :fill="'var(--root-white-v-1)'"
        class="absolute top-0 bottom-0 my-auto"
        width="23"
        height="21"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseIcon from '../components/shared/BaseIcon.vue'
import InvestmentService from '@/services/investment-service'

const router = useRouter()

const investmentInfo = ref({
  income: [],
  wallet: {
    balance: '',
    capital: '',
    dynamic_balance: '',
    erc_address: '',
    static_balance: '',
    trc_address: '',
    user_id: null
  }
})

getInvestmentInfo()

async function getInvestmentInfo() {
  try {
    const investmentInfoRes = await InvestmentService.getInvestmentInfo()
    investmentInfo.value = {
      income: investmentInfoRes.data.income,
      wallet: {
        balance: investmentInfoRes.data.wallet.balance,
        capital: investmentInfoRes.data.wallet.capital,
        dynamic_balance: investmentInfoRes.data.wallet.dynamic_balance,
        erc_address: investmentInfoRes.data.wallet.erc_address,
        static_balance: investmentInfoRes.data.wallet.static_balance,
        trc_address: investmentInfoRes.data.wallet.trc_address,
        user_id: investmentInfoRes.data.wallet.user_id
      }
    }
  } catch {}
}

function onClickUsdtWithdrawal() {
  router.push({ name: 'PageUsdtWithdrawal' })
}

function onNavigateDetail() {
  router.push({
    name: 'PageUsdtWithdrawalRecords'
  })
}
</script>

<style scoped></style>
