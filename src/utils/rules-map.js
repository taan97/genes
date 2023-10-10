import i18n from '@/locales'
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

  between6And20Characters: {
    validator: (v) => v.length >= 6 && v.length <= 20,
    message: () =>
      i18n.global.t('ValidationMessage.MustBeBetween', {
        min: 6,
        max: 20
      })
  },

  password: {
    validator: (v) => v.length >= 8 && v.length <= 32,
    message: () =>
      i18n.global.t('ValidationMessage.MustBeBetween', {
        min: 8,
        max: 32
      })
  }
}
