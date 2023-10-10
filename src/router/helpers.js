import { getItemFromStorage, STORAGE_KEY } from '@/utils/storage-adapter'
import {
  VERIFICATION_STATUS,
  CERTIFICATE_STATUS,
  CERTIFICATE_VERIFICATION
} from '@/utils/const'
import { useUserStore, useOtcStore, useGlobalStore } from '@/stores'
import UserCenterService from '@/services/user-center-service'
import FiatService from '@/services/fiat-service'
import { isEmpty, removeEmpty } from '@/utils/shared-methods'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal'
import i18n from '@/locales'

export function scrollBehavior() {
  return { top: 0 }
}

export const emptyQueryGuard = ({ redirect } = {}) => {
  return function (to, from, next) {
    if (isEmpty(removeEmpty(to.query))) return next({ name: redirect })

    return next()
  }
}

export const emptyParamsGuard = ({ redirect } = {}) => {
  return function (to, from, next) {
    if (isEmpty(removeEmpty(to.params))) return next({ name: redirect })

    return next()
  }
}

export async function globalAuthenticationGuard(to, from, next) {
  const isVisitingFreePass = ['PageSignUpTerm'].includes(to.name)

  if (isVisitingFreePass) return next()

  const isSignedIn = Boolean(getItemFromStorage(STORAGE_KEY.TOKEN))

  const isVisitingAuthenticationRoutes = [
    'PageStart',
    'PageSignIn',
    'PageResetPassword',
    'PageSignUpForm'
  ].includes(to.name)

  if (!isSignedIn && !isVisitingAuthenticationRoutes)
    return next({ name: 'PageSignIn' })

  if (isSignedIn) {
    // if logged in, then fetch user info
    const userStore = useUserStore()
    await userStore.setUser()
  }

  if (isSignedIn && isVisitingAuthenticationRoutes)
    return next({ name: 'PageHome' })

  return next()
}

export async function otcOrderGuard(to, from, next) {
  const otcStore = useOtcStore()
  await otcStore.setOrderDetail(to.params.id)
  next()
}

export function addFromRoute(to, from) {
  to.meta.from = from.name
}

export async function identityVerificationGuard(to, from, next) {
  const userStore = useUserStore()

  if (userStore.verified === null) return next(false)

  const status = await getVerificationStatus()

  if (status === null) return next(false)

  to.meta.status = status
  next()
}

export async function identityVerificationFirstStepGuard(to, from, next) {
  if (
    (to.meta.status === VERIFICATION_STATUS.FAIL_VERIFY && !to.params.retry) ||
    to.meta.status === VERIFICATION_STATUS.UNDER_REVIEW
  )
    return next({ name: 'PageIdentityVerificationStatus' })

  next()
}

export async function identityVerificationStatusGuard(to, from, next) {
  if (to.meta.status === VERIFICATION_STATUS.NOT_YET_VERIFIED)
    return next({ name: 'PageIdentityVerificationFirstStep' })

  next()
}

export async function withdrawalFiatGuard(to, from, next) {
  const userBank = await getUserBank()
  if (isEmpty(userBank)) return next({ name: 'PageBindBankCard' })

  to.params = {
    bankName: userBank.bank,
    bankAccountNumber: userBank.account,
    bankAccountName: userBank.name
  }
  return next()
}

export async function setUserBankToParams(to, from, next) {
  try {
    const { data } = await FiatService.getUserBank()
    to.params = {
      ...to.params,
      bankName: data.bank,
      bankAccountNumber: data.account,
      bankAccountName: data.name
    }
    next()
  } catch {
    next(false)
  }
}

export function showGlobalRewardModal(to) {
  if (to.query.newTab) return

  // const isSignedOut = !getItemFromStorage(STORAGE_KEY.TOKEN)
  // if (isSignedOut) return

  if (to.name === 'PageHome') {
    const globalStore = useGlobalStore()
    globalStore.setClaimRewardModalVisibility(true)
    globalStore.setClaimGiftModalVisibility(true)
  }
}

export async function updateEquityGuard(to, from, next) {
  const userStore = useUserStore()

  if (userStore.lock === CERTIFICATE_VERIFICATION.PASS) return next()

  const status = await getCertificateStatus()
  if (status === null) return next(false)

  const Modal = useConfirmModal()
  if (status === CERTIFICATE_STATUS.UNDER_REVIEW) {
    try {
      await Modal.open({
        headerIcon: 'share-certificate',
        title: i18n.global.t('PageCertificateVerification.ConfirmModalTitle'),
        message: i18n.global.t(
          'PageCertificateVerification.ModalUnderReviewMessage'
        ),
        confirmText: i18n.global.t('PageCertificateVerification.ModalClose'),
        hideCancelButton: true
      })
    } catch {}
    from.name ? next(false) : next({ name: 'PageHome' })
  } else {
    try {
      await Modal.open({
        headerIcon: 'share-certificate',
        title: i18n.global.t('PageCertificateVerification.ConfirmModalTitle'),
        message: i18n.global.t(
          'PageCertificateVerification.ConfirmModalMessage'
        ),
        confirmText: i18n.global.t(
          'PageCertificateVerification.ConfirmModalConfirmText'
        )
      })

      next({ name: 'PageCertificateVerification' })
    } catch {
      from.name ? next(false) : next({ name: 'PageHome' })
    }
  }
}

/* private methods */
async function getVerificationStatus() {
  try {
    const res = await UserCenterService.getVerificationStatus()
    return res.data.status
  } catch {
    return null
  }
}

async function getCertificateStatus() {
  try {
    const res = await UserCenterService.getCertificateStatus()
    return res.data
  } catch {
    return null
  }
}

async function getUserBank() {
  try {
    const res = await FiatService.getUserBank()
    return res.data
  } catch {
    return {}
  }
}
