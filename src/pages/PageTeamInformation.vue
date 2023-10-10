<template>
  <BaseHeader :title="$t('PageMore.TeamInformation')" />

  <div class="p-5 flex flex-col gap-4">
    <router-link
      :to="{ name: 'PageTeamDepositRecord' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="deposit-usdt"
        width="20"
        class="absolute fill-orange-1"
        render-as-image
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.DepositRecord') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageTeamWithdrawRecord' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="withdrawal-usdt"
        width="20"
        class="absolute fill-orange-1"
        render-as-image
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.WidthdrawsRecord') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped></style>
