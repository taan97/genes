<template>
  <div
    class="rounded-xl p-4 my-2 mx-4 border backdrop-blur-[5px]"
    :class="active ? 'bg-black-opacity-2' : 'bg-black-opacity-3'"
  >
    <div class="flex items-center pb-4">
      <BaseFormInputCheckbox
        v-if="active"
        :model-value="props.checked"
        color="var(--root-green-2)"
        @update:model-value="emit('selected')"
      />

      <h3
        class="flex-1 font-bold"
        :class="active ? 'text-white-1' : 'text-grey-5'"
      >
        {{ $t('PagePromotionGoldBarListing.ConvGcr') }}
      </h3>

      <p
        class="font-bold"
        :class="active ? 'text-orange-1' : 'text-grey-5'"
      >
        {{ $formatUnits(props.item.amount) }}
      </p>
    </div>

    <div
      class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-1"
      :class="active ? 'text-white-1' : 'text-black-1'"
    >
      <p>{{ $t('PagePromotionGoldBarListing.StartTime') }}</p>
      <p>:</p>
      <p
        class="break-all"
        :class="active ? 'text-orange-1' : 'text-black-1'"
      >
        {{ $formatDateTime(props.item.startTime) }}
      </p>

      <p>
        {{ $t('PagePromotionGoldBarListing.EndTime') }}
      </p>
      <p>:</p>
      <p
        class="break-all"
        :class="active ? 'text-orange-1' : 'text-black-1'"
      >
        {{ $formatDateTime(props.item.endTime) }}
      </p>

      <p>
        {{ $t('PageMyAccountDepositFiat.Status') }}
      </p>
      <p>:</p>
      <p
        class="break-all"
        :class="active ? 'text-orange-1' : 'text-black-1'"
      >
        {{ STATUS_MAP[props.item.status] }}
      </p>

      <!-- <router-link
        v-if="item.getGold === GET_GOLD_STATUS.OPEN && active"
        :to="{
          name: 'PagePromotionGoldBarClaimRewardForm',
          query: { orderNumber: props.item.id, retry: true }
        }"
        class="col-span-full underline text-red-2"
      >
        {{ $t('PagePromotionGoldBarListing.FillInForm') }}
      </router-link> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: {
    type: Object,
    /**
     * type item = {
     *  id: string|number,
     *  amount: string,
     *  startTime: string,
     *  endTime: string,
     *  status: string|number
     *  getGold: string|number
     * }
     */
    default: () => ({})
  },

  checked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['selected'])

const { t } = useI18n()

// const GET_GOLD_STATUS = {
//   OPEN: 0,
//   FILLED: 1
// }

const STATUS = {
  ACTIVE: 0,
  REDEEMED: 1,
  COMPLETED: 2
}

const STATUS_MAP = {
  [STATUS.ACTIVE]: t('PagePromotionGoldBar.StatusPledging'),
  [STATUS.REDEEMED]: t('PagePromotionGoldBar.StatusRedeemed'),
  [STATUS.COMPLETED]: t('PagePromotionGoldBar.StatusRefundDue')
}

const active = computed(() => props.item.status === STATUS.ACTIVE)
</script>

<style scoped></style>
