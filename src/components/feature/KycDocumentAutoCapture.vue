<template>
  <template v-if="finishProccessDocument">
    <MainHeader>
      <template #title>
        <button
          type="button"
          class="p-2 absolute z-[1] left-2 top-4 flex gap-2 items-center"
          @click="$router.go(-1)"
        >
          <BaseIcon
            name="arrow-left"
            class="fill-white-1"
          />
        </button>

        <h3
          class="text-size-4 text-center font-bold px-10 text-white-1 pt-6 pb-4"
        >
          {{ $t('PageKycVerification.DocumentStepTitle') }}
        </h3>

        <p class="text-center text-grey-2 mb-2">
          {{ $t('PageKycVerification.ReviewYourData') }}
        </p>

        <div class="h-[200px] pb-4">
          <img
            class="h-full aspect-auto mx-auto"
            :src="documentCaptured"
          />
        </div>
      </template>
    </MainHeader>

    <BaseForm
      class="w-full p-5 pb-10 flex flex-col gap-6"
      @submitted="doSubmittedContinue"
    >
      <fieldset>
        <label class="text-black-1">
          {{ $t('PageKycVerification.FirstName') }}</label
        >
        <BaseFormInputText
          v-model="customerInfo.firstName"
          name="firstName"
          :readonly="!isManualFilled"
          :rules="['required']"
        />
      </fieldset>

      <fieldset>
        <label class="text-black-1">
          {{ $t('PageKycVerification.LastName') }}</label
        >
        <BaseFormInputText
          v-model="customerInfo.lastName"
          name="lastName"
          :readonly="!isManualFilled"
          :rules="['required']"
        />
      </fieldset>

      <fieldset>
        <label class="text-black-1">
          {{ $t('PageKycVerification.DocumentId') }}</label
        >
        <BaseFormInputText
          v-model="customerInfo.documentId"
          name="documentId"
          :readonly="!isManualFilled"
          :rules="['required']"
        />
      </fieldset>

      <fieldset>
        <label class="text-black-1">
          {{ $t('PageKycVerification.DocumentType') }}</label
        >
        <BaseFormInputDropdown
          v-model="customerInfo.documentType"
          name="documentType"
          :rules="['required']"
          :options="documentOptions"
          :disabled="!isManualFilled"
          :title="$t('PageKycVerification.SelectDocumentTypeDropdownTitle')"
        />
      </fieldset>

      <fieldset>
        <label class="text-black-1">
          {{ $t('PageKycVerification.Country') }}</label
        >

        <BaseFormInputDropdown
          v-model="customerInfo.country"
          name="country"
          :rules="['required']"
          :options="countryOptions"
          :disabled="!isManualFilled"
          :title="$t('PageKycVerification.SelectCountryDropdownTitle')"
        />
      </fieldset>

      <i18n-t
        v-if="!isManualFilled"
        keypath="PageKycVerification.ManualFillInMessage"
        tag="p"
        class="text-red-1"
        scope="global"
      >
        <template #FillIn>
          <button
            type="button"
            class="underline text-white-1"
            @click="isManualFilled = true"
          >
            {{ $t('PageKycVerification.FillIn') }}
          </button>
        </template>
      </i18n-t>

      <fieldset class="flex gap-2 flex-col-2 mt-4">
        <button
          type="button"
          class="w-full self-center rounded-full py-2 text-orange-1 text-center bg-white-1 border-gradient-dark-1"
          @click="onClickReTake"
        >
          <span class="font-bold text-size-5">{{ $t('Button.ReTake') }}</span>
        </button>

        <button
          type="submit"
          class="w-full self-center rounded-full py-2 text-orange-1 text-center bg-black-1 border-gradient-1"
        >
          <span class="font-bold text-size-5">{{ $t('Button.Continue') }}</span>
        </button>
      </fieldset>
    </BaseForm>
  </template>

  <template v-else>
    <MainHeader class="!absolute">
      <template #title>
        <button
          type="button"
          class="p-2 absolute z-[1] left-2 top-4 flex gap-2 items-center"
          @click="$router.go(-1)"
        >
          <BaseIcon
            name="arrow-left"
            class="fill-white-1"
          />
        </button>

        <h3
          class="text-size-4 text-center font-bold px-10 text-white-1 pt-6 pb-4"
        >
          {{ $t('PageKycVerification.DocumentStepTitle') }}
        </h3>

        <p class="text-center text-grey-2 mb-2">
          {{ $t('PageKycVerification.DocumentStepDescription') }}
        </p>
      </template>
    </MainHeader>

    <div class="flex-1 relative">
      <x-dot-document-auto-capture id="x-dot-document-auto-capture" />

      <template v-if="documentCaptured">
        <div class="absolute top-0 h-full bg-black-opacity-1 flex items-center">
          <img :src="documentCaptured" />
        </div>
      </template>
    </div>
  </template>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import '@innovatrics/dot-document-auto-capture'
import DotService from '@/services/dot-service'
import { showToast, toBase64 } from '@/utils/shared-methods'
import { DOCUMENT_TYPE } from '@/utils/const'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores'
import countryJson from '@/assets/country_code.json'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['succeeded', 'update:modelValue'])

