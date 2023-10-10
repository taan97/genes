<template>
  <LayoutPromotionGoldBar :setups="layoutSetups">
    <BaseForm
      ref="formRef"
      class="p-6 pb-10 flex flex-col gap-6 bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl m-4"
    >
      <h1 class="text-size-6 text-center text-white-1 font-semibold">
        {{ $t('PageClaimReward.Description') }}
      </h1>

      <BaseFormInputText
        v-model="addressForm.receiverName"
        name="receiverName"
        light-theme
        :placeholder="$t('PageClaimReward.RecipientName')"
        :rules="addressFormRules.receiverName"
      >
        <template #left-icon>
          <BaseIcon
            name="name"
            class="fill-orange-1"
          />
        </template>
      </BaseFormInputText>

      <fieldset class="flex gap-4">
        <BaseFormInputText
          v-model="addressForm.countryPhoneCode"
          readonly
          light-theme
          class="!w-[95px]"
          container-class="!w-min"
          @click="isCountryDropdownVisible = true"
        >
          <template #left-icon>
            <BaseIcon
              name="mobile"
              class="fill-orange-1"
            />
          </template>
          <template #right-icon>
            <BaseIcon
              name="arrow-down"
              width="14"
              class="fill-orange-1"
            />
          </template>
        </BaseFormInputText>

        <BaseFormInputText
          v-model="addressForm.phoneNumber"
          name="phoneNumber"
          light-theme
          type="digit"
          :formatter="(v) => v.replace(/^0/, '')"
          :placeholder="$t('PageClaimReward.MobilePhoneNumber')"
          :rules="addressFormRules.phoneNumber"
        />
      </fieldset>

      <p class="text-size-5 text-white-1 font-semibold mt-4">
        {{ $t('PageClaimReward.ShippingAddress') }}
      </p>

      <BaseFormInputDropdown
        v-model="addressForm.countryCode"
        name="countryCode"
        light-theme
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
        light-theme
        :placeholder="$t('PageClaimReward.City')"
        :rules="addressFormRules.city"
      />

      <BaseFormInputText
        v-model="addressForm.streetAddress"
        name="streetAddress"
        light-theme
        :placeholder="$t('PageClaimReward.StreetAddress')"
        :rules="addressFormRules.streetAddress"
      >
        <template #left-icon>
          <BaseIcon
            name="location"
            class="fill-orange-1"
          />
        </template>
      </BaseFormInputText>

      <BaseFormInputText
        v-model="addressForm.postalCode"
        name="postalCode"
        light-theme
        :placeholder="$t('PageClaimReward.PostalCode')"
        :rules="addressFormRules.postalCode"
      />
    </BaseForm>

    <DropdownPhoneCodeSelector
      v-model:show="isCountryDropdownVisible"
      @selected="(e) => (addressForm.countryPhoneCode = e)"
    />
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import countryJson from '@/assets/country_code.json'
import PromotionGoldBarService from '@/services/promotion-gold-bar-service'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)

const layoutSetups = reactive([
  {
    activeIcon: 'active-close',
    inactiveIcon: 'inactive-close',
    active: true,
    label: 'PagePromotionGoldBar.ButtonClose',
    handler: () => {
      router.go(-1)
    }
  },
  {
    activeIcon: 'active-deposit',
    inactiveIcon: 'inactive-deposit',
    active: false,
    label: 'PagePromotionGoldBar.ButtonDeposit',
    handler: () => {}
  },
  {
    activeIcon: 'active-listing',
    inactiveIcon: 'inactive-listing',
    active: false,
    label: 'PagePromotionGoldBar.ButtonListing',
    handler: () => {}
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: true,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: handleSubmit
  }
])

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

watch(
  () => formRef.value?.getValidationStatus,
  (newValue) => {
    const redeemButton = layoutSetups.find(
      (l) => l.activeIcon === 'active-confirm'
    )
    redeemButton.active = Boolean(newValue)
  },
  { immediate: true }
)

async function handleSubmit() {
  try {
    await PromotionGoldBarService.pledge({
      quantity: route.query.quantity,
      receiverName: addressForm.receiverName,
      phone: `+${addressForm.countryPhoneCode}${addressForm.phoneNumber}`,
      streetAddress: addressForm.streetAddress,
      postalCode: addressForm.postalCode,
      city: addressForm.city,
      countryCode: addressForm.countryCode
    })

    router.push({
      name: 'PagePromotionGoldBarListing',
      replace: true
    })
  } catch {}
}
</script>

<style scoped>
:deep(.custom-input.van-field) .van-field__right-icon > svg {
  fill: var(--root-orange-1);
}
</style>
