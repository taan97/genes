<template>
  <BaseHeader
    class="!bg-none !bg-black-1 text-white-1"
    :title="$t('PageMyAccountPurchaseGcrUnits.Title')"
  >
    <template #sub-header>
      <div class="text-center">
        <h3 class="text-size-5 text-orange-1 font-bold mb-2">
          {{ $t('PageMyAccountPurchaseGcrUnits.SubTitle') }}
        </h3>

        <div class="grid grid-cols-2">
          <div>
            <span>USDT</span>
            <p class="text-size-8 text-orange-1">
              {{ $formatCurrency(walletStore.wallet.usd) }}
            </p>
          </div>

          <div>
            <span>{{
              $t('PageMyAccountPurchaseGcrUnits.ConvertibleBond')
            }}</span>
            <p class="text-size-8 text-orange-1">
              {{ $formatCurrency(walletStore.wallet.ticket) }}
            </p>
            <p class="text-pink-1">
              {{ $formatCurrency(walletStore.wallet.ticket_usd) }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </BaseHeader>

  <div class="px-5 py-12 grid gap-4">
    <router-link
      :to="{ name: 'PageMyAccountPurchaseViaUsdt' }"
      class="rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
    >
      <BaseIcon
        name="buy-via-usdt"
        class="fill-orange-1"
      />
      <span class="flex-1 text-orange-1 text-size-5 text-center font-bold">
        {{ $t('PageMyAccountPurchaseGcrUnits.PurchaseViaConvertibleBond') }}
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { useWalletStore } from '@/stores'

const walletStore = useWalletStore()
walletStore.setWallet()
</script>

<style scoped></style>
