<template>
  <BaseCollapseExpand v-model:is-expanded="isExpanded">
    <div class="grid grid-cols-2 items-center font-bold px-2 py-4">
      <div class="grid grid-cols-[auto_0fr_auto] gap-y-4 grow pr-1 gap-x-1">
        <p class="text-size-2 text-white-1">{{ $t('PageTeam.NoofUsers') }}</p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">
          {{ props.eliteDetail.area_team }}
        </p>

        <p class="text-size-2 text-white-1">
          {{ $t('PageTeam.DevCommLvl') }}
        </p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">{{ props.eliteDetail.develop }}</p>

        <p class="text-size-2 text-white-1">
          {{ $t('PageTeam.EliteComm') }}
        </p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">{{ props.eliteDetail.elite }}</p>

        <p class="text-size-2 text-white-1">{{ $t('PageTeam.PimtComm') }}</p>
        <p class="text-orange-1">:</p>
        <p class="text-orange-1 break-all">{{ props.eliteDetail.pimt }}</p>
      </div>

      <div
        class="flex flex-col gap-1 text-center grow border-l border-l-orange-1 h-full justify-center px-1"
      >
        <div class="flex justify-center">
          <IconUserLevel :level="props.eliteDetail.level" />
        </div>

        <p class="text-size-2 text-pink-1">
          {{ $t('PageTeam.Since') }}
          {{ $formatDate(props.eliteDetail.level_at) }}
        </p>
        <p class="text-size-2 text-white-1 font-bold whitespace-pre-line">
          {{ $t(props.tabName) }}
        </p>
        <p class="text-size-5 text-orange-1">
          {{ $formatCurrency(props.commissionIncome) }}
        </p>
        <p class="text-size-2 text-pink-1">
          {{ $t('PageTeam.ConvertibleBond') }}
        </p>
      </div>
    </div>
  </BaseCollapseExpand>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  eliteDetail: {
    type: Object,
    default: () => ({
      /**
       * register_at: '',
       * uid: 0,
       * real_name: '',
       * area_child: 0,
       * area_child_balance: '',
       * area_team: 12,
       * balance: 0,
       * income: 0.0,
       * develop: 10,
       * elite: 0,
       * pimt: 0,
       * level: 0
       *
       */
    })
  },

  tabName: {
    type: String,
    default: ''
  },

  commissionIncome: {
    type: String,
    default: ''
  }
})

const isExpanded = ref(true)
</script>

<style scoped></style>
