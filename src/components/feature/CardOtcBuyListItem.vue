<template>
  <div class="bg-black-opacity-1 p-4 text-white-1">
    <div class="flex items-center gap-4">
      <div
        class="font-bold text-size-4 rounded-full bg-orange-1 w-[30px] h-[30px] leading-[30px] text-center uppercase"
      >
        {{ firstSellerNameCharacter }}
      </div>
      <span class="flex-1 text-size-3 font-bold">
        {{ props.sellerName }}
      </span>
    </div>

    <div class="grid grid-cols-[minmax(0,_1fr)_auto] gap-2 mt-8 mb-4">
      <div>
        {{ $t('PageOtc.Quantity') }} {{ props.availableAmount }}
        {{ $formatCurrency(props.remain) }} USDT
      </div>
      <div class="text-right">
        {{ $t('PageOtc.UnitPrice') }}
      </div>

      <div>
        {{ $t('PageOtc.Limit') }} {{ props.limitMin }} -
        {{ props.limitMax }}
      </div>
      <div class="text-size-4 font-bold text-right">
        {{ props.unitPrice }}
      </div>
    </div>

    <div class="flex justify-between items-end mb-2 text-orange-1">
      <BaseIcon name="card" />
      <button
        type="button"
        class="border-gradient-1 rounded-full text-size-4 px-8 py-1"
        style="--bg-color: var(--root-black-2)"
        @click="emit('clicked')"
      >
        {{ $t('PageOtc.ButtonBuy') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /* eslint-disable vue/require-default-prop */
  sellerName: String,
  availableAmount: String,
  limitMin: String,
  limitMax: String,
  unitPrice: String,
  remain: String
  /* eslint-enable vue/require-default-prop */
})

const emit = defineEmits(['clicked'])

const firstSellerNameCharacter = computed(() => props.sellerName[0] || '')
</script>

<style scoped></style>
