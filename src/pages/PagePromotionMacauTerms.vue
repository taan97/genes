<template>
  <BaseHeader class="text-white-1" />

  <div
    class="bg-transparent rounded-md border border-yellow-1 backdrop-blur px-4 pb-4 m-5 mt-0 flex flex-col gap-4 items-center text-white-1"
  >
    <div
      class="rounded-b-md bg-gradient-brown text-center font-bold text-size-4 py-1 px-2"
    >
      {{ $t('PagePromotionMacau.TermsAndConditionsTitle') }}
    </div>

    <p class="whitespace-pre-line">
      {{ $t('PagePromotionMacau.TermsAndConditionsContent') }}
    </p>

    <router-link
      :to="{ name: 'PagePromotionMacauDeposit', replace: true }"
      class="rounded-full p-3 border-gradient-1 w-[18rem] mx-auto text-orange-1 text-size-5 text-center font-bold"
    >
      {{ $t('Button.Continue') }}
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped></style>
