<template>
  <BaseHeader />

  <div class="p-5">
    <h1 class="text-size-5 font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.Title') }}
    </h1>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.WeRespectYourPrivacy') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.WeRespectYourPrivacyContent')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.WhatPersonalInformation') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm(
          'PagePrivacyPolicy.WhatPersonalInformationContent'
        )"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.HowWeCollect') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.HowWeCollectContent')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.HowWeUse') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PagePrivacyPolicy.HowWeUseContent') }}
    </p>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.HowWeUseList')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PagePrivacyPolicy.YouWithholdYourPersonalInformation') }}
    </p>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.Disclosure') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.DisclosureContent')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.GeneralDataProtectionRegulation') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm(
          'PagePrivacyPolicy.GeneralDataProtectionRegulationContent'
        )"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.YourRights') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PagePrivacyPolicy.YourRightsContent') }}
    </p>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.YourRightsList')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PagePrivacyPolicy.YourRightsSubContent') }}
    </p>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.HostingandInternational') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm(
          'PagePrivacyPolicy.HostingandInternationalContent'
        )"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.SecurityYourPersonalInformation') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm(
          'PagePrivacyPolicy.SecurityYourPersonalInformationContent'
        )"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.AccessYourPersonalInformation') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <i18n-t
        v-for="(message, index) in $tm(
          'PagePrivacyPolicy.AccessYourPersonalInformationContent'
        )"
        :key="message"
        :keypath="`PagePrivacyPolicy.AccessYourPersonalInformationContent[${index}]`"
        tag="li"
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
    </ul>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.Complaints') }}
    </h3>
    <i18n-t
      keypath="PagePrivacyPolicy.ComplaintsContent"
      tag="p"
      class="mb-2.5 whitespace-pre-line"
      scope="global"
    >
      <template #linkEmail>
        <a
          href="mailto:support@gencapresources.com"
          class="text-white-1 underline"
          >support@gencapresources.com</a
        >
      </template>
    </i18n-t>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.ChangesPrivacyPolicy') }}
    </h3>
    <p class="mb-2.5 whitespace-pre-line">
      {{ $t('PagePrivacyPolicy.ChangesPrivacyPolicyContent') }}
    </p>

    <h3 class="font-bold mb-2.5">
      {{ $t('PagePrivacyPolicy.Website') }}
    </h3>
    <ul class="mb-2.5 list-decimal ml-4 mt-2 grid gap-4 text-left">
      <li
        v-for="message in $tm('PagePrivacyPolicy.WebsiteContent')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped></style>
