<template>
  <BaseHeader
    :title="$t('PageMyAccountDepositFiat.ListingTitle')"
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
      <div class="relative bg-black-opacity-1 px-4 pb-4 pt-2 my-2">
        <p
          v-if="item.status === FIAT_DEPOSIT_STATUS.PENDING"
          class="self-end text-white-1 flex justify-end items-center pb-2"
          @click="onClickCancel(item.order_id)"
        >
          {{ $t('Button.Cancel') }}
          <BaseIcon
            name="close-circle"
            width="15"
            height="15"
            class="my-2 ml-2 fill-red-1"
          />
        </p>

        <h2 class="flex justify-between items-center">
          <p class="text-white-1 font-bold">
            {{ $t('PageMyAccountDepositFiat.DepositAmount') }}
          </p>

          <p class="text-orange-1 font-bold">
            {{ $formatCurrency(item.fiat) }} {{ item.currency }}
          </p>
        </h2>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageMyAccountDepositFiat.DateTime') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <template v-if="item.status === FIAT_DEPOSIT_STATUS.COMPLETED">
            <p class="text-white-1">
              {{ $t('PageMyAccountDepositFiat.ReceiveAmount') }}
            </p>
            <p class="text-white-1">:</p>
            <p class="text-orange-1 break-all">{{ item.usdt }} USDT</p>
          </template>

          <p class="text-white-1">
            {{ $t('PageMyAccountDepositFiat.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all w-fit">
            {{ item.displayStatus }}
          </p>
        </div>

        <a
          v-if="item.status === FIAT_DEPOSIT_STATUS.PENDING"
          :href="item.get_account"
          target="blank"
          class="absolute right-4 bottom-4 underline underline-offset-4 text-orange-1 font-bold self-end flex w-fit items-center"
          >{{ $t('PageMyAccountDepositFiat.GoPay') }}</a
        >
      </div>
    </template>
  </InfinityList>

  <BaseDropdown
    v-model:show="showSelectFilterModal"
    :value="currentFilter"
    keyed-by="value"
    translate-item
    :title="$t('PageMyAccountDepositFiat.Filter')"
    :options="options"
    @selected="doSelectedFilterStatus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FIAT_DEPOSIT_STATUS } from '@/utils/const'
import FiatService from '@/services/fiat-service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showSelectFilterModal = ref(false)
const listRef = ref(null)

const FILTER_STATUS_MAP = {
  ALL: '',
  PENDING: 0,
  CANCELLED: 5,
  COMPLETED: 3
}

const DISPLAY_STATUS_MAP = {
  [FIAT_DEPOSIT_STATUS.PENDING]: 'PageMyAccountDepositFiat.StatusPending',
  [FIAT_DEPOSIT_STATUS.REVIEW_FAILED]:
    'PageMyAccountDepositFiat.StatusReviewFailed',
  [FIAT_DEPOSIT_STATUS.APPROVED]: 'PageMyAccountDepositFiat.StatusApproved',
  [FIAT_DEPOSIT_STATUS.COMPLETED]: 'PageMyAccountDepositFiat.StatusCompleted',
  [FIAT_DEPOSIT_STATUS.CANCELLED]: 'PageMyAccountDepositFiat.StatusCancelled',
  [FIAT_DEPOSIT_STATUS.UNDER_REVIEW]:
    'PageMyAccountDepositFiat.StatusUnderReview'
}

const currentFilter = ref(FILTER_STATUS_MAP.ALL)

const options = [
  {
    label: 'AppMessage.All',
    value: FILTER_STATUS_MAP.ALL
  },
  {
    label: 'PageMyAccountDepositFiat.FilterStatusPending',
    value: FILTER_STATUS_MAP.PENDING
  },

  {
    label: 'PageMyAccountDepositFiat.FilterStatusFailed',
    value: FILTER_STATUS_MAP.CANCELLED
  },
  {
    label: 'PageMyAccountDepositFiat.FilterStatusSuccess',
    value: FILTER_STATUS_MAP.COMPLETED
  }
]

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage,
      status: currentFilter.value
    }
    const res = await FiatService.getDepositList(data)
    const list = res.data.items.map((item) => ({
      order_id: item.order_id,
      usdt: item.usdt,
      rate: item.rate,
      fiat: item.fait,
      get_bank: item.get_bank,
      get_account: item.get_account,
      get_name: item.get_name,
      status: item.status,
      displayStatus: t(DISPLAY_STATUS_MAP[item.status]),
      created_at: item.created_at,
      currency: item.currency
    }))

    finish(list, res.data.total)
  } catch {}
}

function doSelectedFilterStatus(text) {
  currentFilter.value = text.value
  listRef.value?.onRefresh()
}

async function onClickCancel(order_id) {
  try {
    await FiatService.cancelDepositOrder(order_id)
    listRef.value?.onRefresh()
  } catch {}
}
</script>

<style scoped></style>
