import { http } from './base-service'

export default {
  getRate(currency = 'VND') {
    return http.request({
      url: '/fiat/getRate',
      method: 'GET',
      params: {
        currency
      }
    })
  },

  getCurrency() {
    return http.request({
      url: '/fiat/getCurrency',
      method: 'GET'
    })
  },

  createRechargeOrder({ currency, amount } = {}) {
    return http.request({
      url: '/fiat/fiatDeposit',
      method: 'POST',
      data: {
        currency: currency,
        amount: amount
      }
    })
  },

  cancelDepositOrder(id) {
    return http.request({
      url: '/fiat/cancelFiatDeposit',
      method: 'POST',
      data: {
        order_id: id
      }
    })
  },

  uploadRechargeCertificate(data) {
    return http.request({
      url: '/fiat/uploadFiatDeposit',
      method: 'POST',
      data: {
        order_id: data.orderId,
        pay_bank: data.bankAccountName,
        pay_account: data.bankCardNumber,
        pay_name: data.payerName,
        pay_img: data.credentials
      }
    })
  },

  getDepositList({ currency = 'VND', page, status } = {}) {
    return http.request({
      url: '/fiat/fiatDepositList',
      method: 'GET',
      params: {
        page: page ?? 1,
        currency,
        status
      }
    })
  },

  getBanks() {
    return http.request({
      url: '/fiat/banks',
      method: 'GET'
    })
  },

  bindBankCard(data) {
    return http.request({
      url: '/fiat/bindFiatBank',
      method: 'POST',
      data: {
        fiat_bank_id: data.bankId,
        account: data.bankCardNumber,
        name: data.bankAccountName,
        fund_password: data.transactionPassword,
        question: data.questionId,
        answer: data.answer
      }
    })
  },

  getUserBank() {
    return http.request({
      url: '/fiat/userWithdrawBank',
      method: 'GET'
    })
  },

  async createWithdrawalOrder(data) {
    const res = await http.request({
      url: '/fiat/fiatWithdraw',
      method: 'POST',
      data: {
        usdt: data.amount,
        currency: data.currency || 'vnd',
        fund_password: data.password,
        question: data.question,
        answer: data.answer
      }
    })
    await http.updateWallet()
    return res
  },

  getWithdrawalList({ currency = 'VND', page, status } = {}) {
    return http.request({
      url: '/fiat/fiatWithdrawList',
      method: 'GET',
      params: {
        page: page ?? 1,
        currency,
        status
      }
    })
  },

  async cancelWithdrawalOrder(id) {
    const res = await http.request({
      url: '/fiat/cancelFiatWithdraw',
      method: 'POST',
      data: {
        order_id: id
      }
    })
    await http.updateWallet()
    return res
  }
}
