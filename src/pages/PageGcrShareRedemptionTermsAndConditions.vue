<template>
  <BaseHeader class="bg-black-2 text-white-1" />

  <div class="p-5 pb-10">
    <h1 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageGcrShareRedemptionTermsAndConditions.Title') }}
    </h1>

    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageGcrShareRedemptionTermsAndConditions.Description') }}
    </p>

    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm(
          'PageGcrShareRedemptionTermsAndConditions.Content'
        )"
        :key="message"
        class="whitespace-pre-line"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped></style>
