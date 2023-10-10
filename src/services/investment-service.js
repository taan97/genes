import { http } from './base-service'

export default {
  async purchaseUsdt({ amount, referralId, signature }) {
    const res = await http.request({
      url: '/invest/index',
      method: 'POST',
      data: {
        amount,
        uid: referralId,
        signature
      }
    })
    await http.updateWallet()
    return res
  },

  async purchaseConvertible(amount) {
    const res = await http.request({
      url: '/invest/reinvest',
      method: 'POST',
      data: {
        amount
      }
    })
    await http.updateWallet()
    return res
  },

  getListInvest(params = {}) {
    return http.request({
      url: '/invest/list',
      method: 'GET',
      params: {
        page: params.page ?? 1,
        type: params.type,
        act_type: params.status
      }
    })
  },

  async refund(data = {}) {
    const res = await http.request({
      url: '/invest/redeem',
      method: 'POST',
      data: {
        order_no: data.order_no,
        amount: data.amount,
        address: data.address,
        phone: data.phone,
        email: data.email,
        reason: data.reason,
        fund_password: data.password,
        question: data.question,
        answer: data.answer
      }
    })
    await http.updateWallet()
    return res
  },

  getRefundList(params = {}) {
    return http.request({
      url: '/invest/redeemList',
      method: 'GET',
      params: {
        page: params.page,
        status: params.status
      }
    })
  },

  getRedeemEstimation(params = {}) {
    return http.request({
      url: '/invest/redeemCal',
      method: 'GET',
      params: {
        amount: params.amount,
        order_no: params.order_no
      }
    })
  },

  getInvestCheck(params = {}) {
    return http.request({
      url: '/invest/check',
      method: 'GET',
      params: {
        amount: params.amount,
        uid: params.uid
      }
    })
  }
}
