<template>
  <BaseHeader :title="$t('PageManagementInformation.SubordinateRanking')">
    <template #sub-header>
      <div class="flex justify-between">
        <div class="flex items-center gap-2 w-min whitespace-nowrap">
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
            class="fill-yellow-v-1"
          />
        </div>

        <div class="flex items-center">
          <span class="text-size-1">{{ $t('Button.ButtonFilter') }}</span>
          <BaseIcon
            class="inline-block"
            render-as-image
            name="filter-circle"
            @click="showSelectFilterModal = true"
          />
        </div>
      </div>
    </template>
  </BaseHeader>

  <div class="p-5 pt-0">
    <ul class="mt-4 mb-8 px-3 py-2 rounded-3xl shadow-inner-dark-v-1">
      <li
        class="flex items-center text-center px-[16px] py-2 border-b-[1px] border-black-v-4 last:border-none"
      >
        <p class="flex-none text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.MemberId') }}
        </p>
        <p class="flex-auto w-64 text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.LevelUpDown') }}
        </p>
        <p class="flex-auto w-32 text-yellow-v-1 font-bold">
          {{ $t('PageManagementInformation.Date/Time') }}
        </p>
      </li>

      <InfinityList
        ref="subordinateRankingListRef"
        @more-requested="doMoreRequested"
      >
        <template #item="{ item }">
          <li
            class="flex items-center text-center py-2 px-6 border-b-[1px] border-black-v-4 last:border-none"
          >
            <p class="flex-none text-size-1">{{ item.user_id }}</p>

            <p
              class="flex-auto w-80 text-size-1"
              :class="TYPE_MAP[item.type].color"
            >
              {{
                $t(TYPE_MAP[item.type].label, {
                  before: item.before,
                  after: item.after
                })
              }}
            </p>

            <p class="flex-auto w-32 text-size-1 whitespace-pre-line">
              {{ item.created_at }}
            </p>
          </li>
        </template>
      </InfinityList>
    </ul>
  </div>

  <BaseDropdownDrawer
    v-model:show="showSelectFilterModal"
    v-model:value="rankingType"
    :options="options"
    @selected="() => subordinateRankingListRef.onRefresh()"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import UserCenterService from '@/services/user-center-service'
import { SUBORDINATE_RANKING_TYPE } from '@/utils/const.js'

const { t } = useI18n()

const startDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const endDate = ref(dayjs(new Date()).format('YYYY-MM-DD'))
const rankingType = ref(null)
const showSelectFilterModal = ref(false)

const options = computed(() => [
  {
    label: t('PageManagementInformation.All'),
    value: null
  },
  {
    label: t('PageManagementInformation.LevelUp'),
    value: SUBORDINATE_RANKING_TYPE.LEVEL_UP
  },
  {
    label: t('PageManagementInformation.LevelDown'),
    value: SUBORDINATE_RANKING_TYPE.LEVEL_DOWN
  }
])
const subordinateRankingListRef = ref(null)

const TYPE_MAP = {
  [SUBORDINATE_RANKING_TYPE.LEVEL_UP]: {
    label: 'PageManagementInformation.PromoteTo',
    color: 'text-green-v-2'
  },
  [SUBORDINATE_RANKING_TYPE.LEVEL_DOWN]: {
    label: 'PageManagementInformation.DemoteTo',
    color: 'text-red-v-2'
  }
}

async function doMoreRequested(nextPage, finish) {
  try {
    const { data } = await UserCenterService.getSubordinateRankingList({
      startDate: startDate.value,
      endDate: endDate.value,
      pageNumber: nextPage,
      type: rankingType.value
    })

    const list = data.items.map((i) => ({
      user_id: i.user_id,
      after: i.after,
      before: i.before,
      type: i.type,
      created_at: dayjs(i.created_at).format('YYYY-MM-DD\nHH:mm:ss')
    }))

    finish(list, data.total)
  } catch {}
}

function doChangedStartDate(date) {
  startDate.value = date
  subordinateRankingListRef.value.onRefresh()
}

function doChangedEndDate(date) {
  endDate.value = date
  subordinateRankingListRef.value.onRefresh()
}
</script>

<style scoped></style>
