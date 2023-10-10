<template>
  <BaseHeader :title="$t('PageRedeem.RewardClaimRecord')" />

  <div class="p-5 pt-0">
    <ul class="pt-8">
      <li
        v-for="(item, index) in displayRewardList"
        :key="index"
        class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 p-4 grid grid-cols-[auto,auto,1fr] gap-3 my-3"
      >
        <p>{{ $t('PageRedeem.UserName') }}</p>
        <p>:</p>
        <p>{{ item.userName }}</p>

        <p>{{ $t('PageRedeem.PhoneNumber') }}</p>
        <p>:</p>
        <p>{{ item.phoneNumber }}</p>

        <p>{{ $t('PageRedeem.Address') }}</p>
        <p>:</p>
        <p>{{ item.address }}</p>

        <template v-if="item.courierName">
          <p>{{ $t('PageRedeem.CourierName') }}</p>
          <p>:</p>
          <p>{{ item.courierName }}</p>
        </template>

        <template v-if="item.trackingNumber">
          <p>{{ $t('PageRedeem.TrackingNumber') }}</p>
          <p>:</p>
          <p>{{ item.trackingNumber }}</p>
        </template>

        <p>{{ $t('PageRedeem.Reward') }}</p>
        <p>:</p>
        <p>{{ item.rewardName }}</p>

        <p>{{ $t('PageRedeem.State') }}</p>
        <p>:</p>
        <p>{{ item.status }}</p>
      </li>
    </ul>

    <p class="text-center text-grey-v-2 leading-[50px]">
      {{ $t('AppMessage.EverythingHasBeenLoaded') }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import UserCenterService from '@/services/user-center-service'
import { REDEEM_REWARD_STATUS } from '@/utils/const.js'

const { t } = useI18n()

const rewardList = ref([])

const redeemRewardLabelMap = {
  [REDEEM_REWARD_STATUS.NOT_SHIPPED]: 'PageRedeem.NotShipped',
  [REDEEM_REWARD_STATUS.SHIPPED]: 'PageRedeem.Shipped',
  [REDEEM_REWARD_STATUS.COMPLETED]: 'PageRedeem.Completed'
}

const displayRewardList = computed(() =>
  rewardList.value.map((r) => ({
    ...r,
    status: t(redeemRewardLabelMap[r.status])
  }))
)

setRewardList()

async function setRewardList() {
  try {
    const res = await UserCenterService.getRewardList()
    rewardList.value = res.data.map((item) => ({
      userName: item.receiver_name,
      phoneNumber: item.receiver_phone_number,
      address: item.receiver_address,
      courierName: item.delivery_company,
      trackingNumber: item.delivery_no,
      rewardName: item.reward_name,
      status: item.status
    }))
  } catch {}
}
</script>

<style scoped></style>
