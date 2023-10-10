<template>
  <BaseHeader :title="$t('PageUsdtDeposit.UsdtDeposit')" />

  <div class="p-5 pt-0">
    <div class="shadow-inner-dark-v-1 rounded-3xl pb-8 text-center">
      <p class="py-5 font-bold text-size-4">
        {{ $t('PageUsdtDeposit.UsdtTrc20') }}
      </p>

      <QrCode
        :value="address"
        icon="usdticon"
      />

      <p class="text-orange-v-1 pt-10 font-bold text-size-4">
        {{ $t('PageUsdtDeposit.UsdtTrc20Address') }}
      </p>

      <p class="px-6 pt-4 break-words">{{ address }}</p>
    </div>

    <div class="flex flex-col gap-2 items-center py-4">
      <div
        class="flex items-center justify-center w-[48px] h-[48px] bg-orange-v-1 rounded-full"
        @click="onClickCopy(address)"
      >
        <BaseIcon
          name="copy"
          width="15"
          height="16"
          render-as-image
          class="fill-white-v-1"
        />
      </div>

      <p>{{ $t('PageReferral.CopyAddress') }}</p>
    </div>

    <ul class="list-decimal ml-4 mt-4 flex flex-col gap-4">
      <li
        v-for="message in $tm('PageUsdtDeposit.UsdtDepositNotes')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import WalletService from '@/services/wallet-service.js'
import { ref } from 'vue'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'

setWalletOverView()

const address = ref('')

async function setWalletOverView() {
  try {
    const res = await WalletService.getWalletOverview()
    address.value = res.data.trc_address
  } catch {}
}
</script>

<style scoped></style>
