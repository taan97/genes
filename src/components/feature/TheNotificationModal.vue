<template>
  <BaseModal
    :show="globalStore.isNotificationModalVisible"
    @cancelled="globalStore.setNotificationModalVisibility(false)"
  >
    <template #header>
      <van-badge dot>
        <BaseIcon name="notification" />
      </van-badge>
    </template>

    <template #content>
      <div class="px-5 pb-8 flex-1 flex flex-col gap-3 text-center">
        <h3 class="text-size-6 text-center text-white-1 font-bold">
          {{ $t('PageHome.Notification') }}
        </h3>

        <p class="flex-1 text-white-1">
          {{ $t('PageHome.NewMessage') }}
        </p>

        <div class="grid gap-4 mt-4">
          <router-link
            :to="{ name: 'PageInbox' }"
            class="border-gradient-1 rounded-full text-orange-1 text-size-5 p-3"
            style="--bg-color: var(--root-black-2)"
          >
            {{ $t('Button.CheckInbox') }}
          </router-link>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
</script>

<style scoped>
:deep(.van-badge--top-right) {
  right: 5px;
}
</style>
