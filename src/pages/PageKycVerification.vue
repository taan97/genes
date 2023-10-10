<template>
  <KycDocumentAutoCapture
    v-if="currentStep === 1"
    v-model="isManualFilled"
    @succeeded="doSucceededDocumentCapture"
  />

  <KycFaceAutoCapture
    v-else-if="currentStep === 2"
    :portrait="documentPortrait"
    @failed="doFailedfaceCapture"
    @succeeded="doSucceededFaceCapture"
  />

  <KycStatus
    v-else
    :status="verificationStatus"
    @retried="doRetried"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VERIFICATION_STATUS } from '@/utils/const.js'
import UserCenterService from '@/services/user-center-service'

const currentStep = ref(1)

const userForm = ref({
  country: '',
  documentType: '',
  firstName: '',
  lastName: '',
  documentId: '',
  front: '',
  selfie: ''
})

const documentPortrait = ref('')
const verificationStatus = ref(VERIFICATION_STATUS.SUCCESS_VERIFIED)
const isManualFilled = ref(false)

function doSucceededDocumentCapture(customer) {
  documentPortrait.value = customer.portrait

  userForm.value = {
    ...userForm.value,
    country: customer.country,
    documentType: customer.documentType,
    firstName: customer.firstName,
    lastName: customer.lastName,
    documentId: customer.documentId,
    front: customer.document
  }

  currentStep.value = 2
}

async function doSucceededFaceCapture(selfie) {
  userForm.value.selfie = selfie

  try {
    await UserCenterService.verifyIdentity({
      ...userForm.value,
      manualReview: isManualFilled.value
    })

    verificationStatus.value = isManualFilled.value
      ? VERIFICATION_STATUS.UNDER_REVIEW
      : VERIFICATION_STATUS.SUCCESS_VERIFIED

    currentStep.value = 3
  } catch {}
}

function doFailedfaceCapture() {
  verificationStatus.value = VERIFICATION_STATUS.FAIL_VERIFY

  currentStep.value = 3
}

function doRetried() {
  verificationStatus.value = VERIFICATION_STATUS.SUCCESS_VERIFIED
  isManualFilled.value = false
  documentPortrait.value = ''
  userForm.value = {
    country: '',
    documentType: '',
    firstName: '',
    lastName: '',
    documentId: '',
    front: '',
    selfie: ''
  }

  currentStep.value = 1
}
</script>

<style scoped></style>
