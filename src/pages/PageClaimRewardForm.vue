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
    <p class="text-size-5 font-semibold">
      {{ userStore.receive_gift }}
      {{
        $t('PageClaimReward.ClaimRewardPluralization', userStore.receive_gift)
      }}
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
    <BaseFormInputCheckbox
      v-model="termsCheckbox"
      name="terms"
      required
    >
      <i18n-t
        keypath="PageClaimReward.CheckReward"
        tag="p"
        scope="global"
      >
        <template #link>
          <router-link
            class="underline text-white-1"
            :to="{ name: 'PageClaimRewardTerm' }"
            @click.stop
          >
            {{ $t('PageClaimReward.Term') }}
          </router-link>
        </template>
      </i18n-t>
    </BaseFormInputCheckbox>

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
import { useUserStore, useWalletStore } from '@/stores'
import countryJson from '@/assets/country_code.json'
import userCenterService from '@/services/user-center-service'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const walletStore = useWalletStore()
walletStore.setWallet()

const termsCheckbox = ref(false)

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
  if (!termsCheckbox.value) return

  try {
    await userCenterService.claimReward({
      receiverName: addressForm.receiverName,
      phone: `+${addressForm.countryPhoneCode}${addressForm.phoneNumber}`,
      streetAddress: addressForm.streetAddress,
      postalCode: addressForm.postalCode,
      city: addressForm.city,
      countryCode: addressForm.countryCode
    })

    await userStore.setUser({ replace: true })

    router.replace({ name: 'PageClaimRewardList' })
  } catch {}
}
</script>

<style scoped></style>
