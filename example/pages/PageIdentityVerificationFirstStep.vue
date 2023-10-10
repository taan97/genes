<template>
  <BaseHeader :title="$t('PageIdentityVerification.PageTitle')" />

  <div class="p-5">
    <p class="font-bold mb-4 mt-8">
      {{ $t('PageIdentityVerification.ChooseNationLabel') }}
    </p>

    <button
      class="w-full bg-gradient-orange shadow-outer-orange-v-1 rounded-[8px] flex justify-between items-center px-6 py-4"
      @click="isCountryDropdownVisible = true"
    >
      <span class="text-size-3 font-bold">{{ selectedCountry.label }}</span>
      <BaseIcon name="arrow-down-solid" />
    </button>

    <p class="font-bold mt-10">
      {{ $t('PageIdentityVerification.DocumentSelectionLabel') }}
    </p>
    <p class="mt-2">
      {{ $t('PageIdentityVerification.DocumentSelectionNote') }}
    </p>

    <ul class="mt-16 flex flex-col gap-4">
      <li
        v-for="document in documentOptions"
        :key="document.value"
        class="flex justify-between items-center gap-8 p-4 border-orange-v-1 shadow-inner-dark-v-1 rounded-[20px]"
        :class="{
          border: selectedDocumentType.value === document.value
        }"
        @click="selectedDocumentType = document"
      >
        <BaseIcon
          :name="document.icon"
          render-as-image
        />
        <span class="flex-1 text-size-4 font-bold">{{
          $t(document.label)
        }}</span>
        <BaseIcon
          name="checkmark-circle"
          :class="[
            selectedDocumentType.value === document.value
              ? 'fill-orange-v-1'
              : 'fill-grey-v-1'
          ]"
        />
      </li>
    </ul>

    <button
      class="self-center rounded-[8px] w-[18rem] py-2 px-4 mt-16 mb-10 mx-auto block"
      :class="nextButtonStyle"
      @click="onClickContinue"
    >
      <div class="text-size-5 font-bold">{{ $t('Button.Continue') }}</div>
      <BaseIcon
        name="arrow-right"
        class="absolute fill-white-v-1 right-4 my-auto top-0 bottom-0"
        :class="[isReadyToGoNext ? 'fill-white-v-1' : 'fill-grey-v-1']"
      />
    </button>
  </div>

  <DropdownCountryCodeSelector
    v-model:show="isCountryDropdownVisible"
    :value="selectedCountry.value"
    @selected="(e) => (selectedCountry = e)"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { IDENTITY_VERIFICATION } from '@/utils/const.js'

const router = useRouter()

const selectedCountry = ref({
  value: '',
  label: ''
})

const selectedDocumentType = ref('')
const isCountryDropdownVisible = ref(false)

const documentOptions = [
  {
    value: IDENTITY_VERIFICATION.TYPE_ID,
    label: 'PageIdentityVerification.IdCard',
    icon: 'id-user-doc-square'
  },
  {
    value: IDENTITY_VERIFICATION.TYPE_PASSPORT,
    label: 'PageIdentityVerification.Passport',
    icon: 'id-globe-square'
  }
]

const isReadyToGoNext = computed(() => Boolean(selectedDocumentType.value))

const nextButtonStyle = computed(() =>
  isReadyToGoNext.value
    ? 'bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none'
)

function onClickContinue() {
  router.push({
    name: 'PageIdentityVerificationSecondStep',
    params: {
      country: selectedCountry.value.value,
      type: selectedDocumentType.value.value
    }
  })
}
</script>

<style scoped></style>
