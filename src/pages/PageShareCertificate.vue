<template>
  <BaseHeader
    :title="$t('PageShareCertificate.Title')"
    class="bg-black-2 text-white-1"
  >
    <template #sub-header>
      <router-link
        :to="{ name: 'PageShareCertificateList' }"
        class="flex gap-2 max-w-max ml-auto"
      >
        <BaseIcon name="listing" />
        <span class="underline">{{ $t('PageShareCertificate.Listing') }}</span>
      </router-link>
    </template>
  </BaseHeader>

  <p
    class="text-size-6 text-orange-1 font-semibold text-center whitespace-pre-line bg-black-2 pb-3"
  >
    {{ $t('PageShareCertificate.Description') }}
  </p>

  <div class="mx-auto my-2 p-4 bg-black-2 w-[312px]">
    <img src="@/assets/images/sample-certificate.jpg" />
  </div>

  <div class="px-6 pt-4 pb-10">
    <p class="text-red-1 font-bold">
      {{ $t('PageShareCertificate.ImportantNotice') }}
    </p>

    <ul class="list-disc ml-4 mt-2 mb-6 grid gap-4 text-left">
      <li
        v-for="message in $tm('PageShareCertificate.ImportantNoticeMessages')"
        :key="message"
      >
        {{ message }}
      </li>
    </ul>

    <button
      type="button"
      class="rounded-full w-full flex items-center bg-black-1 py-3 px-6 border-gradient-1 shadow-outer-orange-dark-1"
      @click="onClickApply"
    >
      <BaseIcon name="share-certificate" />
      <span class="flex-1 text-center text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Apply') }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import { useUserStore } from '@/stores'
import { VERIFICATION_STATUS } from '@/utils/const'
// import { Toast } from 'vant'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

async function onClickApply() {
  // Toast(t('AppMessage.ComingSoon'))

  if (userStore.verified === VERIFICATION_STATUS.SUCCESS_VERIFIED)
    return router.push({ name: 'PageShareCertificateConfirm' })

  const Modal = useConfirmModal()

  try {
    await Modal.open({
      title: t('PageShareCertificate.KycConfirmTitle'),
      headerIcon: 'name-big',
      message: t('PageShareCertificate.KycConfirmMessage'),
      confirmText: t('PageShareCertificate.KycConfirmButton')
    })

    router.push({ name: 'PageIdentityVerificationFirstStep' })
  } catch {}
}
</script>

<style scoped></style>
