const APP_STORAGE_KEY = {
  TOKEN: 'token',
  ANNOUNCEMENT: 'announcement',
  DOT_CUSTOMER_ID: 'dot_customer_id',
  PLAN_TYPE: 'plan_type'
}

export const STORAGE_KEY = {
  ...APP_STORAGE_KEY,
  LOCALE: 'locale'
}

export function setItemToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItemFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return localStorage.getItem(key) ?? ''
  }
}

export function removeItemFromStorage(key) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  localStorage.clear()
}

export function clearAppStorage() {
  Object.values(APP_STORAGE_KEY).forEach((key) => {
    removeItemFromStorage(key)
  })
}
