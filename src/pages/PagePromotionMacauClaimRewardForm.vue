<template>
  <BaseHeader
    :title="$t('PageClaimReward.Title')"
    class="bg-black-2 text-white-1"
  >
    <template #sub-header>
      <h3 class="text-orange-1 text-size-5 text-center font-semibold">
        {{ $t('PageClaimReward.Description') }}
      </h3>
    </template>
  </BaseHeader>

  <BaseForm
    class="flex-1 p-6 pb-10 flex flex-col gap-6"
    @submitted="doSubmitted"
  >
    <!-- eslint-disable-next-line vue/no-bare-strings-in-template -->
    <p class="text-size-5 font-semibold">
      1
      {{ $t('PageClaimReward.ClaimRewardPluralization', 1) }}
    </p>

    <BaseFormInputText
      v-model="addressForm.receiverName"
      name="receiverName"
      :placeholder="$t('PageClaimReward.RecipientName')"
      :rules="addressFormRules.receiverName"
    >
      <template #left-icon>
        <BaseIcon name="name" />
      </template>
    </BaseFormInputText>

    <fieldset class="flex gap-4">
      <BaseFormInputText
        v-model="addressForm.countryPhoneCode"
        readonly
        class="!w-[95px]"
        container-class="!w-min"
        @click="isCountryDropdownVisible = true"
      >
        <template #left-icon>
          <BaseIcon name="mobile" />
        </template>
        <template #right-icon>
          <BaseIcon
            name="arrow-down"
            width="14"
            class="fill-black-1"
          />
        </template>
      </BaseFormInputText>

      <BaseFormInputText
        v-model="addressForm.phoneNumber"
        name="phoneNumber"
        type="digit"
        :formatter="(v) => v.replace(/^0/, '')"
        :placeholder="$t('PageClaimReward.MobilePhoneNumber')"
        :rules="addressFormRules.phoneNumber"
      />
    </fieldset>

    <p class="text-size-5 font-semibold mt-4">
      {{ $t('PageClaimReward.ShippingAddress') }}
    </p>

    <BaseFormInputDropdown
      v-model="addressForm.countryCode"
      name="countryCode"
      :rules="addressFormRules.countryCode"
      :options="countryOptions"
      :placeholder="$t('PageClaimReward.Country')"
      :title="$t('PageClaimReward.SelectCountry')"
    >
      <template #item="{ item }">
        <div class="flex gap-2 text-white-1">
          <p>{{ item.flag }}</p>
          <p>{{ item.label }}</p>
        </div>
      </template>
    </BaseFormInputDropdown>

    <BaseFormInputText
      v-model="addressForm.city"
      name="city"
      :placeholder="$t('PageClaimReward.City')"
      :rules="addressFormRules.city"
    />

    <BaseFormInputText
      v-model="addressForm.streetAddress"
      name="streetAddress"
      :placeholder="$t('PageClaimReward.StreetAddress')"
      :rules="addressFormRules.streetAddress"
    >
      <template #left-icon>
        <BaseIcon name="location" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="addressForm.postalCode"
      name="postalCode"
      :placeholder="$t('PageClaimReward.PostalCode')"
      :rules="addressFormRules.postalCode"
    />

    <div class="flex-1" />

    <button
      type="submit"
      class="w-full flex gap-2 items-center rounded-full px-3 py-2 text-orange-1 text-center bg-black-1 border-gradient-1"
    >
      <BaseIcon
        name="reward"
        width="26"
        height="31"
      />
      <span class="flex-1 font-bold text-size-5">
        {{ $t('PageClaimReward.ClaimNow') }}
      </span>
    </button>
  </BaseForm>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (addressForm.countryPhoneCode = e)"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import countryJson from '@/assets/country_code.json'
import PromotionMacauService from '@/services/promotion-macau-service'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const addressForm = reactive({
  receiverName: '',
  countryPhoneCode: '',
  phoneNumber: '',
  streetAddress: '',
  postalCode: '',
  city: '',
  countryCode: ''
})

const addressFormRules = {
  receiverName: ['required'],
  phoneNumber: ['required'],
  streetAddress: ['required'],
  postalCode: ['required'],
  city: ['required'],
  countryCode: ['required']
}

const isCountryDropdownVisible = ref(false)

const countryOptions = countryJson.map((c) => ({
  label: c.native_name,
  value: c.alpha_2,
  flag: c.flag
}))

async function doSubmitted() {
  try {
    await PromotionMacauService.claimReward({
      order_no: route.query.orderNumber,
      receiverName: addressForm.receiverName,
      phone: `+${addressForm.countryPhoneCode}${addressForm.phoneNumber}`,
      streetAddress: addressForm.streetAddress,
      postalCode: addressForm.postalCode,
      city: addressForm.city,
      countryCode: addressForm.countryCode
    })

    router.go(-1)
  } catch {}
}
</script>

<style scoped></style>
