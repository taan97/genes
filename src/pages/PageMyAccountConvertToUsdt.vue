<template>
  <BaseHeader class="!bg-none !bg-black-1 text-white-1">
    <template #sub-header>
      <div class="text-center">
        <h3 class="text-size-5 text-orange-1 font-bold">
          {{ $t('PageMyAccountConvertToUsdt.Balance') }}
        </h3>
        <p>{{ $t('PageMyAccount.Units') }}</p>
        <p class="text-size-8 text-orange-1">
          {{ $formatCurrency(walletStore.wallet.ticket) }}
        </p>
        <p class="text-pink-1">
          USD {{ $formatCurrency(walletStore.wallet.ticket_usd) }}
        </p>
      </div>
    </template>
  </BaseHeader>

  <div class="p-5 flex flex-col gap-5 flex-1">
    <!-- <router-link
      :to="{ name: 'PageMyAccountConvertToShares' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center mt-12"
    >
      <BaseIcon
        name="conver-gcr"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageMyAccount.ConverttoGcrShares') }}
      </span>
    </router-link> -->

    <router-link
      :to="{ name: 'PageMyAccountConvertToBalance' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center my-1"
      style="--bg-color: var(--root-white-1)"
    >
      <BaseIcon
        name="usdt"
        class="absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageMyAccount.ConverttoUsdt') }}
      </span>
    </router-link>

    <div class="flex flex-1" />
  </div>
</template>

<script setup>
import { useWalletStore } from '@/stores'

const walletStore = useWalletStore()

walletStore.setWallet()
</script>

<style scoped></style>
