<template>
  <van-checkbox
    :model-value="isChecked"
    class="custom-van-checkbox ml-3 mb-2"
    icon-size="16px"
    :checked-color="'var(--root-green-v-3)'"
    @click="onClickAutoInvest"
  >
    {{ $t('PageInvestment.AutoInvest') }}
  </van-checkbox>

  <AutoInvestSelectorModal
    v-model:show="isAutoInvestSelectorModalVisible"
    :percent="Number(props.amount)"
    @invested="doInvestedAuto"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import InvestmentService from '@/services/investment-service'

const props = defineProps({
  amount: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['succeeded'])

const isAutoInvestSelectorModalVisible = ref(false)

const isChecked = computed(() => Boolean(Number(props.amount)))

function onClickAutoInvest() {
  isAutoInvestSelectorModalVisible.value = true
}

async function doInvestedAuto(percent) {
  try {
    await InvestmentService.autoInvest(props.type, percent)
    emit('succeeded')
  } catch {}
}
</script>

<style scoped>
.custom-van-checkbox > :deep(.van-checkbox__label) {
  color: var(--root-grey-v-2);
  font-size: var(--root-size-base);
  line-height: 16px;
}
</style>
