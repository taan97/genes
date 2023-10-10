<template>
  <BaseHeader
    :title="$t('PageMyAccountWithdrawalFiat.ListingTitle')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <div
        class="flex items-center gap-1 w-max ml-auto"
        @click="showSelectFilterModal = true"
      >
        <BaseIcon name="filter" />

        <span class="underline text-white-1">{{ $t('Button.Filter') }}</span>
      </div>
    </template>
  </BaseHeader>

  <InfinityList
    ref="listRef"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <p
          v-if="item.status === FIAT_DEPOSIT_STATUS.PENDING"
          class="self-end text-white-1 flex justify-end items-center pb-2"
        >
          {{ $t('Button.Cancel') }}
          <BaseIcon
            name="close-circle"
            width="15"
            height="15"
            class="my-2 ml-2 fill-red-1"
            @click="onClickCancel(item.order_id)"
          />
        </p>

        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ $t('PageMyAccountWithdrawalFiat.WithdrawalAmount') }}
          </p>

          <p class="text-orange-1 font-bold">
            {{ $formatCurrency(item.usdt) }} USDT
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.AdminFee', { number: '3%' }) }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.adminFee) }} USDT
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.VndRate') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.rate) }} VND
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.ReceiveAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatCurrency(item.fiat) }} VND
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.BankName') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.get_bank }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.BankAccountNumber') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.get_account }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.BankAccountName') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all capitalize">
            {{ item.get_name }}
          </p>

          <p class="text-white-1">
            {{ $t('PageMyAccountWithdrawalFiat.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all w-fit flex gap-2 items-center">
            <span>{{ item.displayStatus }}</span>
          </p>
        </div>
      </div>
    </template>
  </InfinityList>

  <BaseDropdown
    v-model:show="showSelectFilterModal"
    :value="currentFilter"
    keyed-by="value"
    translate-item
    :title="$t('Button.Filter')"
    :options="options"
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { FIAT_DEPOSIT_STATUS } from '@/utils/const'
import FiatService from '@/services/fiat-service'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'

const { t } = useI18n()

const showSelectFilterModal = ref(false)
const listRef = ref(null)

const FILTER_STATUS_MAP = {
  ALL: '',
  PENDING: 1,
  UNDER_REVIEW: 2,
  FAILED: 3,
  SUCCESS: 4
}

const DISPLAY_STATUS_MAP = {
  [FIAT_DEPOSIT_STATUS.PENDING]: 'PageMyAccountWithdrawalFiat.StatusPending',
  [FIAT_DEPOSIT_STATUS.REVIEW_FAILED]:
    'PageMyAccountWithdrawalFiat.StatusReviewFailed',
  [FIAT_DEPOSIT_STATUS.APPROVED]: 'PageMyAccountWithdrawalFiat.StatusApproved',
  [FIAT_DEPOSIT_STATUS.COMPLETED]:
    'PageMyAccountWithdrawalFiat.StatusCompleted',
  [FIAT_DEPOSIT_STATUS.CANCELLED]:
    'PageMyAccountWithdrawalFiat.StatusCancelled',
  [FIAT_DEPOSIT_STATUS.UNDER_REVIEW]:
    'PageMyAccountWithdrawalFiat.StatusUnderReview'
}

const currentFilter = ref(FILTER_STATUS_MAP.ALL)

const options = [
  {
    label: 'AppMessage.All',
    value: FILTER_STATUS_MAP.ALL
  },
  {
    label: 'PageMyAccountWithdrawalFiat.FilterStatusPending',
    value: FILTER_STATUS_MAP.PENDING
  },
  {
    label: 'PageMyAccountWithdrawalFiat.FilterStatusUnderReview',
    value: FILTER_STATUS_MAP.UNDER_REVIEW
  },
  {
    label: 'PageMyAccountWithdrawalFiat.FilterStatusFailed',
    value: FILTER_STATUS_MAP.FAILED
  },
  {
    label: 'PageMyAccountWithdrawalFiat.FilterStatusSuccess',
    value: FILTER_STATUS_MAP.SUCCESS
  }
]

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage,
      status: currentFilter.value
    }
    const res = await FiatService.getWithdrawalList(data)
    const list = res.data.items.map((item) => ({
      order_id: item.id,
      usdt: item.usdt,
      rate: item.rate,
      adminFee: item.usdt_fee,
      fiat: item.fait,
      get_bank: item.get_bank,
      get_account: item.get_account,
      get_name: item.get_name,
      status: item.status,
      displayStatus: t(DISPLAY_STATUS_MAP[item.status]),
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
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
    await FiatService.cancelWithdrawalOrder(id)
    listRef.value?.onRefresh()
  } catch {}
}

function doSelectedFilterStatus(text) {
  currentFilter.value = text.value
  listRef.value?.onRefresh()
}
</script>

<style scoped></style>
