<template>
  <BaseHeader />

  <div class="p-5">
    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.TermsofUse') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.TermsofUseContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.Definitions') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.DefinitionsContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.PermittedUse') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.PermittedUseContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.Trademarks') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.TrademarksContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.Prohibitions') }}
    </h3>
    <p class="whitespace-pre-line">
      {{ $t('PageSignUpTerm.ProhibitionsTitle') }}
    </p>
    <ul class="mb-2.5 list-disc ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PageSignUpTerm.ProhibitionsContent')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.PrivacyPolicy') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.PrivacyPolicyContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.ProvisionofService') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.ProvisionofServiceContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.LimitationofLiability') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PageSignUpTerm.LimitationofLiabilityContent') }}
    </p>

    <h3 class="text-size-5 font-bold mb-2.5">
      {{ $t('PageSignUpTerm.LinkstoThirdPartySites') }}
    </h3>
    <i18n-t
      keypath="PageSignUpTerm.LinkstoThirdPartySitesContent"
      tag="p"
      class="mb-2.5 whitespace-pre-line"
      scope="global"
    >
      <template #linkEmail>
        <!-- eslint-disable vue/no-bare-strings-in-template -->
        <a
          href="mailto:support@gencapresources.com"
          class="text-white-1 underline"
          >support@gencapresources.com</a
        >
      </template>
    </i18n-t>
  </div>
</template>

<script setup></script>

<style scoped></style>
