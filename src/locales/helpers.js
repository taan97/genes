import {
  getItemFromStorage,
  setItemToStorage,
  removeItemFromStorage,
  STORAGE_KEY
} from '@/utils/storage-adapter'
import { DEFAULT_LOCALE, LOCALE_LIST } from './languages'

export function getLocale() {
  return getItemFromStorage(STORAGE_KEY.LOCALE) ?? getStartingLocale()
}

export function initLocale() {
  let locale = getLocale()

  if (!LOCALE_LIST.find((l) => l.value === locale)) {
    removeItemFromStorage(STORAGE_KEY.LOCALE)
    locale = getStartingLocale()
  }
  setItemToStorage(STORAGE_KEY.LOCALE, locale)
}

function getStartingLocale() {
  const browserLocale = navigator.language.toLowerCase().split('-')[0]

  const localePattern = new RegExp(`^${browserLocale}\\b`)
  return (
    LOCALE_LIST.find((l) => localePattern.test(l.value))?.value ||
    DEFAULT_LOCALE
  )
}
