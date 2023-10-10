import { createI18n } from 'vue-i18n'
import { APP } from '@/utils/const'
import { getLocale, initLocale } from './helpers'
import messages from './languages'

initLocale()

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: APP.FALLBACK_LOCALE,
  messages
})

export default i18n
