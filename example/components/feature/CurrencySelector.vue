<template>
  <button
    class="bg-gradient-orange shadow-outer-orange rounded-full py-2 px-6 flex gap-4"
    @click="isVisible = true"
  >
    <span class="text-size-3 font-bold">{{ selectedValue }}</span>
    <BaseIcon name="switch" />
  </button>

  <BaseDropdownDrawer
    v-model:show="isVisible"
    v-model:value="selectedValue"
    :options="currencyOptions"
    @selected="(e) => (selectedItem = e)"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

import OtcService from '@/services/otc-service.js'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isVisible = ref(false)

const currencyOptions = ref([])

const selectedItem = ref({
  label: '',
  value: ''
})

const selectedValue = computed({
  get: () => props.modelValue || selectedItem.value.value,
  set: (newValue) => emit('update:modelValue', newValue)
})

setCurrencies()

async function setCurrencies() {
  try {
    const { data } = await OtcService.getCurrencies()

    currencyOptions.value = data.map((d) => ({
      label: d.code,
      value: d.code
    }))
  } catch {}
}
</script>

<style scoped></style>
