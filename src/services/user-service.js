import { http } from './base-service'

export default {
  changeTransactionPassword(data) {
    return http.request({
      url: '/user/changeFundPassword',
      method: 'POST',
      data: {
        account: data.email,
        email_code: data.emailVerificationCode,
        password: data.newPassword,
        password_confirmation: data.confirmNewPassword
      }
    })
  },

  changeSecurityQuestion(data) {
    return http.request({
      url: '/user/changeSecretQuestion',
      method: 'POST',
      data: {
        account: data.email,
        email_code: data.emailVerificationCode,
        question: data.question,
        answer: data.answer
      }
    })
  },

  getMessages({ type, page } = {}) {
    return http.request({
      url: '/message/list',
      method: 'GET',
      params: {
        type,
        page
      }
    })
  },

  getHelpList() {
    return http.request({
      url: '/user/helpCenter'
    })
  },

  countMessages() {
    return http.request({
      url: '/message/count',
      method: 'GET'
    })
  },

  getLivestreamStatus() {
    return http.request({
      url: '/config',
      method: 'GET'
    })
  },

  changeAvatar(url) {
    return http.request({
      url: '/user/avatar',
      method: 'POST',
      data: {
        avatar: url
      }
    })
  },

  changeNickname(name) {
    return http.request({
      url: '/user/nickname',
      method: 'POST',
      data: {
        nickname: name
      }
    })
  },

  secretQuestion() {
    return http.request({
      url: '/secretQuestion',
      method: 'GET'
    })
  },

  sendFeedback(form) {
    return http.request({
      url: '/user/sendFeedback',
      method: 'POST',
      data: {
        content: form.problem,
        name: form.username,
        email: form.email,
        phone: `+${form.countryCode}${form.phoneNumber}`,
        screenshot: form.proof,
        rating: form.rate
      }
    })
  },

  getAnnouncement() {
    return http.request({
      url: '/announcement',
      method: 'GET'
    })
  },

  setAlert(alert) {
    return http.request({
      url: '/user/alert',
      method: 'POST',
      data: {
        alert: alert
      }
    })
  },

  openPlanB() {
    return http.request(
      {
        url: '/api2/user/create_wallet',
        method: 'POST',
        data: {}
      },
      { exactUrl: true }
    )
  }
}
