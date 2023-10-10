<template>
  <div
    class="mt-7 mb-2 pt-8 pb-5 flex max-w-full rounded-2xl bg-black-2 border-gradient-1 shadow-outer-orange-dark-1 text-size-2 gap-2 px-2"
  >
    <p class="text-orange-1 text-size-6 font-semibold -mt-6">
      ({{ $t(tag[position]) }})
    </p>

    <div class="flex flex-col pt-2 w-28 relative">
      <IconUserLevel
        :level="props.eliteDetail.level"
        class="absolute -top-14 mx-auto left-0 right-0"
      />

      <p class="text-white-1 break-all text-size-4 font-bold">
        {{ props.eliteDetail.real_name }}
      </p>
      <p
        class="underline flex gap-2 items-center justify-center text-orange-1 my-2 break-all"
        @click.stop="onClickCopy(props.eliteDetail.uid)"
      >
        {{ props.eliteDetail.uid }}
        <BaseIcon
          name="copy"
          class="fill-white-1"
        />
      </p>
      <p class="text-white-1 bg-orange-1 col-span-full rounded py-1 break-all">
        {{ $formatNumber(props.eliteDetail.balance) }}
      </p>
    </div>
    <div class="flex-1 pt-2">
      <div class="grid grid-cols-[auto_0fr_auto] gap-1">
        <p class="text-white-1 text-right">{{ $t('PageTeam.NoOfUser') }}</p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all text-left">
          {{ props.eliteDetail.area_team }}
        </p>

        <p class="text-white-1 text-right">
          {{ $t('PageTeam.TeamConvGcr') }}
        </p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all text-left">
          {{ $formatCurrency(props.eliteDetail.team_ticket) }}
        </p>

        <p class="text-white-1 text-right">
          {{
            getPlan() === PLAN_TYPE._A
              ? $t('PageTeam.TotalTeamShares')
              : $t('PageTeam.TotalTeamSharesPlanB')
          }}
        </p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all text-left">
          {{ $formatNumber(props.eliteDetail.team_balance) }}
        </p>

        <p class="text-white-1 text-right">
          {{ $t('PageTeam.TeamHighestTier') }}
        </p>
        <p class="text-white-1">:</p>
        <p class="text-orange-1 break-all text-left">
          {{ props.eliteDetail.tier }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText as onClickCopy } from '@/utils/shared-methods'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

const props = defineProps({
  eliteDetail: {
    type: Object,
    default: () => {}
  },

  index: {
    type: Number,
    default: 0
  }
})
const position = ref(props.index % 3)

const tag = {
  0: 'PageTeam.Left',
  1: 'PageTeam.Center',
  2: 'PageTeam.Right'
}
</script>

<style scoped></style>
