import { getItemFromStorage } from '@/utils/storage-adapter'
import { STORAGE_KEY, IDENTITY_VERIFICATION } from '@/utils/const'
import { useUserStore, useOtcStore } from '@/stores'
import UserCenterService from '@/services/user-center-service'

export function scrollBehavior() {
  return { top: 0 }
}

export async function globalAuthenticationGuard(to, from, next) {
  if (to.matched.length === 0) return next({ name: 'PageHome' })

  const isSignedIn = Boolean(getItemFromStorage(STORAGE_KEY.TOKEN))

  const isVisitingAuthenticationRoutes = [
    'PageSignIn',
    'PageForgotPassword',
    'PageSignUpForm',
    'PageSignUpTerm'
  ].includes(to.name)

  if (!isSignedIn && !isVisitingAuthenticationRoutes)
    return next({ name: 'PageSignIn' })

  if (isSignedIn) {
    // if logged in, then fetch user info
    const userStore = useUserStore()
    await userStore.setUser()

    if (userStore.forwardValidator && to.name !== 'PageBindingValidator') {
      return next({ name: 'PageBindingValidator' })
    }
  }

  if (isSignedIn && isVisitingAuthenticationRoutes)
    return next({ name: 'PageHome' })

  return next()
}

export function addFromRoute(to, from, next) {
  to.meta.from = from.name
  next()
}

export async function identityVerificationGuard(to, from, next) {
  const userStore = useUserStore()

  if (userStore.verified === null) return next(false)

  if (userStore.verified) return next({ name: 'PageHome' })

  const status = await getVerificationStatus()

  if (status === null) return next(false)

  to.meta.status = status
  next()
}

export async function identityVerificationFirstStepGuard(to, from, next) {
  if (
    (to.meta.status === IDENTITY_VERIFICATION.STATE.FAIL_VERIFY &&
      !to.params.retry) ||
    to.meta.status === IDENTITY_VERIFICATION.STATE.UNDER_REVIEW
  )
    return next({ name: 'PageIdentityVerificationStatus' })

  next()
}

export async function identityVerificationSecondStepGuard(to, from, next) {
  if (
    !to.params.country ||
    ![
      IDENTITY_VERIFICATION.TYPE_ID,
      IDENTITY_VERIFICATION.TYPE_PASSPORT
    ].includes(Number(to.params.type))
  )
    return next({ name: 'PageIdentityVerificationFirstStep' })

  next()
}

export async function identityVerificationStatusGuard(to, from, next) {
  if (to.meta.status === IDENTITY_VERIFICATION.STATE.NOT_YET_VERIFIED)
    return next({ name: 'PageIdentityVerificationFirstStep' })

  next()
}

export async function otcOrderGuard(to, from, next) {
  const otcStore = useOtcStore()
  await otcStore.setOrderDetail(to.params.id)
  next()
}

export function bindingValidatorGuard(to, from, next) {
  const userStore = useUserStore()
  if (userStore.is_two_factor) return next({ name: 'PageHome' })

  return next()
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
