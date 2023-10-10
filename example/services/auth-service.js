import http from './base-service'

export default {
  signUp(user) {
    return http.request({
      url: '/api/register',
      method: 'POST',
      data: {
        account: user.email,
        password: user.password,
        password_confirmation: user.confirmPassword,
        nickname: user.username,
        email_code: user.emailVerificationCode,
        phone_number: user.phoneNumber,
        invite_code: user.invitationCode,
        country: user.countryCode
      }
    })
  },

  signIn({ email, password }) {
    return http.request({
      url: '/api/login',
      method: 'POST',
      data: {
        account: email,
        password
      }
    })
  },

  signOut() {
    return http.request({
      url: '/api/logout',
      method: 'GET'
    })
  },

  getUser() {
    return http.request({
      url: '/api/user/info',
      method: 'GET'
    })
  },

  forgotPassword(user) {
    return http.request({
      url: '/api/forgotPassword',
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
      url: '/api/user/changePassword',
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
      url: '/api/sendEmail',
      method: 'POST',
      data: {
        email,
        event: type
      }
    })
  }
}
