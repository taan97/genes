import { http } from './base-service'

export default {
  verifyIdentity(data) {
    return http.request({
      url: '/user/verifiedSubmit',
      method: 'POST',
      data
    })
  },

  submitCertificate(data) {
    return http.request({
      url: '/certificate/verify',
      method: 'POST',
      data: {
        number: data.certificateNumber,
        img: data.proof
      }
    })
  },

  getCertificateStatus() {
    return http.request({
      url: '/certificate/info',
      method: 'GET'
    })
  },

  getVerificationStatus() {
    return http.request({
      url: '/user/verified',
      method: 'GET'
    })
  },

  getDocuments({ pageNumber } = {}) {
    return http.request({
      url: '/user/documents',
      method: 'GET',
      params: {
        page: pageNumber ?? 1
      }
    })
  },

  orderCertificate(data) {
    return http.request({
      url: '/user/orderCertificate',
      method: 'POST',
      data: {
        name: data.contactName,
        address: data.address,
        phone: data.phone,
        postal_code: data.postalCode,
        city: data.city,
        country: data.country,
        question: data.question,
        answer: data.answer,
        fund_password: data.transactionPassword
      }
    })
  },

  getCertificatePurchasedList({ page } = {}) {
    return http.request({
      url: '/user/certificateList',
      method: 'GET',
      params: {
        page: page ?? 1
      }
    })
  },

  claimReward(data) {
    return http.request({
      url: '/gift/receive',
      method: 'POST',
      data: {
        receiver_name: data.receiverName,
        phone: data.phone,
        address: data.streetAddress,
        postal_code: data.postalCode,
        city: data.city,
        country: data.countryCode
      }
    })
  },

  claimGift(data) {
    return http.request({
      url: '/gift/agentReceive',
      method: 'POST',
      data: {
        receiver_name: data.receiverName,
        phone: data.phone,
        address: data.streetAddress,
        postal_code: data.postalCode,
        city: data.city,
        country: data.countryCode
      }
    })
  },

  getRewardList({ page } = {}) {
    return http.request({
      url: '/gift/list',
      method: 'GET',
      params: {
        page: page ?? 1
      }
    })
  },

  certificateResidue() {
    return http.request({
      url: '/user/certificateResidue',
      method: 'GET'
    })
  }
}
