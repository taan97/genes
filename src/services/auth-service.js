import { useUserStore } from '@/stores'
import { http } from './base-service'
import { getLocale } from '@/locales/helpers'
import { LOCALE } from '@/locales/languages'

export default {
  signUp(user) {
    const realName =
      getLocale() === LOCALE.ZH_CN
        ? `${user.lastName.trim()} ${user.firstName.trim()}`
        : `${user.firstName.trim()} ${user.lastName.trim()}`

    return http.request({
      url: '/register',
      method: 'POST',
      data: {
        real_name: realName,
        account: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.confirmPassword,
        transaction_password: user.transactionPassword,
        transaction_password_confirmation: user.confirmTransactionPassword,
        email_code: user.emailVerificationCode,
        phone_number: user.phoneNumber,
        country: `+${user.countryCode}`,
        question: user.question,
        answer: user.answer,
        invite_code: user.referralId
      }
    })
  },

  signIn(user) {
    return http.request({
      url: '/login',
      method: 'POST',
      data: {
        account: user.username,
        password: user.password,
        key: user.key,
        captcha: user.captcha
      }
    })
  },

  signOut() {
    return http.request({
      url: '/logout',
      method: 'GET'
    })
  },

  getUser() {
    return http.request({
      url: '/user/info',
      method: 'GET'
    })
  },

  forgotPassword(user) {
    return http.request({
      url: '/forgotPassword',
      method: 'POST',
      data: {
        account: user.email,
        email_code: user.emailVerificationCode,
        password: user.password,
        password_confirmation: user.password
      }
    })
  },

  changePassword(user) {
    return http.request({
      url: '/user/changePassword',
      method: 'POST',
      data: {
        password: user.currentPassword,
        password_confirmation: user.confirmNewPassword,
        password_new: user.newPassword
      }
    })
  },

  sendCodeToEmail(email, type) {
    return http.request({
      url: '/sendEmail',
      method: 'POST',
      data: {
        email,
        event: type
      }
    })
  },

  sendCodeToUserEmail(type) {
    const userStore = useUserStore()
    return http.request({
      url: '/user/sendEmail',
      method: 'POST',
      data: {
        email: userStore.email,
        event: type
      }
    })
  },

  getCaptcha() {
    return http.request({
      url: '/captcha',
      method: 'GET'
    })
  }
}
