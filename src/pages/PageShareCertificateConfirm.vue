<template>
  <BaseHeader
    :title="$t('PageShareCertificateConfirm.Title')"
    class="bg-black-2 text-white-1"
  />

  <router-link
    :to="{
      name: 'PageShareCertificateConfirmAddress',
      params: $route.params,
      replace: true
    }"
    class="my-2 p-3 bg-black-opacity-1 grid grid-cols-[auto_1fr] gap-2 text-orange-1"
  >
    <BaseIcon name="location" />

    <div v-if="isEmpty($route.params)">
      <p class="font-bold underline">
        {{ $t('PageShareCertificateConfirm.AddShippingAddress') }}
      </p>
      <p
        v-if="showShippingAddressError"
        class="text-size-2 italic my-1 text-white-1 font-bold"
      >
        {{ $t('ValidationMessage.Required') }}
      </p>
    </div>

    <template v-else>
      <p>{{ $t('PageShareCertificateConfirm.ShippingAddress') }}</p>

      <div
        class="col-start-2 text-white-1 flex gap-2 justify-between items-center"
      >
        <div>
          <p class="capitalize">{{ shippingAddress.contactName }}</p>
          <p>{{ shippingAddress.phone }}</p>
          <p class="capitalize">
            {{ shippingAddress.address }}
          </p>
        </div>

        <BaseIcon
          name="arrow-down-small"
          class="fill-orange-1 -rotate-90"
        />
      </div>
    </template>
  </router-link>

  <div
    class="my-2 py-3 px-8 bg-black-opacity-1 text-white-1 grid grid-cols-[auto_auto_1fr] gap-x-2"
  >
    <h3 class="col-span-full font-bold mb-2">
      {{ $t('PageShareCertificateConfirm.ShareholderDetails') }}
    </h3>

    <p>{{ $t('PageShareCertificateConfirm.ShareholderName') }}</p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1">{{ shareholderName }}</p>

    <p>{{ $t('PageShareCertificateConfirm.NumberOfShares') }}</p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1">{{ $formatNumber(residue) }}</p>

    <p class="whitespace-pre-line">
      {{ $t('PageShareCertificateConfirm.ShareholderId') }}
    </p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1">{{ userStore.id_number }}</p>
  </div>

  <div
    class="my-2 py-3 px-8 bg-black-opacity-1 text-white-1 grid grid-cols-2 gap-2"
  >
    <h3 class="col-span-full font-bold mb-2">
      {{ $t('PageShareCertificateConfirm.OrderSummary') }}
    </h3>

    <p>{{ $t('PageShareCertificateConfirm.ApplicationFee') }}</p>
    <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
    <p class="text-orange-1 font-bold text-right">100 USDT</p>

    <p>{{ $t('PageShareCertificateConfirm.ShippingCost') }}</p>
    <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
    <p class="text-orange-1 font-bold text-right">FOC</p>

    <div class="col-span-full h-[1px] bg-orange-1" />

    <p class="font-bold">{{ $t('PageShareCertificateConfirm.Total') }}</p>
    <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
    <p class="text-orange-1 font-bold text-right">100 USDT</p>
  </div>

  <div class="flex-1" />

  <button
    type="button"
    class="rounded-full bg-black-1 mx-6 mb-10 p-3 text-center border-gradient-1 shadow-outer-orange-dark-1"
    @click="onClickMakePayment"
  >
    <span class="text-orange-1 text-size-5 font-bold">
      {{ $t('PageShareCertificateConfirm.MakePayment') }}
    </span>
  </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { LOCALE } from '@/locales'
import { getLocale } from '@/locales/helpers'
import { useUserStore } from '@/stores'
import { useWalletStore } from '@/stores'
import { isEmpty, showToast } from '@/utils/shared-methods'
import UserCenterService from '@/services/user-center-service'

const userStore = useUserStore()
const walletStore = useWalletStore()
walletStore.setWallet()

const route = useRoute()
const router = useRouter()
const residue = ref('')
const { t } = useI18n()

const showShippingAddressError = ref(false)

const shareholderName = computed(() => {
  const locale = getLocale()
  return locale === LOCALE.ZH_CN
    ? `${userStore.last_name} ${userStore.first_name}`
    : `${userStore.first_name} ${userStore.last_name}`
})

const shippingAddress = computed(() => {
  return {
    contactName: route.params.contactName,
    phone: `
      +${route.params.countryPhoneCode}${route.params.phoneNumber}
    `,
    address: [
      route.params.streetAddress,
      route.params.city,
      route.params.countryLabel
    ].join(', ')
  }
})

setCertificateResidue()

function onClickMakePayment() {
  if (residue.value <= 0)
    return showToast({
      type: 'fail',
      message: t('PageShareCertificateConfirm.NotEnoughEquity')
    })

  if (isEmpty(route.params)) {
    showShippingAddressError.value = true
    return
  }

  router.push({
    name: 'PageShareCertificateConfirmTransactionPassword',
    params: route.params,
    replace: true
  })
}

async function setCertificateResidue() {
  try {
    const { data } = await UserCenterService.certificateResidue()
    residue.value = data.residue
  } catch {}
}
</script>

<style scoped></style>
