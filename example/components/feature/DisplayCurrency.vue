<template>
  <p :class="[$formatColorCurrency(props.amount), props.formatClass]">
    {{ $formatCurrencyWithPrefix(props.amount) }}
  </p>
</template>

<script setup>
const props = defineProps({
  amount: {
    type: String,
    required: true
  },
  formatClass: {
    type: String,
    default: 'font-bold'
  }
})
</script>

<style scoped></style>
