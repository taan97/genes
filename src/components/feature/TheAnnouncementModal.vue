<template>
  <BaseModal
    :show="globalStore.isAnnouncementModalVisible"
    @cancelled="globalStore.setAnnouncementModalVisibility(false)"
  >
    <template #header>
      <van-badge dot>
        <BaseIcon name="announcement" />
      </van-badge>
    </template>

    <template #content>
      <div class="px-5 pb-8 flex-1 flex flex-col gap-x-3 gap-y-5 text-center">
        <template
          v-for="(item, index) in globalStore.announcementContents"
          :key="index"
        >
          <h3 class="text-size-6 text-center text-white-1 font-bold">
            {{ item.title }}
          </h3>

          <p
            class="flex-1 text-white-1"
            v-html="item.content"
          />
        </template>

        <button
          type="button"
          class="border-gradient-1 rounded-full text-orange-1 text-size-5 py-2 w-full"
          style="--bg-color: var(--root-black-2)"
          @click="globalStore.setAnnouncementModalVisibility(false)"
        >
          {{ $t('Button.Ok') }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
</script>

<style scoped></style>
