<template>
  <BaseHeader :title="$t('PageInvestment.UsdtDeposit')" />

  <div class="p-5 pt-0">
    <div class="flex justify-end">
      <p class="text-grey-v-2 text-size-2">
        {{
          $t('PageWallet.Transactions', {
            count: totalRows
          })
        }}
      </p>
    </div>

    <InfinityList @more-requested="doMoreRequested">
      <template #item="{ item }">
        <div class="shadow-inner-dark-v-1 rounded-3xl py-6 px-4 mt-4">
          <div class="flex px-6 gap-2">
            <div class="break-words w-1/2">
              <p class="text-yellow-v-1 font-bold">
                {{ item.balance_type }}
              </p>
              <p>{{ item.act_desc }}</p>
            </div>
            <div class="flex text-end justify-end flex-col">
              <DisplayCurrency :amount="item.amount" />
              <p class="text-size-1 text-grey-v-2">{{ item.created_at }}</p>
            </div>
          </div>
        </div>
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WalletService from '@/services/wallet-service.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const totalRows = ref()

async function doMoreRequested(nextPage, finish) {
  try {
    const res = await WalletService.getChainRecharge({
      pageNumber: nextPage
    })

    totalRows.value = res.data.total

    const list = res.data.items.map((item) => ({
      user_id: item.user_id,
      balance_type: item.balance_type,
      act_desc: t('PageInvestment.Deposit'),
      amount: item.amount,
      process_at: item.process_at,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped></style>
