import http from './base-service'

export default {
  getGoogleAuthentication() {
    return http.request({
      url: '/api/google2fa',
      method: 'GET'
    })
  },

  bind2Factor(body) {
    return http.request({
      url: '/api/bindgoogle2fa',
      method: 'POST',
      data: body
    })
  },

  getHelpList() {
    return http.request({
      url: '/api/user/helpCenter',
      method: 'GET'
    })
  },

  getHelpDetail(id) {
    return http.request({
      url: `/api/user/helpCenter/${id}`,
      method: 'GET'
    })
  },

  verifyIdentity(data) {
    return http.request({
      url: '/api/user/verifiedSubmit',
      method: 'POST',
      data: data
    })
  },

  getVerificationStatus() {
    return http.request({
      url: '/api/user/verified',
      method: 'GET'
    })
  },

  getMemberList(param = {}) {
    return http.request({
      url: '/api/team/list',
      method: 'GET',
      params: {
        page: param.page ?? 1,
        id: param.id
      }
    })
  },

  getWithdrawalList({ pageNumber, startDate, endDate } = {}) {
    return http.request({
      url: '/api/team/withdrawalList',
      method: 'GET',
      params: {
        page: pageNumber ?? 1,
        start_time: startDate,
        end_time: endDate
      }
    })
  },

  getRechargeList({ pageNumber, startDate, endDate } = {}) {
    return http.request({
      url: '/api/team/rechargeList',
      method: 'GET',
      params: {
        page: pageNumber ?? 1,
        start_time: startDate,
        end_time: endDate
      }
    })
  },

  getUserManagementRankInfo() {
    return http.request({
      url: '/api/user/level',
      method: 'GET'
    })
  },

  getDocuments({ pageNumber } = {}) {
    return http.request({
      url: '/api/user/documents',
      method: 'GET',
      params: {
        page: pageNumber ?? 1
      }
    })
  },

  getBillList() {
    return http.request({
      url: '/api/bill/list',
      method: 'GET'
    })
  },

  generateBillPdf({ id } = {}) {
    return http.request({
      url: '/api/bill/generatePdf',
      method: 'POST',
      data: {
        id
      }
    })
  },

  redeemReward(data) {
    return http.request({
      url: '/api/user/redeemReward',
      method: 'POST',
      data: data
    })
  },

  getRewardOption() {
    return http.request({
      url: '/api/user/rewardOption',
      method: 'GET'
    })
  },

  getRewardList() {
    return http.request({
      url: '/api/user/rewardList',
      method: 'GET'
    })
  },

  getSubordinateRankingList(data) {
    return http.request({
      url: '/api/team/userLevelRecord',
      method: 'GET',
      params: {
        start_time: data.startDate,
        end_time: data.endDate,
        page: data.pageNumber,
        type: data.type
      }
    })
  }
}
