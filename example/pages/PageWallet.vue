<template>
  <div class="pt-12 pb-4">
    <div class="shadow-inner-dark-v-1 rounded-3xl p-4 mx-5 mb-2">
      <div class="text-center">
        <p class="text-size-5 text-orange-v-1 font-bold">
          {{ $t('PageWallet.TotalAsset') }}
        </p>

        <p class="text-size-2">
          {{ $t('PageWallet.YourAccountBalance') }}
        </p>

        <p class="text-size-6">
          {{ $formatCurrency(informationWallet.total) }}
        </p>
      </div>

      <div class="flex justify-between px-6 pt-6">
        <div class="flex flex-col">
          <p class="text-size-4 text-center">
            {{ $formatCurrency(informationWallet.investment) }}
          </p>

          <p class="text-size-2">{{ $t('PageWallet.Investment') }}</p>
        </div>

        <div class="flex flex-col">
          <p class="text-size-4 text-center">
            {{ $formatCurrency(informationWallet.income) }}
          </p>

          <p class="text-size-2">{{ $t('PageWallet.Income') }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-between py-2 px-5 sticky top-0 z-[2] bg-black-v-2">
      <div class="flex items-center gap-2">
        <DateTimePicker
          :title="$t('PageWallet.StartDate')"
          :content="startDate"
          @changed="doChangedStartDate"
        />
        <span>-</span>
        <DateTimePicker
          :title="$t('PageWallet.EndDate')"
          :content="endDate"
          @changed="doChangedEndDate"
        />
        <BaseIcon
          name="arrow-down-small"
          render-as-image
          class="fill-yellow-v-1"
        />
      </div>

      <p class="flex justify-end items-center">
        {{ $t('PageWallet.Filter') }}
        <BaseIcon
          name="filter-circle"
          width="44"
          height="44"
          @click="onClickFilter"
        />
      </p>
    </div>

    <ul class="mb-9 py-2 rounded-3xl shadow-inner-dark-v-1 mx-5">
      <li
        class="flex items-center text-center px-[16px] py-2 border-b-[1px] border-black-v-4 last:border-none"
      >
        <p class="text-yellow-v-1 font-bold w-1/3">
          {{ $t('PageWallet.Records') }}
        </p>
        <p class="text-yellow-v-1 font-bold w-1/3">
          {{ $t('PageWallet.Amount') }}
        </p>
        <p class="text-yellow-v-1 font-bold w-1/3">
          {{ $t('PageWallet.Date/Time') }}
        </p>
      </li>
      <InfinityList
        ref="walletListRef"
        @more-requested="doMoreRequested"
      >
        <template #item="{ item }">
          <li
            class="grid grid-cols-3 items-center text-center py-3 px-6 border-b border-black-v-4 last:border-none"
            @click="onNavigateDetail(item)"
          >
            <div class="break-words">
              <p class="text-yellow-v-1 font-bold">{{ item.balance_type }}</p>
              <p>{{ item.act_desc }}</p>
            </div>
            <DisplayCurrency :amount="item.amount" />
            <p class="break-words">{{ item.created_at }}</p>
          </li>
        </template>
      </InfinityList>
    </ul>
  </div>

  <BaseDropdownDrawer
    v-model:show="isFilterVisible"
    v-model:value="selectedFilter"
    :options="walletStore.actType"
    :title="$t('PageWallet.Filter')"
    @selected="doSelected"
  />
</template>

<script setup>
import { ref } from 'vue'
import WalletService from '@/services/wallet-service.js'
import { useRouter } from 'vue-router'
import { useWalletStore } from '@/stores'
import dayjs from 'dayjs'

const router = useRouter()
const walletStore = useWalletStore()

const isFilterVisible = ref(false)

const selectedFilter = ref('')

var informationWallet = ref({
  total: '0.00',
  investment: '0.00',
  balance: '0.00',
  user_id: null,
  capital: '0.00',
  income: '0'
})

const walletListRef = ref(null)

const startDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const endDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))

setWalletOverView()

async function doMoreRequested(nextPage, finish) {
  try {
    await walletStore.setActType()
    const res = await WalletService.getWalletDetail({
      start_time: startDate.value,
      end_time: endDate.value,
      page: nextPage
    })

    const list = res.data.items.map((item) => ({
      user_id: item.user_id,
      balance_type: item.balance_type,
      act_type: item.act_type,
      act_desc: item.act_desc,
      amount: item.amount,
      process_at: item.process_at,
      created_at: item.created_at
    }))

    finish(list, res.data.total)
  } catch {}
}

async function setWalletOverView() {
  try {
    const information = await WalletService.getWalletOverview()
    informationWallet.value = information.data
  } catch {}
}

function onClickFilter() {
  isFilterVisible.value = true
}

function doSelected(item) {
  router.push({
    name: 'PageWalletRecords',
    query: {
      balance_type: '',
      act_type: item.value,
      process_at: ''
    }
  })
}

function onNavigateDetail(item) {
  router.push({
    name: 'PageWalletRecords',
    query: {
      balance_type: item.balance_type,
      act_type: item.act_type,
      process_at: item.process_at
    }
  })
}

function doChangedStartDate(date) {
  startDate.value = date
  walletListRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  walletListRef.value.onRefresh()
}
</script>

<style scoped></style>
