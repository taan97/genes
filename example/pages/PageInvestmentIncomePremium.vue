<template>
  <BaseHeader :title="$t('PageInvestmentIncomePremium.Title')" />

  <div class="p-5 pt-0">
    <router-link
      class="flex justify-end items-center"
      :to="{ name: 'PageSubscriptionRecords' }"
    >
      <span class="text-size-1">{{ $t('Button.Records') }}</span>
      <BaseIcon
        class="inline-block"
        name="record-circle"
        render-as-image
      />
    </router-link>

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center pt-20 pb-3 px-5 mt-20 relative"
    >
      <div class="absolute w-full top-[-52px] left-0">
        <BaseIcon
          class="mx-auto"
          name="subscribe-square"
          render-as-image
          width="100"
          height="100"
        />
      </div>
      <p class="text-size-5 text-yellow-v-1 font-bold mb-2">
        {{ $t('PageInvestmentIncomePremium.SubscriptionAvailableAmount') }}
      </p>
      <p class="text-[22px]">
        USD {{ $formatCurrency(subscribeInfo.subscriptionAvailableAmount) }}
      </p>
      <div class="flex flex-row mt-7">
        <div>
          <p class="text-size-3">
            {{ $formatCurrency(subscribeInfo.subscribedAmount) }}
          </p>
          <p>
            {{ $t('PageInvestmentIncomePremium.Subcribed') }}
          </p>
        </div>
        <div class="ml-auto">
          <p class="text-size-3">
            {{ $formatCurrency(subscribeInfo.totalRebatedAmount) }}
          </p>
          <p>
            {{ $t('PageInvestmentIncomePremium.TotalRebated') }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-6 pb-10">
      <BaseInputText
        :ref="setFieldRef('amount')"
        v-model="form.amount"
        :placeholder="$t('PageInvestmentIncomePremium.FieldSubscribeAmount')"
        :rules="formRules.amount"
        type="number"
        class="mt-2"
      >
        <template #left-icon>
          <BaseIcon
            name="usd-square"
            render-as-image
          />
        </template>

        <template #right-icon>
          <button
            type="button"
            class="text-yellow-v-2"
            @click="onClickMax"
          >
            {{ $t('PageInvestmentIncomePremium.Max') }}
          </button>
        </template>
      </BaseInputText>

      <div class="flex flex-row mt-4">
        <p class="text-grey-v-2 text-size-1">
          {{ $t('PageInvestmentIncomePremium.Minimum') }} USD
          {{ $formatCurrency(minAmount) }}
        </p>

        <router-link
          class="text-size-1 font-semibold underline ml-auto"
          :to="{ name: 'PageInvestmentInvestSubscription' }"
        >
          {{ $t('PageInvestmentIncomePremium.TermsAndConditions') }}
        </router-link>
      </div>
    </div>

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center py-2.5 mb-10"
    >
      <p class="text-yellow-v-1 font-bold">
        {{ $t('PageInvestmentIncomePremium.PremiumReceivable') }}
      </p>
      <p class="text-size-2 font-bold">USD</p>
      <p class="text-size-5">{{ $formatCurrency(premiumReceivable) }}</p>
    </div>

    <button
      v-toggle-active-state:green="getValidationStatus()"
      class="rounded-lg w-[258px] py-3 px-4 mt-6 mb-12 mx-auto block"
      @click="onClickOpenSubscribeConfirmModal"
    >
      <BaseIcon
        name="subscribe"
        class="absolute top-0 bottom-0 my-auto"
      />

      <div class="text-size-3 font-bold">
        {{ $t('PageInvestmentIncomePremium.ButtonSubscribe') }}
      </div>
    </button>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import InvestmentService from '@/services/investment-service'

const { t } = useI18n()

const subscribeInfo = ref({
  subscriptionAvailableAmount: '0.00',
  subscribedAmount: '0.00',
  totalRebatedAmount: '0.00'
})

getSubscribeInfo()

const MIN_AMOUNT = 100

const minAmount = ref(Number(MIN_AMOUNT))

const form = reactive({
  amount: ''
})

const formRules = {
  amount: [
    {
      validator: (v) => Number(v) >= MIN_AMOUNT,
      message: () =>
        t('ValidationMessage.AmountNeedsGreaterThanANumber', {
          number: MIN_AMOUNT
        })
    }
  ]
}

const { setFieldRef, getValidationStatus } = useFormValidation(formRules)

const PREMIUM_RECEIVABLE_RATE = 0.05

const premiumReceivable = computed(() =>
  Number(form.amount * PREMIUM_RECEIVABLE_RATE).toFixed(2)
)

async function getSubscribeInfo() {
  try {
    const { data } = await InvestmentService.getSubscribeInfo()
    subscribeInfo.value = {
      subscriptionAvailableAmount: data.capital,
      subscribedAmount: data.lock_amount,
      totalRebatedAmount: data.rebated
    }
  } catch {}
}

function onClickMax() {
  form.amount = Number(subscribeInfo.value.subscriptionAvailableAmount)
}

function onClickOpenSubscribeConfirmModal() {
  const Modal = useConfirmModal()

  Modal.open({
    title: t('PageInvestmentIncomePremium.SubscribeConfirmTitle'),
    message: t('PageInvestmentIncomePremium.SubscribeConfirmMessage', {
      number: form.amount
    }),
    buttonText: t('Button.Confirm'),
    headerIcon: 'subscribe-square',
    buttonClass: 'bg-gradient-green shadow-outer-green-v-1'
  })
    .then(() => {
      onSubmitSubscribeForm()
    })
    .catch(() => {})
}

async function onSubmitSubscribeForm() {
  try {
    await InvestmentService.subscribe(form.amount)
    getSubscribeInfo()
  } catch {}
}
</script>

<style scoped></style>
