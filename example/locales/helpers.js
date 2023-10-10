import { APP, STORAGE_KEY } from '@/utils/const'
import { getItemFromStorage, setItemToStorage } from '@/utils/storage-adapter'
import i18n from './index'
import messages from './languages'

export function getLocale() {
  return getItemFromStorage(STORAGE_KEY.LOCALE) ?? getStartingLocale()
}

export function setLocale(locale) {
  setItemToStorage(STORAGE_KEY.LOCALE, locale)
  i18n.global.locale.value = locale
}

export function initLocale() {
  const locale = getLocale()
  setItemToStorage(STORAGE_KEY.LOCALE, locale)
}

function getStartingLocale() {
  const browserLocale = getBrowserLocale()

  return Object.keys(messages).includes(browserLocale)
    ? browserLocale
    : APP.DEFAULT_LOCALE
}

function getBrowserLocale() {
  const trimmedLocale = navigator.language.trim().split(/-|_/)[0]

  return trimmedLocale
}
