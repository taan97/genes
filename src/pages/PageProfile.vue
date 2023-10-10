<template>
  <BaseHeader
    :title="$t('PageProfile.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <ProfilePhoto />
    </template>
  </BaseHeader>

  <div class="p-5 flex flex-1 flex-col gap-4">
    <router-link
      :to="{ name: 'PagePersonalDetails' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="user-big"
        class="absolute"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageProfile.PersonalDetails') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <!-- <router-link
      :to="{ name: 'PageMyQrCode' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="qr-code"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageProfile.QrCode') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link> -->

    <router-link
      :to="{ name: 'PageIdentityVerificationFirstStep' }"
      class="flex justify-between items-center gap-2 rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      :class="{
        'pointer-events-none': userStore.verified === SUCCESS_VERIFIED
      }"
    >
      <BaseIcon
        name="card-big"
        class="absolute fill-orange-1"
      />
      <p class="flex-1 font-bold ml-8 text-start">
        {{ $t('PageProfile.KycVerification') }}
      </p>
      <span
        class="text-size-2"
        :style="{ color: verificationStatus.color }"
      >
        {{ $t(verificationStatus.key) }}
      </span>
      <BaseIcon
        v-if="userStore.verified !== SUCCESS_VERIFIED"
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      v-if="userStore.lock === CERTIFICATE_VERIFICATION.FAIL"
      :to="{ name: 'PageCertificateVerification' }"
      class="flex justify-between items-center rounded-full gap-1 py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      :class="{
        'pointer-events-none':
          certificateStatus.value === CERTIFICATE_STATUS.SUCCESS_VERIFIED ||
          certificateStatus.value === CERTIFICATE_STATUS.UNDER_REVIEW
      }"
    >
      <BaseIcon
        name="share-certificate"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start flex-1">
        {{ $t('PageProfile.CertificateVerification') }}
      </p>

      <span
        class="text-size-2"
        :style="{ color: certificateStatus.color }"
      >
        {{ $t(certificateStatus.key) }}
      </span>

      <BaseIcon
        v-if="
          certificateStatus.value === CERTIFICATE_STATUS.FAIL_VERIFY ||
          certificateStatus.value === CERTIFICATE_STATUS.NOT_YET_VERIFIED
        "
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <!-- <router-link
      :to="{ name: 'PageBindBankCard' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="card"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.BindBankCard') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link> -->
  </div>
</template>

<script setup>
import UserCenterService from '@/services/user-center-service'
import { useUserStore } from '@/stores'
import {
  VERIFICATION_STATUS,
  CERTIFICATE_STATUS,
  CERTIFICATE_VERIFICATION
} from '@/utils/const'
import { computed, ref } from 'vue'

const userStore = useUserStore()
const { SUCCESS_VERIFIED, UNDER_REVIEW, FAIL_VERIFY, NOT_YET_VERIFIED } =
  VERIFICATION_STATUS

const verificationStatusMap = {
  [SUCCESS_VERIFIED]: {
    key: 'PageProfile.Verified',
    color: 'var(--root-green-2)'
  },
  [UNDER_REVIEW]: {
    key: 'PageProfile.UnderReview',
    color: 'var(--root-white-1)'
  },
  [FAIL_VERIFY]: {
    key: 'PageProfile.VerificationFailed',
    color: 'var(--root-red-2)'
  },
  [NOT_YET_VERIFIED]: {
    key: 'PageProfile.NotVerify',
    color: 'var(--root-red-2)'
  }
}

const verificationStatus = computed(
  () => verificationStatusMap[userStore.verified]
)

const CERTIFICATE_STATUS_MAP = {
  [CERTIFICATE_STATUS.SUCCESS_VERIFIED]: {
    key: 'PageProfile.CertificateVerified',
    color: 'var(--root-green-2)',
    value: CERTIFICATE_STATUS.SUCCESS_VERIFIED
  },
  [CERTIFICATE_STATUS.UNDER_REVIEW]: {
    key: 'PageProfile.CertificateUnderReview',
    color: 'var(--root-white-1)',
    value: CERTIFICATE_STATUS.UNDER_REVIEW
  },
  [CERTIFICATE_STATUS.FAIL_VERIFY]: {
    key: 'PageProfile.CertificateFailed',
    color: 'var(--root-red-2)',
    value: CERTIFICATE_STATUS.FAIL_VERIFY
  },
  [CERTIFICATE_STATUS.NOT_YET_VERIFIED]: {
    key: 'PageProfile.CertificateNotVerify',
    color: 'var(--root-red-2)',
    value: CERTIFICATE_STATUS.NOT_YET_VERIFIED
  }
}

const certificateStatus = ref(
  CERTIFICATE_STATUS_MAP[CERTIFICATE_STATUS.NOT_YET_VERIFIED]
)

setCertificateStatus()

async function setCertificateStatus() {
  try {
    const { data: status } = await UserCenterService.getCertificateStatus()
    certificateStatus.value = CERTIFICATE_STATUS_MAP[status]
  } catch {}
}
</script>

<style scoped></style>
