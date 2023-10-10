<template>
  <template v-if="!Object.keys(props.placementInfo).length">
    <button
      type="button"
      class="flex w-full bg-black-1 rounded-2xl text-size-2 p-2 border-white-1 border shadow-outer-orange-dark-1"
    >
      <p class="h-20 text-white-1 w-full flex items-center justify-center">
        {{ $t('PageTeam.Empty') }}
      </p>
    </button>
  </template>
  <template v-else>
    <button
      type="button"
      class="grid bg-black-1 rounded-2xl text-size-2 gap-0.5 p-2 border-white-1 border shadow-outer-orange-dark-1"
      @click="emit('clicked', props.placementInfo.uid)"
    >
      <p class="text-white-1 text-size-1">{{ $t('PageTeam.TodaySales') }}</p>
      <p class="text-orange-1 break-all">
        {{ $formatNumber(props.placementInfo.today) }}
      </p>

      <template v-if="!props.hideBalance">
        <p class="text-white-1 text-size-1">{{ $t('PageTeam.Balance') }}</p>
        <p class="text-orange-1 break-all">
          {{ $formatNumber(props.placementInfo.bal) }}
        </p>
      </template>

      <p class="text-white-1 text-size-1">{{ $t('PageTeam.TeamSales') }}</p>
      <p class="text-orange-1 break-all">
        {{ $formatNumber(props.placementInfo.total) }}
      </p>

      <p class="bg-orange-1 col-span-full rounded py-1 text-white-1 break-all">
        {{ $formatNumber(props.placementInfo.balance) }}
      </p>
    </button>
  </template>
</template>

<script setup>
const props = defineProps({
  placementInfo: {
    type: Object,
    default: () => ({
      /**
       * uid: null,
       * real_name: '',
       * balance: '0.00',
       * today: '0.00',
       * bal: '0.00',
       * total: '0.00'
       */
    })
  },
  hideBalance: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['clicked'])
</script>

<style scoped></style>
