<template>
  <div
    class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 py-4 px-3.5 relative"
  >
    <button
      v-if="props.status.value === WITHDRAW_RECORD_STATE.PENDING"
      class="flex gap-2 absolute right-2 top-2 z-10"
      @click="onClickCancelConfirmModal"
    >
      <p>{{ $t('Button.Cancel') }}</p>
      <BaseIcon
        name="close-circle"
        width="20"
        height="20"
        :fill="
          isCancelButtonClicking
            ? 'var(--root-red-v-1)'
            : 'var(--root-grey-v-1)'
        "
      />
    </button>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.Status') }}
      </span>

      <span class="w-2/3">
        : {{ props.status.label }}
        <span v-if="props.status.value === WITHDRAW_RECORD_STATE.PENDING">
          ...
        </span>
      </span>
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.Address') }}
      </span>
      <span class="w-2/3 break-all">: {{ props.address }} </span>
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.Amount') }}
      </span>
      <span class="w-2/3">: USDT {{ $formatCurrency(props.amount) }}</span>
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.ActualReceive') }}
      </span>

      <span class="w-2/3"
        >: USDT {{ $formatCurrency(props.actualReceive) }}</span
      >
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.HandlingFee') }}
      </span>

      <span class="w-2/3">: USDT {{ $formatCurrency(props.handlingFee) }}</span>
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.Time') }}
      </span>

      <span class="w-2/3">: {{ props.time }}</span>
    </p>

    <p class="flex flex-row text-size-2">
      <span class="w-1/3">
        {{ $t('PageUsdtWithdrawalRecords.HashCode') }}
      </span>

      <span class="w-2/3 break-all">: {{ props.hashCode }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { WITHDRAW_RECORD_STATE } from '@/utils/const'
import WalletService from '@/services/wallet-service'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import BaseIcon from '../shared/BaseIcon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  id: {
    type: Number,
    required: true
  },

  status: {
    /**
     * status: Item[]
     * type Item = {
     *  label: string,
     *  value: Number
     * }
     */
    type: Object,
    required: true
  },

  address: {
    type: String,
    default: ''
  },

  amount: {
    type: String,
    required: true
  },

  actualReceive: {
    type: String,
    required: true
  },

  handlingFee: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },
  hashCode: {
    type: String,
    default: ''
  }
})

const isCancelButtonClicking = ref(false)

const emit = defineEmits(['cancelled'])

function onClickCancelConfirmModal() {
  isCancelButtonClicking.value = true
  const Modal = useConfirmModal()

  Modal.open({
    title: t('PageUsdtWithdrawalRecords.ConfirmCancelTitle'),
    message: t('PageUsdtWithdrawalRecords.ConfirmCancelMessage'),
    buttonText: t('Button.Yes')
  })
    .then(() => {
      onClickCancel()
      isCancelButtonClicking.value = false
    })
    .catch(() => {
      isCancelButtonClicking.value = false
    })
}

async function onClickCancel() {
  try {
    await WalletService.cancelWithdrawalRecord(String(props.id))
    emit('cancelled')
  } catch {}
}
</script>

<style scoped></style>
