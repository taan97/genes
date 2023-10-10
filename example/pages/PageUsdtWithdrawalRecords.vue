<template>
  <BaseHeader :title="$t('PageUsdtWithdrawalRecords.Title')">
    <template #sub-header>
      <div class="flex items-center justify-end">
        <span class="text-size-1">{{ $t('Button.ButtonFilter') }}</span>

        <BaseIcon
          class="inline-block"
          name="filter-circle"
          @click="onClickFilter"
        />
      </div>
    </template>
  </BaseHeader>

  <div class="p-5 pt-0">
    <InfinityList
      ref="usdtWithdrawRecordsRef"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <WithdrawalRecord
          :id="item.id"
          :key="item.id"
          :status="item.status"
          :address="item.address"
          :amount="item.amount"
          :actual-receive="item.actualReceive"
          :handling-fee="item.handlingFee"
          :hash-code="item.hashCode"
          :time="item.time"
          class="mb-3"
          @cancelled="usdtWithdrawRecordsRef.onRefresh"
        />
      </template>
    </InfinityList>
  </div>

  <BaseDropdownDrawer
    v-model:show="showSelectFilterModal"
    v-model:value="currentFilter"
    :title="$t('PageUsdtWithdrawalRecords.Filter')"
    :options="options"
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { WITHDRAW_RECORD_STATE } from '@/utils/const'
import WalletService from '@/services/wallet-service'

const { t } = useI18n()

const showSelectFilterModal = ref(false)

const currentFilter = ref('')
const usdtWithdrawRecordsRef = ref(null)

const options = computed(() => [
  {
    label: t('PageUsdtWithdrawalRecords.StatusPending'),
    value: WITHDRAW_RECORD_STATE.PENDING
  },
  {
    label: t('PageUsdtWithdrawalRecords.StatusRefused'),
    value: WITHDRAW_RECORD_STATE.REFUSED
  },
  {
    label: t('PageUsdtWithdrawalRecords.StatusTransfer'),
    value: WITHDRAW_RECORD_STATE.TRANSFER
  },
  {
    label: t('PageUsdtWithdrawalRecords.StatusCompleted'),
    value: WITHDRAW_RECORD_STATE.COMPLETED
  },
  {
    label: t('PageUsdtWithdrawalRecords.StatusFailed'),
    value: WITHDRAW_RECORD_STATE.FAILED
  },
  {
    label: t('PageUsdtWithdrawalRecords.StatusCancel'),
    value: WITHDRAW_RECORD_STATE.CANCEL
  }
])
async function doMoreRequested(nextPage, finish) {
  try {
    const res = await WalletService.getListWithdrawalRecord({
      page: nextPage,
      status: currentFilter.value
    })

    const list = res.data.items.map((record) => ({
      id: record.id,
      status: {
        label: options.value.find(
          (option) => option.value === record.status.toString()
        ).label,
        value: record.status.toString()
      },
      address: record.address,
      amount: record.amount,
      actualReceive: record.real_money,
      handlingFee: record.fee,
      time: record.created_at,
      hashCode: record.hash
    }))
    finish(list, res.data.total)
  } catch {}
}

function onClickFilter() {
  showSelectFilterModal.value = true
}

function doSelectedFilterStatus() {
  usdtWithdrawRecordsRef.value.onRefresh()
}
</script>

<style scoped></style>
