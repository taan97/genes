<template>
  <BaseCard>
    <template #top>
      <div class="text-white-1">
        <div class="flex items-center gap-4">
          <BaseIcon
            name="usdt"
            render-as-image
          />
          <span class="text-size-5 font-bold">{{ $t('PageOtc.BuyUsdt') }}</span>
        </div>

        <div class="grid grid-cols-[auto_minmax(0,_1fr)] gap-3 mt-8">
          <div>{{ $t('PageOtc.TotalPrice') }}</div>
          <div class="text-right text-size-4 font-bold">
            {{ $formatCurrency(props.totalPrice) }}
          </div>

          <div>{{ $t('PageOtc.Price') }}</div>
          <div class="text-right">{{ $formatCurrency(props.price) }}</div>

          <div>{{ $t('PageOtc.Quantity') }}</div>
          <div class="text-right">{{ props.quantity }}</div>

          <div>{{ $t('PageOtc.OrderNumber') }}</div>
          <div class="text-right">
            {{ props.orderNumber }}
            <BaseIcon
              name="copy"
              class="inline-block"
              @click="onClickCopy(props.orderNumber)"
            />
          </div>

          <div>{{ $t('PageOtc.OrderTime') }}</div>
          <div class="text-right">{{ props.orderTime }}</div>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import { copyText as onClickCopy } from '@/utils/shared-methods'

const props = defineProps({
  totalPrice: {
    type: String,
    default: ''
  },

  price: {
    type: String,
    default: ''
  },

  quantity: {
    type: String,
    default: ''
  },

  orderNumber: {
    type: String,
    default: ''
  },

  orderTime: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
