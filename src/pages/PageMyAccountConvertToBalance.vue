<template>
  <BaseHeader class="!bg-none !bg-black-1 text-white-1">
    <template #right-action>
      <router-link
        :to="{ name: 'PageMyAccountHistoryConvertToUsdt' }"
        class="flex items-center gap-1 w-max ml-auto"
      >
        <BaseIcon name="listing" />

        <span class="underline text-white-1">{{
          $t('PageMyAccountDepositFiat.List')
        }}</span>
      </router-link>
    </template>
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

  <BaseForm
    class="flex-1 flex flex-col gap-8 p-5"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="form.amount"
      name="amount"
      :placeholder="$t('PageMyAccountConvertToUsdt.InputAmount')"
      :rules="formRules.amount"
    >
      <template #left-icon>
        <BaseIcon name="gcrblack" />
      </template>
      <template #right-icon>
        <button
          type="button"
          class="uppercase text-black-1 underline"
          @click="form.amount = String(Number(walletStore.wallet.ticket))"
        >
          {{ $t('Button.Max') }}
        </button>
      </template>
    </BaseFormInputText>

    <div class="grid grid-cols-[auto_auto_1fr] gap-1">
      <p class="text-white-1">
        {{ $t('PageMyAccountConvertToUsdt.NavPrice') }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(walletStore.wallet.gcr_rate) }}
      </p>

      <p class="text-white-1">
        {{ $t('PageMyAccountConvertToUsdt.ReceiveAmount') }}
      </p>
      <p>:</p>
      <p class="break-all">
        {{ $formatCurrency(walletStore.wallet.gcr_rate * form.amount) }}
      </p>
    </div>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      style="--bg-color: var(--root-white-1)"
    >
      <BaseIcon
        name="usdt"
        class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
      />
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Convert') }}
      </span>
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive } from 'vue'
import { useWalletStore } from '@/stores'
import WalletService from '@/services/wallet-service'
import { useRouter } from 'vue-router'

const walletStore = useWalletStore()
walletStore.setWallet()

const router = useRouter()

const form = reactive({
  amount: ''
})

const formRules = {
  amount: ['required']
}

async function doSubmitted() {
  try {
    await WalletService.convert(Number(form.amount))
    router.go(-1)
  } catch {}
}
</script>

<style scoped></style>
