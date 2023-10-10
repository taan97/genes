<template>
  <div
    class="bg-black-v-5 shadow-inner-dark-v-1 rounded-2.5xl p-4 mb-4 flex flex-col gap-3"
  >
    <h3 class="text-orange-v-1 tetx-size-3">
      {{ $t('PageOtc.OpenYourBankingApp') }}
    </h3>
    <h3 class="text-orange-v-1 tetx-size-3">
      {{ $t('PageOtc.TransferMoneyToSeller') }}
    </h3>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.TransferAmount') }}</span>
      <span class="font-bold text-size-3">{{ props.totalPrice }}</span>
      <BaseIcon
        name="copy"
        width="13"
        height="13"
        class="fill-orange-v-1"
        @click="onClickCopy(props.totalPrice)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.SellerName') }}</span>
      <span>{{ props.bankRealName }}</span>
      <BaseIcon
        name="copy"
        width="13"
        height="13"
        class="fill-orange-v-1"
        @click="onClickCopy(props.bankRealName)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.BankCardNumber') }}</span>
      <span>{{ props.bankAccount }}</span>
      <BaseIcon
        name="copy"
        width="13"
        height="13"
        class="fill-orange-v-1"
        @click="onClickCopy(props.bankAccount)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.BankName') }}</span>
      <span>{{ props.bankName }}</span>
      <BaseIcon
        name="copy"
        width="13"
        height="13"
        class="fill-orange-v-1"
        @click="onClickCopy(props.bankName)"
      />
    </div>

    <p class="text-red-v-1">{{ $t('PageOtc.SellerPaymentCouldChangeNote') }}</p>

    <p class="text-orange-v-1">
      {{ $t('PageOtc.AfterTransferCompletedNote') }}
    </p>
  </div>

  <div class="flex gap-4 items-center mt-4 mb-8">
    <ImageUploader
      id="PageUserProfile"
      container-class="bg-gradient-dark !h-[88px] w-[88px] rounded-[10px]"
      @changed="(e) => (paymentForm.proof = e)"
    >
      <template #add-button>
        <BaseIcon
          name="camera"
          render-as-image
        />
      </template>
    </ImageUploader>

    <p>{{ $t('PageOtc.RemittanceCertificate') }}</p>
  </div>

  <BaseInputText
    v-model="paymentForm.payerName"
    :placeholder="$t('PageOtc.PayerName')"
    :rules="['required']"
  />

  <BaseInputText
    v-model="paymentForm.bankName"
    :placeholder="$t('PageOtc.BankName')"
    :rules="['required']"
    class="mt-4"
  />

  <BaseInputText
    v-model="paymentForm.bankCardNumber"
    :placeholder="$t('PageOtc.BankCardNumber')"
    :rules="['required']"
    class="mt-4"
  />

  <div class="mb-8"></div>

  <div class="flex gap-4 mt-auto mb-10">
    <OnlineHelpDesk />

    <button
      class="flex-1 bg-gradient-orange shadow-outer-orange-v-1 rounded-[10px] p-2 font-bold text-size-5 text-center"
      @click="emit('cancelled')"
    >
      {{ $t('PageOtc.CancelOrder') }}
    </button>

    <button
      class="flex-1 rounded-[10px] p-2 font-bold text-size-5 text-center"
      :class="submitButtonStyle"
      @click="onClickConfirmTransfer"
    >
      {{ $t('PageOtc.CompletedTransfer') }}
    </button>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import OtcService from '@/services/otc-service'
import { copyText as onClickCopy } from '@/utils/shared-methods'

const props = defineProps({
  /* eslint-disable vue/require-default-prop */
  totalPrice: String,
  bankRealName: String,
  bankAccount: String,
  bankName: String
  /* eslint-enable vue/require-default-prop */
})

const emit = defineEmits(['cancelled', 'confirmed'])

const route = useRoute()

const paymentForm = reactive({
  proof: '',
  payerName: '',
  bankName: '',
  bankCardNumber: ''
})

const isReadyToSubmit = computed(() =>
  Object.values(paymentForm).every((v) => Boolean(v))
)

const submitButtonStyle = computed(() =>
  isReadyToSubmit.value
    ? 'bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none'
)

async function onClickConfirmTransfer() {
  try {
    await OtcService.submitPayment({
      ...paymentForm,
      tradeNumber: route.params.id
    })

    emit('confirmed')
  } catch {}
}
</script>

<style scoped></style>
