<template>
  <div class="py-9 px-5 grid grid-cols-2 gap-4">
    <InvestmentChart :data-sets="investmentInfo.income" />

    <button
      class="col-span-full rounded-[20px] bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1 py-4 flex flex-col gap-2 items-center"
      @click="onClickInvest"
    >
      <p class="text-size-3 font-bold">
        {{ $t('PageInvestment.NIGTInvestedAmount') }}
      </p>
      <p class="text-size-2 font-bold">USD</p>
      <p class="text-size-5">
        {{ $formatCurrency(investmentInfo.wallet.balance) }}
      </p>
    </button>

    <router-link
      class="rounded-2.5xl bg-gradient-orange shadow-outer-orange-v-1 text-center p-3 flex flex-col"
      :to="{ name: 'PageFixedIncomeRecords' }"
    >
      <p class="flex-1 text-size-3 font-bold mb-2">
        {{ $t('PageInvestment.InvestmentReturns') }}
      </p>
      <p class="text-size-2 font-bold mb-4">USD</p>
      <p class="text-size-5">
        {{ $formatCurrency(investmentInfo.wallet.static_balance) }}
      </p>
    </router-link>

    <router-link
      class="rounded-2.5xl bg-gradient-orange shadow-outer-orange-v-1 text-center p-3 flex flex-col"
      :to="{ name: 'PageManagementInvestmentRecords' }"
    >
      <p class="flex-1 text-size-3 font-bold mb-2">
        {{ $t('PageInvestment.CommunityIncome') }}
      </p>
      <p class="text-size-2 font-bold mb-4">USD</p>
      <p class="text-size-5">
        {{ $formatCurrency(investmentInfo.wallet.dynamic_balance) }}
      </p>
    </router-link>

    <AutoInvestOption
      :amount="investmentInfo.wallet.auto_static"
      :type="AUTO_INVEST_TYPE.STATIC"
      @succeeded="doUpdateAutoInvestSuccess"
    />

    <AutoInvestOption
      :amount="investmentInfo.wallet.auto_dynamic"
      :type="AUTO_INVEST_TYPE.DYNAMIC"
      @succeeded="doUpdateAutoInvestSuccess"
    />

    <div
      class="col-span-full shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center py-4 flex flex-col gap-2 items-center"
    >
      <p class="text-yellow-v-1 text-size-3 font-bold">
        {{ $t('PageInvestment.CapitalWallet') }}
      </p>

      <p class="text-size-2 font-bold">USD</p>

      <div class="text-size-5">
        {{ $formatCurrency(investmentInfo.wallet.capital) }}
      </div>
    </div>

    <button
      class="bg-gradient-green shadow-outer-green-v-1 rounded-lg py-3 px-4 flex items-center"
      @click="onClickDeposit"
    >
      <BaseIcon
        name="deposit"
        class="fill-white-v-1"
      />
      <div class="flex-1 text-size-3 font-bold">
        {{ $t('PageInvestment.ButtonDeposit') }}
      </div>
    </button>

    <button
      class="bg-gradient-red shadow-outer-red-v-1 rounded-lg py-3 px-4 flex items-center"
      @click="onClickWithdraw"
    >
      <BaseIcon
        name="withdraw"
        class="fill-white-v-1"
      />
      <div class="flex-1 text-size-3 font-bold">
        {{ $t('PageInvestment.ButtonWithdraw') }}
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AUTO_INVEST_TYPE } from '@/utils/const'
import InvestmentService from '@/services/investment-service'

const router = useRouter()

const investmentInfo = ref({
  income: {
    date_at: [],
    balance: [],
    investment: [],
    management: []
  },
  wallet: {
    balance: '',
    capital: '',
    auto_static: '',
    auto_dynamic: '',
    dynamic_balance: '',
    erc_address: '',
    static_balance: '',
    trc_address: '',
    user_id: null
  }
})

const isAutoInvestSelectorModalVisible = ref(false)

getInvestmentInfo()

async function getInvestmentInfo() {
  try {
    const { data } = await InvestmentService.getInvestmentInfo()

    investmentInfo.value = {
      income: {
        date_at: data.income.date_at,
        balance: numberify(data.income.balance),
        investment: numberify(data.income.investment),
        management: numberify(data.income.management)
      },
      wallet: {
        balance: data.wallet.balance,
        capital: data.wallet.capital,
        auto_static: data.wallet.auto_static,
        auto_dynamic: data.wallet.auto_dynamic,
        dynamic_balance: data.wallet.dynamic_balance,
        erc_address: data.wallet.erc_address,
        static_balance: data.wallet.static_balance,
        trc_address: data.wallet.trc_address,
        user_id: data.wallet.user_id
      }
    }
  } catch {}
}

function numberify(source) {
  return source.map((s) => Number(s))
}

function onClickDeposit() {
  router.push({ name: 'PageInvestmentDeposit' })
}

function onClickInvest() {
  router.push({ name: 'PageInvestmentInvest' })
}

function onClickWithdraw() {
  router.push({ name: 'PageInvestmentWithdraw' })
}

function doUpdateAutoInvestSuccess() {
  isAutoInvestSelectorModalVisible.value = true
  getInvestmentInfo()
}
</script>

<style scoped></style>
