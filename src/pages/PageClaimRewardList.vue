<template>
  <BaseHeader
    :title="$t('PageClaimRewardList.Title')"
    class="bg-black-2 text-white-1"
  />

  <InfinityList @more-requested="doMoreRequested">
    <template #item="{ item }">
      <div class="bg-black-opacity-1 p-4 my-2">
        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageClaimRewardList.Reward') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ item.number }}
            {{ $t(REWARD_TYPE[item.type] || '', item.number) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageClaimRewardList.ClaimDate') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">
            {{ $formatDateTime(item.created_at) }}
          </p>

          <p class="text-white-1">
            {{ $t('PageClaimRewardList.RecipientName') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all capitalize">
            {{ item.receiver_name }}
          </p>

          <p class="text-white-1">
            {{ $t('PageClaimRewardList.MobileNo') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.phone }}</p>

          <p class="text-white-1">
            {{ $t('PageClaimRewardList.ShippingAddress') }}
          </p>
          <p class="text-white-1">:</p>
          <div>
            <p class="text-orange-1 break-all capitalize whitespace-pre-line">
              {{ item.address }}
            </p>
          </div>

          <p class="text-white-1">
            {{ $t('PageShareCertificateList.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.status_desc }}</p>

          <template v-if="item.express_no">
            <p class="text-white-1">
              {{ $t('PageClaimRewardList.CourierTrackingNo') }}
            </p>
            <p class="text-white-1">:</p>
            <p class="text-orange-1 break-all">{{ item.express_no }}</p>
          </template>
        </div>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import UserCenterService from '@/services/user-center-service.js'
import countryJson from '@/assets/country_code.json'

const { t } = useI18n()

const STATUS = {
  PENDING: 0,
  SHIPPED: 1,
  COMPLETED: 2
}

const REWARD_TYPE = {
  0: 'PageClaimReward.ClaimRewardPluralization',
  1: 'PageClaimReward.ClaimRewardPluralization',
  2: 'PageClaimReward.ClaimRewardPluralization',
  3: 'PageClaimReward.GoldBarClaimRewardPluralization'
}

const STATUS_MAP = {
  [STATUS.PENDING]: t('PageShareCertificateList.StatusPending'),
  [STATUS.SHIPPED]: t('PageShareCertificateList.StatusShipped'),
  [STATUS.COMPLETED]: t('PageShareCertificateList.StatusCompleted')
}

async function doMoreRequested(nextPage, finish) {
  try {
    const data = {
      page: nextPage
    }
    const res = await UserCenterService.getRewardList(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      number: item.number,
      address: [
        item.address,
        item.city,
        countryJson.find((c) => c.alpha_2 === item.country)?.native_name
      ].join(',\n'),
      receiver_name: item.receiver_name,
      phone: item.phone,
      status: item.status,
      status_desc: STATUS_MAP[item.status],
      created_at: item.created_at,
      express_no: item.express_no,
      type: item.type
    }))

    finish(list, res.data.total || list.length)
  } catch {}
}
</script>

<style scoped></style>
