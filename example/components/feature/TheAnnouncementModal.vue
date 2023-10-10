<template>
  <BaseModal
    ref="announcementModalRef"
    v-model:show="globalStore.isAnnouncementModalVisible"
    class="!overflow-visible !w-[280px]"
  >
    <template #header>
      <van-badge
        :content="globalStore.badgeNumber"
        class="absolute -top-[30px]"
      >
        <BaseIcon
          name="announcement"
          render-as-image
        />
      </van-badge>
    </template>
    <template #body>
      <ul
        v-for="news in globalStore.contents"
        :key="news.id"
        class="mx-6 mb-6"
      >
        <h3 class="text-orange-v-1 text-center font-bold text-size-7 mb-4">
          {{ news.title }}
        </h3>
        <!-- eslint-disable vue/no-v-html-->
        <li v-html="news.content"></li>
        <!-- eslint-enable vue/no-v-html-->
      </ul>

      <button
        class="self-center rounded-lg w-[10rem] py-2 px-4 mb-5 font-bold text-size-5 bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1"
        @click="globalStore.setAnnouncementModalVisibility(false)"
      >
        {{ $t('Button.Ok') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { useGlobalStore } from '@/stores'
import { nextTick, ref, watch } from 'vue'

const globalStore = useGlobalStore()
const announcementModalRef = ref(null)

watch(
  () => globalStore.isAnnouncementModalVisible,
  async (newValue) => {
    await nextTick()
    newValue && announcementModalRef.value.scrollToTop()
  }
)
</script>

<style scoped>
:deep(.van-badge) {
  border: none !important;
}
:deep(.van-badge--top-right) {
  top: 5px;
  right: 5px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
