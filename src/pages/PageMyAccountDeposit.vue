<template>
  <BaseHeader
    class="!bg-none !bg-black-1 text-white-1"
    :title="$t('PageMyAccountDeposit.Title')"
  >
    <template #sub-header>
      <div class="text-center">
        <h3 class="text-size-5 text-white-1 font-bold mb-1">
          {{ $t('PageMyAccountDeposit.SubTitle') }}
        </h3>

        <p class="text-size-8 text-orange-1">
          {{ $formatCurrency(walletStore.wallet.usd) }}
        </p>
      </div>
    </template>
  </BaseHeader>

  <div class="px-5 py-12 grid gap-4">
    <router-link
      :to="{ name: 'PageMyAccountDepositUsdt' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
    >
      <BaseIcon
        name="deposit-usdt"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageMyAccountDeposit.UsdtDeposit') }}
      </span>
    </router-link>

    <router-link
      v-if="LOCALE.ZH_CN === getLocale()"
      :to="{ name: 'PageOtc' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
      style="--bg-color: var(--root-white-1)"
    >
      <BaseIcon
        name="deposit-otc"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('PageMyAccountDeposit.OtcDeposit') }}
      </span>
    </router-link>

    <router-link
      :to="{ name: 'PageMyAccountDepositFiat' }"
      class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center"
      style="--bg-color: var(--root-orange-2)"
    >
      <BaseIcon
        name="deposit-fiat"
        class="fill-black-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-black-1 text-size-5 font-bold">
        {{ $t('PageMyAccountDeposit.FiatDeposit') }}
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { LOCALE } from '@/locales'
import { getLocale } from '@/locales/helpers'
import { useWalletStore } from '@/stores'

const walletStore = useWalletStore()

walletStore.setWallet()
</script>

<style scoped></style>
