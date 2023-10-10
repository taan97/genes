<template>
  <BaseHeader />

  <div class="text-center p-5">
    <BaseIcon
      name="investment-report-big"
      class="left-0 right-0 mx-auto"
      render-as-image
    />

    <p class="text-size-4 pt-6 pb-8">
      {{ $t('PageOverview.InvestmentEstatements') }}
    </p>

    <ul class="flex flex-col gap-4">
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <InvestmentEstatementItem
          :file-url="item.url"
          :file-title="item.name"
          :file-status="item.status"
          :file-id="item.id"
          @generating-started="() => setIntervalBillList()"
          @previewed="() => doPreviewed(item.url)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import UserCenterService from '@/services/user-center-service'
import { ESTATEMENT_STATUS } from '@/utils/const.js'
import { useApiFetchInterval } from '@/utils/composables/use-api-fetch-interval.js'

const router = useRouter()
const list = ref([])

const areAllGenerated = computed(
  () => !list.value.some((l) => l.status === ESTATEMENT_STATUS.GENERATING)
)

const { startInterval: setIntervalBillList } = useApiFetchInterval({
  callback: setBillList,
  ms: 10000,
  conditionToStop: areAllGenerated
})

setIntervalBillList()

function doPreviewed(url) {
  const href = router.resolve({
    name: 'PagePdfViewer',
    query: { src: url, blank: true }
  }).href

  window.open(href, '_blank')
}

async function setBillList() {
  try {
    const res = await UserCenterService.getBillList()

    list.value = res.data.items.map((item) => ({
      name: item.name,
      url: item.url,
      status: item.status,
      id: item.id
    }))
  } catch {}
}
</script>

<style scoped></style>
