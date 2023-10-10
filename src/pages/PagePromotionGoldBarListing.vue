<template>
  <LayoutPromotionGoldBar :setups="layoutSetups">
    <div
      class="bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl p-6 m-4 mb-0"
    >
      <h1 class="text-white-1 font-bold text-center text-size-5 m-2">
        {{ $t('PagePromotionGoldBarListing.Title') }}
      </h1>
    </div>

    <InfinityList
      ref="listRef"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <PromotionGoldBarListingItem
          :item="item"
          :checked="selectedId === item.id"
          @selected="doSelectedItem(item.id)"
        />
      </template>
    </InfinityList>
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import PromotionGoldBarService from '@/services/promotion-gold-bar-service'

const router = useRouter()

const layoutSetups = reactive([
  {
    activeIcon: 'active-close',
    inactiveIcon: 'inactive-close',
    active: true,
    label: 'PagePromotionGoldBar.ButtonClose',
    handler: () => {
      router.go(-1)
    }
  },
  {
    activeIcon: 'active-deposit',
    inactiveIcon: 'inactive-deposit',
    active: false,
    label: 'PagePromotionGoldBar.ButtonDeposit',
    handler: () => {}
  },
  {
    activeIcon: 'active-redeem',
    inactiveIcon: 'inactive-redeem',
    active: false,
    label: 'PagePromotionGoldBar.ButtonRedeem',
    handler: handleRedeem
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: false,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: () => {}
  }
])

const listRef = ref(null)
const selectedId = ref('')

watch(
  selectedId,
  (newValue) => {
    const redeemButton = layoutSetups.find(
      (l) => l.activeIcon === 'active-redeem'
    )
    redeemButton.active = Boolean(newValue)
  },
  { immediate: true }
)

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage
    }
    const res = await PromotionGoldBarService.getList(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      amount: item.ticket,
      startTime: item.start_time,
      endTime: item.end_time,
      status: item.status,
      getGold: item.get_gold
    }))

    finish(list, res.data.total)
  } catch {}
}

function doSelectedItem(id) {
  selectedId.value = selectedId.value === id ? '' : id
}

async function handleRedeem() {
  try {
    const { data } = await PromotionGoldBarService.getCancelFee(
      selectedId.value
    )

    router.push({
      name: 'PagePromotionGoldBarListingConfirmCancel',
      query: {
        fee: data.fee,
        gold: data.gold,
        total: data.total,
        id: selectedId.value
      }
    })
  } catch {}
}
</script>

<style scoped></style>
