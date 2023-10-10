<template>
  <BaseHeader :title="$t('PageInvestmentInvest.Title')" />

  <div class="p-5 pt-0">
    <div class="flex justify-end items-center">
      <span class="text-size-1">{{ $t('PageInvestmentInvest.Records') }}</span>

      <BaseIcon
        name="record-circle"
        render-as-image
        @click="onNavigateDetail"
      />
    </div>
    <router-link
      v-if="userStore.experience === 1"
      class="block ml-auto w-min whitespace-nowrap text-size-1 py-2"
      :to="{ name: 'PageStartExperienceNumberCodeTermsAndConditions' }"
    >
      <p class="underline underline-offset-1 px-2">
        {{ $t('PageInvestmentInvest.AccountTermsAndConditions') }}
      </p>
    </router-link>

    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center pt-20 pb-10 mt-20 relative"
    >
      <div class="absolute w-full top-[-52px]">
        <BaseIcon
          class="mx-auto"
          name="investment-big"
          render-as-image
          width="100"
          height="100"
        />
      </div>

      <p class="text-size-5 text-yellow-v-1 font-bold mb-2">
        {{ $t('PageInvestmentInvest.NIGTInvestedAmount') }}
      </p>
      <p class="text-[26px] mb-2">
        USD {{ $formatCurrency(investmentInfo.wallet.balance) }}
      </p>
    </div>

    <div
      class="flex flex-col gap-2 mt-6 pb-7 border-b border-solid border-black-v-4 border-opacity-50"
    >
      <BaseInputText
        :ref="setFieldRef('amount')"
        v-model="form.amount"
        :formatter="formatTwoDecimals"
        :placeholder="$t('PageInvestmentInvest.FieldInvestmentAmount')"
        :rules="formRules.amount"
        type="number"
        class="mt-2"
      >
        <template #left-icon>
          <BaseIcon name="usd-square"></BaseIcon>
        </template>
      </BaseInputText>

      <p class="text-grey-v-2 mt-4">
        {{ $t('PageInvestmentInvest.CapitalWalletAmount') }}: USD
        {{ $formatCurrency(investmentInfo.wallet.capital) }}
      </p>

      <p
        v-if="hasSubscribed"
        class="text-grey-v-2"
      >
        {{ $t('PageInvestmentInvest.AmountSubscribed') }}: USD
        {{ $formatCurrency(investmentInfo.wallet.subscribed_balance) }}
        <span v-if="investmentInfo.wallet.subscribed_at">
          ({{ investmentInfo.wallet.subscribed_at }})
        </span>
      </p>

      <button
        class="self-center bg-gradient-orange shadow-outer-orange-v-1 rounded-lg w-[258px] py-3 px-4 mt-12"
        @click="onClickOpenInvestConfirmModal"
      >
        <div class="text-size-3 font-bold">
          {{ $t('PageInvestmentInvest.ButtonInvest') }}
        </div>
        <BaseIcon
          name="investment-circle"
          render-as-image
          class="absolute top-0 bottom-0 my-auto fill-white-v-1"
        />
      </button>

      <button
        class="self-center bg-gradient-red shadow-outer-red-v-1 rounded-lg w-[258px] py-3 px-4 mt-4"
        @click="onClickOpenRedeemConfirmModal"
      >
        <div class="text-size-3 font-bold">
          {{ $t('PageInvestmentInvest.Redeem') }}
        </div>

        <BaseIcon
          name="redeem"
          render-as-image
          class="absolute top-0 bottom-0 my-auto fill-white-v-1"
        />
      </button>
    </div>

    <button
      class="block mx-auto rounded-lg w-[258px] py-3 px-4 mt-6"
      :class="subscribeButtonStyle"
      @click="
        router.push({
          name: 'PageInvestmentIncomePremium'
        })
      "
    >
      <BaseIcon
        name="subscribe"
        render-as-image
        class="absolute top-0 bottom-0 my-auto fill-white-v-1"
      />
      <div class="text-size-3 font-bold">
        {{
          hasSubscribed
            ? $t('PageInvestmentInvest.Subscribed')
            : $t('PageInvestmentInvest.SubscribePromotion')
        }}
      </div>
    </button>

    <!-- <button
      class="block mx-auto rounded-lg bg-gradient-blue shadow-outer-blue-v-1 w-[258px] py-3 px-4 mt-6"
      @click="
        router.push({
          name: 'PageStartExperienceNumberCode'
        })
      "
    >
      <div class="text-size-3 font-bold">
        {{ $t('PageInvestmentInvest.ButtonStartTheExperienceNumber') }}
      </div>
    </button> -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFormValidation } from '@/utils/composables/use-form-validation.js'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import InvestmentService from '@/services/investment-service'
import BaseIcon from '../components/shared/BaseIcon.vue'
import { useRouter } from 'vue-router'
import { HAS_SUBSCRIBED } from '@/utils/const.js'
import { useWalletStore, useUserStore } from '@/stores'

const walletStore = useWalletStore()
const userStore = useUserStore()

const { t } = useI18n()
const router = useRouter()

const hasSubscribed = computed(
  () => investmentInfo.value.wallet.subscribed === HAS_SUBSCRIBED.YES
)

const subscribeButtonStyle = computed(() =>
  hasSubscribed.value
    ? 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none border-2 border-black-v-4'
    : 'bg-gradient-green shadow-outer-green-v-1'
)

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

const form = reactive({
  amount: ''
})

const formRules = {
  amount: [
    {
      validator: (v) => Number(v) >= 1,
      message: () => t('ValidationMessage.AmountNeedsGreaterThanOrEqualOne')
    }
  ]
}

const { setFieldRef, getValidationStatus, forceValidate } =
  useFormValidation(formRules)

async function getInvestmentInfo() {
  try {
    await walletStore.setActType()
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

function onClickOpenInvestConfirmModal() {
  if (!getValidationStatus()) return forceValidate()

  const Modal = useConfirmModal()

  Modal.open({
    title: t('PageInvestmentInvest.Title'),
    message: t('PageInvestmentInvest.ConfirmInvest'),
    buttonText: t('Button.Confirm'),
    headerIcon: 'investment-big',
    buttonClass: 'bg-gradient-orange shadow-outer-orange-v-1'
  })
    .then(() => {
      onSubmitInvestForm()
    })
    .catch(() => {})
}

function onClickOpenRedeemConfirmModal() {
  if (!getValidationStatus()) return forceValidate()

  const Modal = useConfirmModal()

  Modal.open({
    title: t('PageInvestmentInvest.Redeem'),
    message: t('PageInvestmentInvest.ConfirmRedeem'),
    buttonText: t('Button.Confirm'),
    headerIcon: 'redeem-square',
    buttonClass: 'bg-gradient-red shadow-outer-red-v-1'
  })
    .then(() => {
      onSubmitRedeemForm()
    })
    .catch(() => {})
}

async function onSubmitInvestForm() {
  try {
    await InvestmentService.invest(form.amount)
    getInvestmentInfo()
  } catch {}
}

async function onSubmitRedeemForm() {
  try {
    await InvestmentService.redeem(form.amount)
    getInvestmentInfo()
  } catch {}
}

async function onNavigateDetail() {
  router.push({
    name: 'PageWalletRecords',
    query: {
      balance_type: walletStore.balanceType.balance,
      title: t('PageWallet.InvestRecords')
    }
  })
}

function formatTwoDecimals(value) {
  const pattern = /^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)/g

  const matched = pattern.exec(value)

  return matched ? matched[0] : matched
}
</script>

<style scoped></style>
