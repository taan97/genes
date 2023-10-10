import http from './base-service'

export default {
  getWalletOverview() {
    return http.request({
      url: '/api/wallet'
    })
  },

  getListWithdrawalRecord({ pageNumber, status } = {}) {
    return http.request({
      url: '/api/wallet/chainWithdraw',
      method: 'GET',
      params: {
        page: pageNumber ?? 1,
        status
      }
    })
  },

  getChainRecharge({ pageNumber } = {}) {
    return http.request({
      url: '/api/wallet/chainRecharge',
      method: 'GET',
      params: {
        page: pageNumber ?? 1
      }
    })
  },

  getWalletDetail(params = {}) {
    return http.request({
      url: '/api/wallet/details',
      method: 'GET',
      params: {
        act_type: params.act_type,
        balance_type: params.balance_type,
        start_time: params.start_time,
        end_time: params.end_time,
        page: params.page
      }
    })
  },

  chainWithdraw(body) {
    return http.request({
      url: '/api/wallet/chainWithdraw',
      method: 'POST',
      data: {
        amount: body.withdrawAmount,
        address: body.trcAddress,
        otp_code: body.googleVerificationCode
      }
    })
  },

  cancelWithdrawalRecord(id) {
    return http.request({
      url: '/api/wallet/cancelChainWithdraw',
      method: 'POST',
      data: {
        id
      }
    })
  }
}
