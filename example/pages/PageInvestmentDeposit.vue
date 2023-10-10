<template>
  <BaseHeader :title="$t('PageInvestmentDeposit.Title')" />

  <div class="p-5 pt-0">
    <BaseIcon
      class="ml-auto"
      name="record-circle"
      render-as-image
      @click="onClickNavigateToDetail"
    />

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center pt-20 pb-10 mt-20 relative"
    >
      <div class="absolute w-full top-[-52px]">
        <BaseIcon
          class="mx-auto"
          name="deposit-square"
          render-as-image
        />
      </div>

      <p class="text-size-5 text-yellow-v-1 font-bold mb-2">
        {{ $t('PageInvestmentDeposit.CapitalWallet') }}
      </p>

      <p class="text-size-2 mb-8">
        {{ $t('PageInvestmentDeposit.YourAccountBalance') }}
      </p>

      <p class="text-size-5 font-bold mb-2">USD</p>

      <p class="text-size-8">
        {{ $formatCurrency(investmentInfo.wallet.capital) }}
      </p>
    </div>

    <button
      class="self-center bg-gradient-orange shadow-outer-orange-v-1 rounded-lg w-full py-3 px-4 mt-11 mb-5"
      @click="onClickUsdtDeposit"
    >
      <div class="text-size-3 font-bold">
        {{ $t('PageInvestmentDeposit.ButtonUsdtDeposit') }}
      </div>

      <BaseIcon
        name="usdt"
        :fill="'var(--root-white-v-1)'"
        class="absolute top-0 bottom-0 my-auto"
        width="23"
        height="21"
      />
    </button>

    <button
      class="self-center bg-gradient-orange shadow-outer-orange-v-1 rounded-lg w-full py-3 px-4"
      @click="onClickOtcDeposit"
    >
      <div class="text-size-3 font-bold">
        {{ $t('PageInvestmentDeposit.ButtonOtcDeposit') }}
      </div>

      <BaseIcon
        name="otc"
        :fill="'var(--root-white-v-1)'"
        class="absolute top-0 bottom-0 my-auto"
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

function onClickUsdtDeposit() {
  router.push({ name: 'PageUsdtDeposit' })
}

function onClickOtcDeposit() {
  router.push({ name: 'PageOtc' })
}

function onClickNavigateToDetail() {
  router.push({
    name: 'PageInvestmentDepositRecords'
  })
}
</script>

<style scoped></style>
