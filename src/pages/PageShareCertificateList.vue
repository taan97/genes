<template>
  <BaseHeader
    :title="$t('PageShareCertificateList.Title')"
    class="bg-black-2 text-white-1"
  />

  <InfinityList @more-requested="doMoreRequested">
    <template #item="{ item }">
      <div class="relative bg-black-opacity-1 p-4 my-2">
        <h3 class="text-white-1 font-bold">
          {{ $t('PageShareCertificateList.ApplyForPhysicalCertificate') }}
        </h3>

        <div class="grid grid-cols-[auto_auto_1fr] gap-1 text-size-2 py-2">
          <p class="text-white-1">
            {{ $t('PageShareCertificateList.DateOfApply') }}
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
          <p class="text-orange-1 break-all">+{{ item.phone }}</p>

          <p class="text-white-1">
            {{ $t('PageClaimRewardList.ShippingAddress') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all capitalize whitespace-pre-line">
            {{ item.address }}
          </p>

          <p class="text-white-1">
            {{ $t('PageShareCertificateList.PaidAmount') }}
          </p>
          <p class="text-white-1">:</p>
          <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
          <p class="text-orange-1 break-all">100 USDT</p>

          <p class="text-white-1">
            {{ $t('PageShareCertificateList.Status') }}
          </p>
          <p class="text-white-1">:</p>
          <p class="text-orange-1 break-all">{{ item.status_desc }}</p>
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
    const res = await UserCenterService.getCertificatePurchasedList(data)
    const list = res.data.items.map((item) => ({
      id: item.id,
      address: [
        item.address,
        item.city,
        countryJson.find((c) => c.alpha_2 === item.country)?.native_name
      ].join(',\n'),
      receiver_name: item.receiver_name,
      phone: item.phone,
      status: item.status,
      status_desc: STATUS_MAP[item.status],
      created_at: item.created_at
    }))

    finish(list, res.data.total || list.length)
  } catch {}
}
</script>

<style scoped></style>
