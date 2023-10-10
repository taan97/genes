<template>
  <BaseHeader
    :title="$t('PageWithdrawalStatementHistory.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <div class="flex items-center justify-end gap-1">
        <BaseIcon
          name="filter"
          @click="showSelectFilterModal = true"
        />

        <span class="underline text-white-1">{{ $t('Button.Filter') }}</span>
      </div>
    </template>
  </BaseHeader>

  <InfinityList
    ref="historyDepositStatement"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="relative bg-black-opacity-1 p-4 my-2">
        <p
          v-if="Number(item.status) === Number(REFUND_STATE.PENDING)"
          class="self-end text-white-1 flex justify-end items-center pb-2"
        >
          {{ $t('Button.Cancel') }}
          <BaseIcon
            name="close-circle"
            width="15"
            height="15"
            class="my-2 ml-2 fill-red-1"
            @click="onClickCancel(item.id)"
          />
        </p>

        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ $t('PageWithdrawalStatementHistory.WithdrawalAmount') }}
          </p>

          <p class="text-orange-1 font-bold">
            - {{ $formatCurrency(item.amount) }} USDT
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageWithdrawalStatementHistory.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageWithdrawalStatementHistory.Address') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.address }}</p>

          <p class="text-white-1">
            {{
              $t('PageWithdrawalStatementHistory.AdminFee', { number: '3%' })
            }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.adminFee) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageWithdrawalStatementHistory.NetworkFee') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.networkFee }} USDT</p>

          <p class="text-white-1">
            {{ $t('PageWithdrawalStatementHistory.ReceiveAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.real_money) }}
            USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageWithdrawalStatementHistory.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.status_desc }}
          </p>

          <template v-if="item.hash">
            <p class="text-white-1">
              {{ $t('PageWithdrawalStatementHistory.HashCode') }}
            </p>
            <p class="text-white-1">:</p>
            <p class="text-orange-1 break-all">{{ item.hash }}</p>
          </template>
        </div>
      </div>
    </template>
  </InfinityList>

  <BaseDropdown
    v-model:show="showSelectFilterModal"
    :value="currentFilter"
    keyed-by="value"
    translate-item
    :title="$t('PageWithdrawalStatementHistory.Filter')"
    :options="options"
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { REFUND_STATE } from '@/utils/const'
import WalletService from '@/services/wallet-service.js'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'

const { t } = useI18n()

const showSelectFilterModal = ref(false)

const currentFilter = ref(REFUND_STATE.COMPLETED)
const historyDepositStatement = ref(null)

const options = [
  {
    label: 'PageMyAccountRefundHistory.Completed',
    value: REFUND_STATE.COMPLETED
  },
  {
    label: 'PageMyAccountRefundHistory.Pending',
    value: REFUND_STATE.PENDING
  },
  {
    label: 'PageMyAccountRefundHistory.Rejected',
    value: REFUND_STATE.REJECTED
  },
  {
    label: 'PageMyAccountRefundHistory.Processing',
    value: REFUND_STATE.PROCESSING
  },
  {
    label: 'PageMyAccountRefundHistory.WithdrawalCompleted',
    value: REFUND_STATE.WITHDRAWAL_COMPLETED
  },
  {
    label: 'PageMyAccountRefundHistory.WithdrawalUnsuccessful',
    value: REFUND_STATE.WITHDRAWAL_UNSUCCESSFULL
  },
  {
    label: 'PageMyAccountRefundHistory.Cancelled',
    value: REFUND_STATE.CANCELLED
  }
]

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      status: currentFilter.value,
      page: nextPage
    }
    const res = await WalletService.getChainWithdraw(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      order_no: item.order_no,
      address: item.address,
      balance_type: item.balance_type,
      amount: item.amount,
      real_money: item.real_money,
      adminFee: item.fee,
      networkFee: '1.00',
      balance: item.balance,
      status: item.status,
      status_desc: item.status_desc,
      hash: item.hash,
      note: item.note,
      notify_at: item.notify_at,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}

function doSelectedFilterStatus(text) {
  currentFilter.value = text.value
  historyDepositStatement.value.onRefresh()
}

async function onClickCancel(id) {
  const Modal = useConfirmModal()

  try {
    await Modal.open({
      message: t('AppMessage.CancelOrderMessage'),
      cancelText: t('Button.No')
    })

    handleCancel(id)
  } catch {}
}
async function handleCancel(id) {
  try {
    await WalletService.cancelChainWithdraw(id)
    historyDepositStatement.value.onRefresh()
  } catch {}
}
</script>

<style scoped></style>