const { t } = useI18n()
const globalStore = useGlobalStore()

const isManualFilled = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const countryOptions = countryJson.map((c) => ({
  label: c.native_name,
  value: c.alpha_2
}))

const documentOptions = [
  {
    label: t('PageKycVerification.Id'),
    value: DOCUMENT_TYPE.ID
  },
  {
    label: t('PageKycVerification.Passport'),
    value: DOCUMENT_TYPE.PASSPORT
  }
]

const documentCaptured = ref('')
const finishProccessDocument = ref(false)
const customerInfo = ref({
  firstName: '',
  lastName: '',
  documentId: '',
  country: '',
  documentType: '',
  portrait: ''
})

const DOCUMENT_TYPE_MAP = {
  passport: documentOptions.find((o) => o.value === DOCUMENT_TYPE.PASSPORT),
  td3: documentOptions.find((o) => o.value === DOCUMENT_TYPE.PASSPORT),
  'identity-card': documentOptions.find((o) => o.value === DOCUMENT_TYPE.ID),
  td1: documentOptions.find((o) => o.value === DOCUMENT_TYPE.ID)
}

watch(
  finishProccessDocument,
  async () => {
    if (finishProccessDocument.value) return

    await nextTick()
    const documentAutoCaptureHTMLElement = document.getElementById(
      'x-dot-document-auto-capture'
    )
    documentAutoCaptureHTMLElement.cameraOptions = {
      imageType: 'png',
      cameraFacing: 'environment',
      photoTakenCb: handlePhotoTaken,
      onError: (e) => {
        showToast({ type: 'fail', message: e.message })
      },
      uiCustomisation: {
        placeholder: {
          documentPlaceholder: 'id-rectangle-dash-front'
        },

        instructions: {
          candidate_selection: t(
            'PageKycVerification.DocumentCandidateSelection'
          ),
          document_centering: t('PageKycVerification.DocumentCentering'),
          document_too_close: t('PageKycVerification.DocumentTooClose'),
          document_not_present: t('PageKycVerification.DocumentNotPresent'),
          document_too_far: t('PageKycVerification.DocumentTooFar'),
          sharpness_too_low: t('PageKycVerification.DocumentSharpnessTooLow'),
          brightness_too_high: t(
            'PageKycVerification.DocumentBrightnessTooHigh'
          ),
          hotspots_present: t('PageKycVerification.DocumentHotspotsPresent')
        },
        colors: {
          placeholderColorSuccess: 'var(--root-orange-1)',
          instructionColorSuccess: 'var(--root-orange-1)'
        },
        appStateInstructions: {
          loading: {
            text: t('PageKycVerification.DocumentLoadingComponent')
          },
          waiting: {
            visible: false
          }
        }
      }
    }
  },
  { immediate: true }
)

function onClickReTake() {
  documentCaptured.value = false
  customerInfo.value = {
    firstName: '',
    lastName: '',
    documentId: '',
    country: '',
    documentType: '',
    portrait: ''
  }
  isManualFilled.value = false
  finishProccessDocument.value = false
}

function doSubmittedContinue() {
  emit('succeeded', {
    ...customerInfo.value,
    document: documentCaptured.value
  })
}

async function handlePhotoTaken(e) {
  const document = await toBase64(e)
  documentCaptured.value = await toBase64(e, { fullPath: true })

  await proccessDocument(document)
}

async function proccessDocument(document) {
  try {
    if (!globalStore.currentCustomerId) {
      const res = await DotService.createCustomer()
      globalStore.currentCustomerId = res.id
    }

    await DotService.createDocument(globalStore.currentCustomerId)
    await DotService.uploadDocument({
      customerId: globalStore.currentCustomerId,
      document
    })
    await setCustomer()
  } catch (e) {
    showToast({ type: 'fail', message: e.message })
  }

  finishProccessDocument.value = true
}

async function setCustomer() {
  try {
    const { customer } = await DotService.getCustomer(
      globalStore.currentCustomerId
    )
    const { data: portrait } = await DotService.getCustomerPortrait(
      globalStore.currentCustomerId
    )
    customerInfo.value = {
      firstName:
        customer.givenNames?.mrz || customer.givenNames?.visualZone || '',
      lastName: customer.surname?.mrz || customer.surname?.visualZone || '',
      documentId:
        customer.document?.documentNumber?.mrz ||
        customer.document?.documentNumber?.visualZone ||
        customer.document?.mrz?.td3?.documentNumber ||
        customer.document?.mrz?.td1?.documentNumber ||
        '',
      country: getCountry(customer),
      documentType:
        DOCUMENT_TYPE_MAP[
          customer.document?.type.type ||
            customer.document?.type.machineReadableTravelDocument
        ]?.value || '',
      portrait
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

function getCountry(customer) {
  const alpha3 = (
    customer.nationality?.mrz ||
    customer.document?.type.country ||
    ''
  ).toLowerCase()
  return countryJson.find((c) => c.alpha_3 === alpha3)?.alpha_2 || ''
}
</script>

<style scoped></style>
