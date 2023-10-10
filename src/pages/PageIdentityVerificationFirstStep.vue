<template>
  <BaseHeader :title="$t('PageIdentityVerification.PageTitle')" />

  <BaseForm
    class="p-6 pb-10 flex-1 flex flex-col gap-8"
    @submitted="doSubmitted"
  >
    <p class="font-semibold text-size-5">
      {{ $t('PageIdentityVerification.ChooseNationLabel') }}
    </p>

    <BaseFormInputDropdown
      v-model="form.country"
      name="country"
      :placeholder="$t('PageIdentityVerification.SelectCountryDropdownTitle')"
      :rules="['required']"
      :options="countryOptions"
      :title="$t('PageIdentityVerification.SelectCountryDropdownTitle')"
    >
      <template #left-icon>
        <BaseIcon name="globe" />
      </template>
    </BaseFormInputDropdown>

    <p class="font-semibold text-size-5">
      {{ $t('PageIdentityVerification.DocumentSelectionLabel') }}
    </p>
    <p class="">
      {{ $t('PageIdentityVerification.DocumentSelectionNote') }}
    </p>

    <van-radio-group
      v-model="form.documentType"
      icon-size="26px"
    >
      <van-radio
        v-for="option in documentOptions"
        :key="option.value"
        :name="option.value"
      >
        {{ $t(option.label) }}
      </van-radio>
    </van-radio-group>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full p-3 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <div class="text-size-5 font-bold">{{ $t('Button.Next') }}</div>
      <BaseIcon
        name="arrow-right"
        class="absolute fill-orange-1 right-4 my-auto top-0 bottom-0"
      />
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { DOCUMENT_TYPE } from '@/utils/const.js'
import countryJson from '@/assets/country_code.json'

const router = useRouter()
const form = reactive({
  country: '',
  documentType: DOCUMENT_TYPE.ID
})

const countryOptions = countryJson.map((c) => ({
  label: c.native_name,
  value: c.alpha_2
}))

const documentOptions = [
  {
    value: DOCUMENT_TYPE.ID,
    label: 'PageIdentityVerification.IdCard'
  },
  {
    value: DOCUMENT_TYPE.PASSPORT,
    label: 'PageIdentityVerification.Passport'
  }
]

function doSubmitted() {
  router.replace({
    name: 'PageIdentityVerificationSecondStep',
    params: {
      country: form.country,
      type: form.documentType
    }
  })
}
</script>

<style scoped>
.van-radio-group {
  --van-radio-checked-icon-color: black;
  --van-radio-label-margin: 1rem;
  --van-radio-label-color: var(--root-black-1);

  display: flex;
  flex-direction: column;
  gap: 2rem;

  font-size: var(--root-size-5);
}

.van-radio-group :deep(.van-radio__label) {
  font-size: var(--root-size-5);
}
.van-radio-group :deep(.van-radio__icon .van-icon) {
  border: 2px solid var(--root-black-1);
}
.van-radio-group :deep(.van-radio__icon--checked .van-icon) {
  color: var(--root-orange-1);
}
</style>
