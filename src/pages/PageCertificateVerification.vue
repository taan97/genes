<template>
  <BaseHeader :title="$t('PageCertificateVerification.Title')" />

  <BaseForm
    class="flex-1 p-6 pb-10 flex flex-col gap-6"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="form.certificateNumber"
      name="certificateNumber"
      :placeholder="$t('PageCertificateVerification.CertificateNumber')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="id-card" />
      </template>
    </BaseFormInputText>

    <h3 class="text-size-4 font-bold mt-6">
      {{ $t('PageCertificateVerification.UploadCertificate') }}
    </h3>

    <ImageUploader
      id="PassportInformationPage"
      v-model="form.proof"
      @changed="(e) => (form.backDocument = e)"
    >
      <template #add-button>
        <p class="flex gap-2">
          <BaseIcon
            name="camera"
            render-as-image
          />
          <span class="underline">
            {{ $t('PageCertificateVerification.UploadCertificateLabel') }}
          </span>
        </p>
      </template>
    </ImageUploader>

    <div class="flex-1" />

    <div class="w-full grid grid-cols-2 gap-4">
      <button
        type="button"
        class="rounded-full p-3 text-orange-1 text-center bg-white-1 shadow-outer-orange-dark-1 border-gradient-dark-1"
        @click="$router.go(-1)"
      >
        <span class="font-bold text-size-5">{{ $t('Button.Cancel') }}</span>
      </button>

      <button
        type="submit"
        class="rounded-full p-3 text-orange-1 text-center bg-black-1 shadow-outer-orange-dark-1 border-gradient-1"
      >
        <span class="font-bold text-size-5">{{ $t('Button.Submit') }}</span>
      </button>
    </div>
  </BaseForm>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import UserCenterService from '@/services/user-center-service'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  certificateNumber: '',
  proof: ''
})

async function doSubmitted() {
  try {
    await UserCenterService.submitCertificate({
      certificateNumber: form.certificateNumber,
      proof: form.proof
    })

    await userStore.setUser({ replace: true })
    router.go(-1)
  } catch {}
}
</script>

<style scoped></style>
