import i18n from '@/locales'
const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
const emailPattern = /\S+@\S+\.\S/

export const rulesMap = {
  required: {
    validator: (v) => Boolean(v.length),
    message: () => i18n.global.t('ValidationMessage.Required')
  },

  email: {
    validator: (v) => emailPattern.test(v),
    message: () => i18n.global.t('ValidationMessage.EmailAddressIncorrect')
  },

  between6And12Characters: {
    validator: (v) => v.length >= 1 && v.length <= 20,
    message: () => i18n.global.t('ValidationMessage.Between6And12Characters')
  },

  password: {
    validator: (v) => passwordPattern.test(v),
    message: () => i18n.global.t('ValidationMessage.Password')
  }
}
