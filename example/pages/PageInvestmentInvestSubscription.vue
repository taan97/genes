<template>
  <BaseHeader class="border-b border-black-v-4" />

  <div class="p-5 pt-0">
    <h1 class="text-size-2 text-orange-v-1 font-bold my-4">
      {{ $t('PageInvestmentInvest.TermsSubscriptionTitle') }}
    </h1>

    <div class="mb-4">
      <ul class="list-[lower-roman] ml-6 mt-4 flex flex-col gap-4">
        <li
          v-for="message in $tm('PageInvestmentInvest.TermConditionsContent')"
          :key="message"
        >
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
