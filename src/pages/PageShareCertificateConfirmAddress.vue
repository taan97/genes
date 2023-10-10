<template>
  <BaseHeader
    :title="$t('PageShareCertificateConfirmAddress.Title')"
    class="bg-black-2 text-white-1"
    :back-option="{ name: 'PageShareCertificateConfirm' }"
  >
    <template #sub-header>
      <p class="px-4">
        {{ $t('PageShareCertificateConfirmAddress.Description') }}
      </p>
    </template>
  </BaseHeader>

  <BaseForm
    ref="formRef"
    class="flex-1 flex flex-col gap-7 m-6 mb-10"
    @submitted="
      $router.replace({
        name: 'PageShareCertificateConfirm',
        params: addressForm
      })
    "
  >
    <BaseFormInputText
      v-model="addressForm.contactName"
      name="contactName"
      :placeholder="$t('PageShareCertificateConfirmAddress.ContactName')"
      :rules="addressFormRules.contactName"
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
        :placeholder="
          $t('PageShareCertificateConfirmAddress.MobilePhoneNumber')
        "
        :rules="addressFormRules.phoneNumber"
      />
    </fieldset>

    <BaseFormInputDropdown
      v-model="addressForm.countryCode"
      name="countryCode"
      :rules="addressFormRules.countryCode"
      :options="countryOptions"
      :placeholder="$t('PageShareCertificateConfirmAddress.Country')"
      :title="
        $t('PageShareCertificateConfirmAddress.SelectCountryDropdownTitle')
      "
      @selected="doSelectedCountry"
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
      :placeholder="$t('PageShareCertificateConfirmAddress.City')"
      :rules="addressFormRules.city"
    />

    <BaseFormInputText
      v-model="addressForm.streetAddress"
      name="streetAddress"
      :placeholder="$t('PageShareCertificateConfirmAddress.StreetAddress')"
      :rules="addressFormRules.streetAddress"
    >
      <template #left-icon>
        <BaseIcon name="location" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="addressForm.postalCode"
      name="postalCode"
      :placeholder="$t('PageShareCertificateConfirmAddress.PostalCode')"
      :rules="addressFormRules.postalCode"
    />

    <div class="flex-1" />

    <button
      type="submit"
      class="rounded-full w-full bg-black-1 p-3 border-gradient-1 shadow-outer-orange-dark-1"
    >
      <span class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Save') }}
      </span>
    </button>
  </BaseForm>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (addressForm.countryPhoneCode = e)"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'
import countryJson from '@/assets/country_code.json'
import { useRoute } from 'vue-router'

const route = useRoute()

const addressForm = reactive({
  contactName: route.params.contactName ?? '',
  countryPhoneCode: route.params.countryPhoneCode ?? '',
  phoneNumber: route.params.phoneNumber ?? '',
  countryCode: route.params.countryCode ?? '',
  countryLabel: route.params.countryLabel ?? '',
  city: route.params.city ?? '',
  streetAddress: route.params.streetAddress ?? '',
  postalCode: route.params.postalCode ?? ''
})

const addressFormRules = {
  contactName: ['required'],
  phoneNumber: ['required'],
  countryCode: ['required'],
  city: ['required'],
  streetAddress: ['required'],
  postalCode: ['required']
}

const isCountryDropdownVisible = ref(false)

const countryOptions = countryJson.map((c) => ({
  label: c.native_name,
  value: c.alpha_2,
  flag: c.flag
}))

function doSelectedCountry(country) {
  addressForm.countryLabel = country.label
}
</script>

<style scoped></style>
