<template>
  <BaseHeader
    class="!bg-none !bg-black-1 text-white-1"
    :title="$t('PageMyAccountWithdrawal.Title')"
  >
    <template #sub-header>
      <div class="text-center">
        <h3 class="text-size-5 text-white-1 font-bold mb-1">
          {{ $t('PageMyAccountWithdrawal.SubTitle') }}
        </h3>

        <p class="text-size-8 text-orange-1">
          {{ $formatCurrency(walletService.wallet.usd) }}
        </p>
      </div>
    </template>
  </BaseHeader>

  <div class="px-5 py-12 grid gap-4">
    <router-link
      :to="{ name: 'PageMyAccountWithdrawalUsdt' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
    >
      <BaseIcon
        name="withdrawal-usdt"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageMyAccountWithdrawal.UsdtWithdrawal') }}
      </span>
    </router-link>

    <!-- <router-link
      :to="{ name: 'PageMyAccountWithdrawalFiat' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
      style="--bg-color: var(--root-orange-2)"
    >
      <BaseIcon
        name="withdrawal-fiat"
        class="fill-black-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-black-1 text-size-5 font-bold">
        {{ $t('PageMyAccountWithdrawal.FiatWithdrawal') }}
      </span>
    </router-link> -->
  </div>
</template>

<script setup>
import { useWalletStore } from '@/stores'

const walletService = useWalletStore()
walletService.setWallet()
</script>

<style scoped></style>
