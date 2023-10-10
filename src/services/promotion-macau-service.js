import { http } from './base-service'

export default {
  getList({ page = 1 } = {}) {
    return http.request({
      url: '/macao/list',
      method: 'GET',
      params: {
        page
      }
    })
  },

  getHistoryList({ page = 1 } = {}) {
    return http.request({
      url: '/macao/logs',
      method: 'GET',
      params: {
        page
      }
    })
  },

  async create(amount) {
    const res = http.request({
      url: '/macao/transfer',
      method: 'POST',
      data: {
        amount
      }
    })

    await http.updateWallet()
    return res
  },

  async deposit(amount, order_no) {
    const res = http.request({
      url: '/macao/replenish',
      method: 'POST',
      data: {
        amount,
        order_no
      }
    })

    await http.updateWallet()
    return res
  },

  buy({ referralId, signature, order_no } = {}) {
    return http.request({
      url: '/macao/buy',
      method: 'POST',
      data: {
        uid: referralId,
        signature,
        order_no
      }
    })
  },

  claimReward(data) {
    return http.request({
      url: '/macao/receive',
      method: 'POST',
      data: {
        order_no: data.order_no,
        receiver_name: data.receiverName,
        phone: data.phone,
        address: data.streetAddress,
        postal_code: data.postalCode,
        city: data.city,
        country: data.countryCode
      }
    })
  }
}
