<template>
  <BaseCard :is-expanded="props.isExpanded">
    <template #top>
      <div>
        <div class="flex items-center gap-4">
          <BaseIcon
            name="usdticon"
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
              width="13"
              height="13"
              class="inline-block fill-orange-v-1"
              @click="onClickCopy(props.orderNumber)"
            />
          </div>
        </div>
      </div>
    </template>

    <template #bottom-header>
      <div class="flex gap-4 justify-between w-full pr-6">
        <div class="flex-1">{{ $t('PageOtc.PaymentMethod') }}</div>

        <BaseIcon
          name="card"
          render-as-image
          class="inline-block"
        />

        <span>{{ $t('PageOtc.BankCard') }}</span>
      </div>
    </template>

    <template #bottom-content>
      <div class="grid grid-cols-[auto_minmax(0,_1fr)] gap-3 mt-4">
        <div>{{ $t('PageOtc.SellerName') }}</div>
        <div class="text-right">
          {{ props.paymentName }}
          <BaseIcon
            name="copy"
            width="13"
            height="13"
            class="inline-block fill-orange-v-1"
            @click="onClickCopy(props.paymentName)"
          />
        </div>

        <div>{{ $t('PageOtc.BankCardNumber') }}</div>
        <div class="text-right">
          {{ props.paymentAccount }}
          <BaseIcon
            name="copy"
            width="13"
            height="13"
            class="inline-block fill-orange-v-1"
            @click="onClickCopy(props.paymentAccount)"
          />
        </div>

        <div>{{ $t('PageOtc.DepositaryBank') }}</div>
        <div class="text-right uppercase">
          {{ props.paymentBank }}
          <BaseIcon
            name="copy"
            width="13"
            height="13"
            class="inline-block fill-orange-v-1"
            @click="onClickCopy(props.paymentBank)"
          />
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import { copyText as onClickCopy } from '@/utils/shared-methods'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  },
  /* eslint-disable vue/require-default-prop */
  totalPrice: String,
  price: String,
  quantity: String,
  orderNumber: String,
  paymentName: String,
  paymentAccount: String,
  paymentBank: String
  /* eslint-enable vue/require-default-prop */
})
</script>

<style scoped></style>
