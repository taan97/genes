<template>
  <div class="bg-black-opacity-1 p-6 flex flex-col gap-3 text-white-1">
    <h3 class="text-orange-1 text-size-4">
      {{ $t('PageOtc.OpenYourBankingApp') }}
    </h3>
    <h3 class="text-orange-1 text-size-4">
      {{ $t('PageOtc.TransferMoneyToSeller') }}
    </h3>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.TransferAmount') }}</span>
      <span class="font-bold">{{ props.totalPrice }}</span>
      <BaseIcon
        name="copy"
        @click="onClickCopy(props.totalPrice)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.SellerName') }}</span>
      <span>{{ props.bankRealName }}</span>
      <BaseIcon
        name="copy"
        @click="onClickCopy(props.bankRealName)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.BankCardNumber') }}</span>
      <span>{{ props.bankAccount }}</span>
      <BaseIcon
        name="copy"
        @click="onClickCopy(props.bankAccount)"
      />
    </div>

    <div class="flex justify-between items-center gap-2">
      <span class="flex-1">{{ $t('PageOtc.BankName') }}</span>
      <span>{{ props.bankName }}</span>
      <BaseIcon
        name="copy"
        @click="onClickCopy(props.bankName)"
      />
    </div>

    <p class="text-red-1">{{ $t('PageOtc.SellerPaymentCouldChangeNote') }}</p>

    <p class="text-orange-1 whitespace-pre-line">
      {{ $t('PageOtc.SellerPaymentWarning') }}
    </p>

    <p class="text-orange-1">
      {{ $t('PageOtc.AfterTransferCompletedNote') }}
    </p>
  </div>

  <BaseForm
    ref="formRef"
    class="flex-1 flex flex-col px-4 pt-6 pb-10"
    @submitted="onClickConfirmTransfer"
  >
    <fieldset class="mb-6 relative">
      <ImageUploader
        id="OtcOrderDetailPay"
        v-model="paymentForm.proof"
        @changed="doChangedPaymentProof"
      >
        <template #add-button>
          <p class="flex gap-2">
            <BaseIcon
              name="camera"
              render-as-image
            />
            <span class="underline">{{
              $t('PageOtc.RemittanceCertificate')
            }}</span>
          </p>
        </template>
      </ImageUploader>

      <BaseFormInputText
        v-model="paymentForm.proof"
        name="proof"
        :rules="['required']"
        class="!hidden"
        container-class="absolute bottom-14"
      />
    </fieldset>

    <BaseFormInputText
      v-model="paymentForm.payerName"
      name="payerName"
      :placeholder="$t('PageOtc.PayerName')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="name" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="paymentForm.bankName"
      name="bankName"
      :placeholder="$t('PageOtc.BankName')"
      :rules="['required']"
      class="mt-4"
    >
      <template #left-icon>
        <BaseIcon name="user" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="paymentForm.bankCardNumber"
      name="bankCardNumber"
      :placeholder="$t('PageOtc.BankCardNumber')"
      :rules="['required']"
      class="mt-4"
    >
      <template #left-icon>
        <BaseIcon name="dark-card" />
      </template>
    </BaseFormInputText>

    <div class="mb-8" />

    <fieldset class="flex gap-2 mt-auto">
      <OnlineHelpDesk class="basis-[52px] shadow-outer-orange-dark-1" />

      <button
        type="button"
        class="flex-1 rounded-full p-3 text-size-5 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
        @click="emit('cancelled')"
      >
        {{ $t('PageOtc.CancelOrder') }}
      </button>

      <button
        type="submit"
        class="flex-1 rounded-full p-3 text-size-5 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      >
        {{ $t('PageOtc.CompletedTransfer') }}
      </button>
    </fieldset>
  </BaseForm>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
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

const formRef = ref(null)

const paymentForm = reactive({
  proof: '',
  payerName: '',
  bankName: '',
  bankCardNumber: ''
})

async function doChangedPaymentProof() {
  await nextTick()
  formRef.value?.formInputs.proof.forceValidate()
}

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
