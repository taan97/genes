<template>
  <BaseHeader :title="$t('PageMyAccountDepositUsdt.Title')" />

  <div class="p-5 pt-0 grid gap-4 text-center">
    <p class="pt-4 font-bold text-size-5 text-white-1">
      {{ $t('PageMyAccountDepositUsdt.UsdtTrc20') }}
    </p>

    <QrCode :value="address" />

    <p class="text-orange-v-1 font-bold text-white-1">
      {{ $t('PageMyAccountDepositUsdt.UsdtTrc20Address') }}
    </p>

    <p class="break-all text-white-1">{{ address }}</p>

    <button
      type="button"
      class="relative flex justify-center items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-size-5 shadow-outer-orange-dark-1"
      @click="onClickCopy(address)"
    >
      <BaseIcon
        name="copy-big"
        class="absolute left-4"
      />

      <p class="font-bold">
        {{ $t('PageMyAccountDepositUsdt.CopyAddress') }}
      </p>
    </button>

    <ul class="list-disc ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PageMyAccountDepositUsdt.Notes')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'
import { useWalletStore } from '@/stores'

const walletStore = useWalletStore()
walletStore.setWallet()

const address = computed(() => walletStore.wallet.trc_address)
</script>

<style scoped></style>
