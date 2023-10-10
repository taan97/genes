<template>
  <BaseModal
    :show="globalStore.isClaimRewardModalVisible"
    @cancelled="globalStore.setClaimRewardModalVisibility(false)"
  >
    <template #header>
      <BaseIcon name="reward-big" />
    </template>

    <template #content>
      <div class="px-5 pb-8 flex-1 flex flex-col gap-3 text-center">
        <h3 class="text-size-6 text-center text-white-1 font-bold">
          {{ $t('PageClaimReward.ModalTitle') }}
        </h3>

        <i18n-t
          keypath="PageClaimReward.ModalMessage"
          tag="p"
          class="text-white-1 flex-1"
          scope="global"
        >
          <template #reward>
            {{ userStore.receive_gift }}
            {{
              $t(
                'PageClaimReward.ClaimRewardPluralization',
                userStore.receive_gift
              )
            }}
          </template>
        </i18n-t>

        <button
          type="button"
          class="border-gradient-1 rounded-full text-orange-1 text-size-5 p-3 mt-4"
          style="--bg-color: var(--root-black-2)"
          @click="onClickClaimReward"
        >
          {{ $t('PageClaimReward.ModalClaimReward') }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { useGlobalStore, useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const globalStore = useGlobalStore()
const userStore = useUserStore()

const router = useRouter()

function onClickClaimReward() {
  globalStore.setClaimRewardModalVisibility(false)
  router.push({ name: 'PageClaimRewardForm' })
}
</script>

<style scoped></style>
