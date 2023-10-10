<template>
  <div class="my-2 py-5 pl-5 pr-8 rounded-3xl shadow-inner-dark-v-1">
    <div class="flex items-center gap-4 pb-3">
      <BaseIcon
        name="logo-square-yellow"
        width="36"
        height="36"
        render-as-image
      />
      <p class="text-yellow-v-1">ID: {{ props.id }} {{ props.username }}</p>
    </div>

    <div class="grid grid-cols-2">
      <p>{{ $t('PageUserProfile.DirectReferal') }}</p>
      <p>: {{ props.totalBalance }}</p>
    </div>
    <div class="grid grid-cols-2 break-all">
      <p>{{ $t('PageUserProfile.InvestedAmount') }}</p>
      <p>: {{ $formatCurrency(props.balance) }}</p>
    </div>
    <div class="grid grid-cols-2">
      <p>{{ $t('PageUserProfile.Rank') }}</p>
      <p class="flex items-center gap-2">
        : {{ props.level }}
        <BaseIcon
          name="star"
          class="fill-yellow-v-1"
        />
      </p>
    </div>
    <BaseIcon
      name="arrow-right-solid"
      class="absolute top-0 bottom-0 my-auto right-5"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number,
    default: null
  },
  username: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 0
  },
  totalBalance: {
    type: Number,
    default: 0
  },
  balance: {
    type: String,
    default: '0'
  }
})
</script>

<style scoped></style>
