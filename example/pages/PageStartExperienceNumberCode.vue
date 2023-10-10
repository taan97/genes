<template>
  <BaseHeader :title="$t('PageStartExperienceNumberCode.Title')" />

  <div class="p-5 pt-0">
    <router-link
      class="flex justify-end items-center"
      :to="{ name: 'PagePurchaseRecords' }"
    >
      <span class="text-size-1">{{ $t('Button.Records') }}</span>

      <BaseIcon
        name="record-circle"
        render-as-image
      />
    </router-link>

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center pt-20 pb-2 mt-20 px-3 relative"
    >
      <div class="absolute w-full top-[-52px]">
        <BaseIcon
          class="mx-auto"
          name="logo-square"
          render-as-image
          width="100"
          height="100"
        />
      </div>

      <p class="text-size-4 text-yellow-v-1 font-bold mb-2">
        {{ $t('PageStartExperienceNumberCode.CapitalAccountBalance') }}
      </p>

      <p class="text-size-5 mb-6">
        USD
        {{ $formatCurrency(investmentInfo.wallet.capital) }}
      </p>

      <!-- <p class="float-right text-size-1">
      {{
        $t('PageStartExperienceNumberCode.StartExperienceNumberCodeRemaining', {
          number: '5000.00'
        })
      }}
    </p> -->
    </div>

    <BaseInputText
      :ref="formBuyValidation.setFieldRef('amount')"
      v-model="formBuy.amount"
      :placeholder="
        $t('PageStartExperienceNumberCode.EnterPurchaseCodeQuantity')
      "
      :rules="formBuyRules.amount"
      type="number"
      class="mt-2"
    >
      <template #left-icon>
        <BaseIcon name="usd-square-v-2" />
      </template>
    </BaseInputText>

    <div class="flex flex-row mt-1">
      <router-link
        class="text-size-1 font-semibold underline ml-auto"
        :to="{ name: 'PageStartExperienceNumberCodeTermsAndConditions' }"
      >
        {{ $t('PageStartExperienceNumberCode.TermsAndConditions') }}
      </router-link>
    </div>

    <button
      class="self-center rounded-lg w-[258px] py-3 px-4 mt-5 mb-4"
      :class="buyButtonStyle"
      @click="onClickOpenBuyConfirmModal"
    >
      <div class="text-size-3 font-bold">
        {{ $t('PageStartExperienceNumberCode.ButtonBuy') }}
      </div>
    </button>

    <form
      class="flex-1 flex flex-col gap-4 my-6"
      @submit.prevent="onSubmitStartExperienceNumberForm"
    >
      <BaseInputText
        :ref="formStartExperienceNumberValidation.setFieldRef('code')"
        v-model="formStartExperienceNumber.code"
        :placeholder="
          $t(
            'PageStartExperienceNumberCode.EnterTheStartUpExperienceNumberCode'
          )
        "
        :rules="formStartExperienceNumberRules.code"
        class="mt-2"
      >
        <template #left-icon>
          <BaseIcon name="usd-square-v-2" />
        </template>
      </BaseInputText>

      <button
        class="self-center rounded-lg w-[258px] py-3 px-4 mt-5"
        :class="startExperienceNumberButtonStyle"
        type="submit"
      >
        <div class="text-size-3 font-bold">
          {{
            $t(
              'PageStartExperienceNumberCode.ButtonActivateTheExperienceNumber'
            )
          }}
        </div>
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import InvestmentService from '@/services/investment-service'

const { t } = useI18n()

const investmentInfo = ref({
  income: [],
  wallet: {
    balance: '',
    capital: '',
    dynamic_balance: '',
    erc_address: '',
    static_balance: '',
    trc_address: '',
    user_id: null
  }
})

getInvestmentInfo()

const formBuy = reactive({
  amount: ''
})

const formBuyRules = {
  amount: [
    {
      validator: (v) => Number(v) > 0,
      message: () => t('ValidationMessage.AmountNeedsGreaterThanZero')
    }
  ]
}
const formBuyValidation = useFormValidation(formBuyRules)

const isBuyButtonReadyToSubmit = computed(() => {
  return formBuyValidation.getValidationStatus()
})

const buyButtonStyle = computed(() =>
  isBuyButtonReadyToSubmit.value
    ? 'bg-gradient-green shadow-outer-green-v-1 text-white-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none border-2 border-black-v-4'
)

const formStartExperienceNumber = reactive({
  code: ''
})

const formStartExperienceNumberRules = {
  code: ['required']
}
const formStartExperienceNumberValidation = useFormValidation(
  formStartExperienceNumberRules
)

const isStartExperienceNumberButtonReadyToSubmit = computed(() => {
  return formStartExperienceNumberValidation.getValidationStatus()
})

const startExperienceNumberButtonStyle = computed(() =>
  isStartExperienceNumberButtonReadyToSubmit.value
    ? 'bg-gradient-blue shadow-outer-blue-v-1 text-white-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none border-2 border-black-v-4'
)

async function getInvestmentInfo() {
  try {
    const investmentInfoRes = await InvestmentService.getInvestmentInfo()
    investmentInfo.value = {
      income: investmentInfoRes.data.income,
      wallet: {
        balance: investmentInfoRes.data.wallet.balance,
        capital: investmentInfoRes.data.wallet.capital,
        dynamic_balance: investmentInfoRes.data.wallet.dynamic_balance,
        erc_address: investmentInfoRes.data.wallet.erc_address,
        static_balance: investmentInfoRes.data.wallet.static_balance,
        trc_address: investmentInfoRes.data.wallet.trc_address,
        user_id: investmentInfoRes.data.wallet.user_id,
        subscribed: investmentInfoRes.data.wallet.subscribed,
        subscribed_at: investmentInfoRes.data.wallet.subscribed_at,
        subscribed_balance: investmentInfoRes.data.wallet.subscribed_balance
      }
    }
  } catch {}
}

function onClickOpenBuyConfirmModal() {
  const Modal = useConfirmModal()

  Modal.open({
    title: t('PageStartExperienceNumberCode.BuyConfirmTitle'),
    message: t('PageStartExperienceNumberCode.BuyConfirmMessage'),
    buttonText: t('Button.Confirm'),
    headerIcon: 'logo-square',
    buttonClass: 'bg-gradient-green shadow-outer-green-v-1'
  })
    .then(() => {
      onSubmitBuyForm()
    })
    .catch(() => {})
}

async function onSubmitBuyForm() {
  try {
    await InvestmentService.buyExperienceCode(formBuy.amount)
    getInvestmentInfo()
  } catch {}
}

async function onSubmitStartExperienceNumberForm() {
  try {
    await InvestmentService.useExperienceCode(formStartExperienceNumber.code)
    getInvestmentInfo()
  } catch {}
}
</script>

<style scoped></style>
