<template>
  <BaseHeader :title="$t('PageIdentityVerification.PageTitle')" />

  <div class="p-5">
    <keep-alive>
      <component
        :is="selectedForm"
        @submitted="doSubmitted"
      />
    </keep-alive>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { IDENTITY_VERIFICATION } from '@/utils/const.js'
import { computed } from 'vue'
import IdentityVerificationFormId from '@/components/feature/IdentityVerificationFormId.vue'
import IdentityVerificationFormPassport from '@/components/feature/IdentityVerificationFormPassport.vue'
import UserCenterService from '@/services/user-center-service'
import { useUserStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const selectedForm = computed(() =>
  Number(route.params.type) === IDENTITY_VERIFICATION.TYPE_ID
    ? IdentityVerificationFormId
    : IdentityVerificationFormPassport
)

async function doSubmitted(form) {
  const requestBody = {
    country: route.params.country,
    type: Number(route.params.type),
    first_name: form.firstName,
    last_name: form.lastName,
    id_number: form.idNumber,
    front: form.frontDocument,
    reverse: form.backDocument,
    hand: form.handHeldDocument
  }

  try {
    await UserCenterService.verifyIdentity(requestBody)
    handleVerificationSubmitSuccess()
  } catch {}
}

async function handleVerificationSubmitSuccess() {
  await updateUser()
  router.push({ name: 'PageIdentityVerificationStatus' })
}

async function updateUser() {
  const store = useUserStore()
  await store.setUser({ replace: true })
}
</script>

<style scoped></style>
