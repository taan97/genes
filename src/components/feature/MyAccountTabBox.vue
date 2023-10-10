<template>
  <BaseCollapseExpand v-model:is-expanded="isExpanded">
    <div class="flex justify-between font-bold px-2 py-3">
      <div
        class="grid w-7/12 grid-cols-[auto_auto_1fr] gap-y-4 gap-x-1 text-size-2 break-all"
      >
        <p class="text-size-2 text-white-1">
          {{
            getPlan() === PLAN_TYPE._A
              ? $t('PageMyAccount.GcrShare')
              : $t('PageMyAccount.GcrSharePlanB')
          }}
        </p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">
          {{ $formatNumber(walletStore.wallet.equity) }}
        </p>
        <p
          class="text-pink-1 col-start-3"
          style="word-break: break-word"
        >
          {{ $t('PageMyAccount.Active') }}
          {{ $formatNumber(walletStore.wallet.balance) }}
        </p>

        <p class="text-size-2 text-white-1">
          {{ $t('PageMyAccount.GcrBond') }}
        </p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">
          {{ $formatCurrency(walletStore.wallet.bond) }}
        </p>
        <p class="text-pink-1 col-start-3 break-all">
          USD {{ $formatCurrency(walletStore.wallet.bond_usd) }}
        </p>

        <p class="text-size-2 text-white-1">USDT</p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">
          {{ $formatCurrency(walletStore.wallet.usd) }}
        </p>

        <p class="text-size-2 text-white-1 max-w-fit break-normal">
          {{ $t('PageMyAccount.InvestmentReturns') }}
        </p>
        <p class="text-orange-1">:</p>
        <div class="text-orange-1 break-all">
          <p>{{ $formatCurrency(walletStore.wallet.static_reward) }}</p>
          <p class="text-pink-1 break-normal">
            {{ $t('PageMyAccount.ConvertibleGcr') }}
          </p>
        </div>
      </div>

      <div
        class="w-5/12 flex flex-col gap-1 text-center grow border-l-[1px] border-l-orange-1 text-size-2 justify-center"
      >
        <div class="flex justify-center">
          <IconUserLevel
            :level="walletStore.wallet.level"
            size="big"
          />
        </div>

        <p class="text-pink-1">
          {{ $t('PageMyAccount.Since') }}
          {{ $formatDate(walletStore.wallet.created_at) }}
        </p>
        <p class="text-white-1 pt-2 text-size-3">
          {{ $t('PageMyAccount.TotalInvestmentReturn') }}
        </p>
        <p class="text-orange-1 text-size-3">
          {{ $formatCurrency(walletStore.wallet.total_returns) }}
        </p>
        <p class="text-pink-1">
          {{ $t('PageMyAccount.ConvertibleGcr') }}
        </p>
      </div>
    </div>
  </BaseCollapseExpand>
</template>

<script setup>
import { ref } from 'vue'
import { useWalletStore } from '@/stores'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

const walletStore = useWalletStore()

const isExpanded = ref(true)
</script>

<style scoped></style>
