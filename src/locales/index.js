import { createI18n } from 'vue-i18n'
import { getLocale, initLocale } from './helpers'
import { FALLBACK_LOCALE } from './languages'
import { setItemToStorage, STORAGE_KEY } from '@/utils/storage-adapter'
import { getLocaleMessages } from './simple-localize'

initLocale()

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: {},
  fallbackWarn: false,
  missingWarn: false
})

setLocale()

export default i18n

export {
  LOCALE,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LOCALE_LIST,
  HTTP_LOCALE
} from './languages'

export async function setLocale(locale = getLocale()) {
  setItemToStorage(STORAGE_KEY.LOCALE, locale)

  i18n.global.setLocaleMessage(
    locale,
    await import(`@/locales/languages/${locale}.json`)
  )

  i18n.global.locale.value = locale

  const messages = await getLocaleMessages(locale)
  messages && i18n.global.setLocaleMessage(locale, messages)
}
