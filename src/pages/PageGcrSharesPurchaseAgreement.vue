<template>
  <BaseHeader
    :back-option="{ name: 'PageMyAccountPurchaseViaUsdt' }"
    class="!bg-black-2 text-white-1"
  >
    <template #sub-header>
      <BaseIcon
        name="logo-orange"
        class="place-self-center mx-auto"
      />
      <h1 class="text-center text-size-5 pt-5 pb-3">
        {{ $t('PageGcrSharesPurchaseAgreement.Title') }}
      </h1>
    </template>
  </BaseHeader>

  <div class="bg-black-opacity-1 text-white-1 p-5 mt-2">
    <i18n-t
      keypath="PageGcrSharesPurchaseAgreement.ShareTransferAgreement"
      tag="p"
      class="mb-2.5 whitespace-pre-line"
      scope="global"
    >
      <template #effectiveDate>
        <span class="text-orange-1">{{ today }}</span>
      </template>

      <template #memberName>
        <span class="text-orange-1">{{ userStore.real_name }}</span>
      </template>
    </i18n-t>

    <p class="font-bold">
      {{ $t('PageGcrSharesPurchaseAgreement.TermsandConditions') }}
    </p>
    <ul class="list-decimal mt-2 text-left px-4">
      <li
        v-for="(message, index) in $tm(
          'PageGcrSharesPurchaseAgreement.TermsandConditionsContent'
        )"
        :key="message"
      >
        <i18n-t
          tag="p"
          class="mb-2.5 whitespace-pre-line"
          scope="global"
          :keypath="`PageGcrSharesPurchaseAgreement.TermsandConditionsContent[${index}]`"
        >
          {{ message }}
          <template #number>
            <span class="text-orange-1">
              {{ $formatNumber(route.query.amount) }}
            </span>
          </template>

          <template #date>
            <span class="text-orange-1">{{ today }}</span>
          </template>

          <template #price>
            <span class="text-orange-1"
              >${{ $formatCurrency(route.query.rate) }}</span
            >
          </template>

          <template #usd>
            <span class="text-orange-1">
              ${{
                $formatCurrency(route.query.amount * route.query.rate)
              }}</span
            >
          </template>

          <template #transferTable>
            <table class="my-2 text-size-1 w-full">
              <thead>
                <tr>
                  <th>
                    {{ $t('PageGcrSharesPurchaseAgreement.NameofTransferor') }}
                  </th>
                  <th>
                    {{
                      $t(
                        'PageGcrSharesPurchaseAgreement.NumberofSharesTransfer'
                      )
                    }}
                  </th>
                  <th>
                    {{ $t('PageGcrSharesPurchaseAgreement.NameofTransferee') }}
                  </th>
                  <th>
                    {{ $t('PageGcrSharesPurchaseAgreement.SharePrice') }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {{
                      $t(
                        'PageGcrSharesPurchaseAgreement.GenesisCapitalResourcesLtd'
                      )
                    }}
                  </td>
                  <td>
                    <p class="text-orange-1">
                      {{ $formatNumber(route.query.amount) }}
                    </p>
                  </td>
                  <td>
                    <p class="text-orange-1">{{ userStore.real_name }}</p>
                  </td>
                  <td>
                    <p class="text-orange-1">
                      ${{ $formatCurrency(route.query.rate) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template #guaranteeTable>
            <table class="my-2 w-full text-size-1">
              <thead>
                <tr>
                  <th>
                    <p class="">
                      {{ $t('PageGcrSharesPurchaseAgreement.Scenario') }}
                    </p>
                  </th>
                  <th>
                    {{
                      $t('PageGcrSharesPurchaseAgreement.TotalValuePurchase')
                    }}
                  </th>
                  <th>
                    {{
                      $t('PageGcrSharesPurchaseAgreement.AmountofShareBought')
                    }}
                  </th>
                  <th>
                    {{
                      $t('PageGcrSharesPurchaseAgreement.PurchaseSharePrice')
                    }}
                  </th>
                  <th>
                    {{
                      $t('PageGcrSharesPurchaseAgreement.EmbargoListedatOtc')
                    }}
                  </th>
                  <th>
                    {{ $t('PageGcrSharesPurchaseAgreement.TotalValue') }}
                  </th>
                  <th>
                    {{ $t('PageGcrSharesPurchaseAgreement.NoofShareTopUp') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in guaranteeTable"
                  :key="i"
                >
                  <td>{{ item.id }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ item.purchase }}</td>
                  <td>{{ item.embargo }}</td>
                  <td>{{ item.totalList }}</td>
                  <td>{{ item.share }}</td>
                </tr>
              </tbody>
            </table>
          </template>

          <template #shareTable>
            <table class="my-2 w-full text-size-1">
              <thead>
                <tr>
                  <th class="w-1/5">
                    {{ $t('PageGcrSharesPurchaseAgreement.Date') }}
                  </th>
                  <th class="w-1/5">
                    {{ $t('PageGcrSharesPurchaseAgreement.SharePrice') }}<br />
                    (USD)
                  </th>
                  <th>
                    {{
                      $t(
                        'PageGcrSharesPurchaseAgreement.SharetobeReleasedBaseonList'
                      )
                    }}
                  </th>
                  <th>
                    {{
                      $t(
                        'PageGcrSharesPurchaseAgreement.SharetobeReleasedBaseonPercent'
                      )
                    }}
                  </th>
                  <th>
                    {{
                      $t('PageGcrSharesPurchaseAgreement.TotalShareReleaased')
                    }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in shareTable"
                  :key="i"
                >
                  <td>{{ item.date }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <p
                      v-if="item.dateShare"
                      class="mx-auto w-max"
                    >
                      <BaseIcon name="checkmark" />
                    </p>
                  </td>
                  <td>
                    <p
                      v-if="item.priceShare"
                      class="mx-auto w-max"
                    >
                      <BaseIcon name="checkmark" />
                    </p>
                  </td>
                  <td>{{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </i18n-t>
      </li>
    </ul>

    <ul class="list-decimal mt-2 text-left px-4">
      <li
        v-for="message in $tm(
          'PageGcrSharesPurchaseAgreement.MiscellaneousList'
        )"
        :key="message"
        class="pb-4"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="text-size-6 font-bold py-5">
      {{ $t('PageGcrSharesPurchaseAgreement.AcceptanceandSignature') }}
    </h3>

    <p>{{ $t('PageGcrSharesPurchaseAgreement.AllParties') }}</p>

    <fieldset
      class="relative flex w-full justify-between my-5 gap-5 text-center text-size-2"
    >
      <div class="w-full">
        <p class="bg-white-1 h-24 flex flex-col justify-center items-center">
          <img src="@/assets/images/matthew_sign.png" />
        </p>
        <p class="whitespace-pre-line mt-2">
          {{ $t('PageGcrSharesPurchaseAgreement.DirectorSignature') }}
        </p>
      </div>

      <div class="relative w-full">
        <SignaturePad @changed="doSign" />
        <p class="mt-2">
          {{ $t('PageGcrSharesPurchaseAgreement.SignatureofInvestor') }}
        </p>

        <BaseFormInputText
          ref="signRef"
          v-model="sign"
          :rules="['required']"
          class="!hidden absolute"
        />
      </div>
    </fieldset>
  </div>

  <button
    type="button"
    class="items-end rounded-full m-5 py-3 px-4 text-center bg-grey-5 text-size-5 text-orange-1 border-gradient-1 shadow-outer-orange-dark-1"
    @click="onClickSubmit"
  >
    {{ $t('Button.AcceptAndSubmit') }}
  </button>

  <MyAccountReferralIdModal
    v-model:show="isShow"
    @submitted="doSubmitted"
  />
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import investmentService from '@/services/investment-service'
import { useUserStore } from '@/stores'
import dayjs from 'dayjs'

const userStore = useUserStore()
const signRef = ref()

const router = useRouter()
const route = useRoute()

const today = dayjs(new Date()).format('YYYY-MM-DD')
const isShow = ref(false)
const referralId = ref(route.query.referralId)

const guaranteeTable = [
  {
    id: 1,
    total: '$9,940',
    amount: '7000',
    purchase: '$1.42',
    embargo: '$2.00',
    totalList: '$14,000',
    share: 'NL'
  },
  {
    id: 2,
    total: '$10,000',
    amount: '4000',
    purchase: '$2.50',
    embargo: '$2.00',
    totalList: '$8,000',
    share: '1000'
  }
]

const shareTable = [
  {
    date: '01-02-2024',
    price: '$5.00',
    dateShare: true,
    priceShare: false,
    total: '20'
  },
  {
    date: '10-02-2024',
    price: '$6.00',
    dateShare: false,
    priceShare: true,
    total: '40'
  },
  {
    date: '01-03-2024',
    price: '$6.00',
    dateShare: true,
    priceShare: false,
    total: '60'
  },
  {
    date: '19-02-2024',
    price: '$7.20',
    dateShare: false,
    priceShare: true,
    total: '80'
  },
  {
    date: '01-04-2024',
    price: '$7.20',
    dateShare: true,
    priceShare: false,
    total: '100'
  }
]

const sign = ref('')

async function onClickSubmit() {
  if (!signRef.value?.getValidationStatus().isValid) {
    signRef.value?.forceValidate()
    return
  }

  try {
    await investmentService.purchaseUsdt({
      amount: route.query.amount,
      referralId: referralId.value,
      signature: sign.value
    })
    !userStore.parent_id && (await userStore.setUser({ replace: true }))
    router.go(-1)
  } catch (err) {
    if (err.code === 425) {
      isShow.value = true
    }
  }
}

async function doSign(e) {
  sign.value = e
  await nextTick()
  signRef.value?.forceValidate()
}

async function doSubmitted(e) {
  referralId.value = e.value
  onClickSubmit()
}
</script>

<style scoped>
th,
td {
  border: 1px solid var(--root-white-1);
  text-align: center;
  padding: 5px 2px;
}
</style>
