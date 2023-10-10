<template>
  <BaseHeader :title="$t('PageManagementInformation.Title')" />

  <div class="p-5 pt-0">
    <BaseIcon
      name="group-users-big"
      class="mx-auto my-8"
    />

    <ul class="px-3 py-2 rounded-3xl shadow-inner-dark-v-1">
      <li
        v-for="item in menuList"
        :key="item.to"
        class="px-[16px] py-2 border-b-[1px] border-black-v-4 last:border-b-0"
      >
        <router-link
          class="flex items-center gap-6"
          :to="{ name: item.to }"
        >
          <BaseIcon
            :name="item.icon"
            render-as-image
          />
          <p>{{ item.label }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const menuList = computed(() => [
  {
    to: 'PageSubordinateMember',
    label: t('PageManagementInformation.SubordinateMember'),
    icon: 'group-users'
  },
  {
    to: 'PageSubordinateDepositRecords',
    label: t('PageManagementInformation.SubordinateDeposit'),
    icon: 'subordinate-deposit'
  },
  {
    to: 'PageSubordinateWithdrawal',
    label: t('PageManagementInformation.SubordinateWithdrawal'),
    icon: 'subordinate-withdrawal'
  },
  {
    to: 'PageSubordinateRanking',
    label: t('PageManagementInformation.SubordinateRanking'),
    icon: 'tierlevel'
  }
])
</script>

<style scoped></style>
