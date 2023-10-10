import {
  getItemFromStorage,
  setItemToStorage,
  STORAGE_KEY
} from '@/utils/storage-adapter'

export const PLAN_TYPE = {
  _A: 'plan_a',
  _B: 'plan_b'
}

export const PLAN_TYPE_LIST = [
  {
    label: 'AppPlanSelector.PlanA',
    value: PLAN_TYPE._A
  },
  {
    label: 'AppPlanSelector.PlanB',
    value: PLAN_TYPE._B
  }
]

export const PLAN_TYPE_MAP = {
  [PLAN_TYPE._A]: '/api',
  [PLAN_TYPE._B]: '/api2'
}

export const SHARED_PLAN_API = [
  '/login',
  '/register',
  '/captcha',
  '/secretQuestion',
  '/forgotPassword',
  '/sendEmail',
  '/logout',
  '/user/avatar',
  '/user/nickname',
  '/user/changeSecretQuestion',
  '/user/helpCenter',
  '/user/changePassword',
  '/user/changeFundPassword',
  '/user/documents',
  '/user/sendEmail',
  '/user/upload'
]

export function setPlan(type) {
  setItemToStorage(STORAGE_KEY.PLAN_TYPE, type)
}

export function getPlan() {
  return getItemFromStorage(STORAGE_KEY.PLAN_TYPE) ?? PLAN_TYPE._A
}

export function getPlanUrlFrom(url) {
  if (SHARED_PLAN_API.includes(url)) return PLAN_TYPE_MAP[PLAN_TYPE._A] + url
  return PLAN_TYPE_MAP[getPlan()] + url
}
