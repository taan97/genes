import { http } from './base-service'

export default {
  getWallet() {
    return http.request({
      url: '/wallet',
      method: 'GET'
    })
  },

  getDetailsWallet(param = {}) {
    return http.request({
      url: '/wallet/details',
      method: 'GET',
      params: {
        balance_type: param.balance_type,
        start_time: param.start_time,
        end_time: param.end_time,
        page: param.page,
        act_type: param.status
      }
    })
  },

  getChainWithdraw(param = {}) {
    return http.request({
      url: '/wallet/chainWithdraw',
      method: 'GET',
      params: {
        status: param.status,
        page: param.page
      }
    })
  },

  getConvertList(param = {}) {
    return http.request({
      url: '/wallet/convertList',
      method: 'GET',
      params: {
        start_time: param.start_time,
        end_time: param.end_time,
        page: param.page
      }
    })
  },

  async usdtWithdraw(data = {}) {
    const res = await http.request({
      url: '/wallet/chainWithdraw',
      method: 'POST',
      data: {
        amount: data.amount,
        address: data.trcAddress,
        fund_password: data.password,
        question: data.question,
        answer: data.answer
      }
    })
    await http.updateWallet()
    return res
  },

  async cancelChainWithdraw(id) {
    return http.request({
      url: '/wallet/cancelChainWithdraw',
      method: 'POST',
      data: {
        id: id
      }
    })
  },

  getChainDeposit(param = {}) {
    return http.request({
      url: '/wallet/chainDeposit',
      method: 'GET',
      params: {
        page: param.page
      }
    })
  },

  async convert(amount) {
    const res = await http.request({
      url: '/wallet/convert',
      method: 'POST',
      data: {
        amount
      }
    })
    await http.updateWallet()
    return res
  }
}
