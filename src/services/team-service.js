import { http } from './base-service'

export default {
  getMyTeam() {
    return http.request({
      url: '/team/me',
      method: 'GET'
    })
  },

  getTeamList(uid) {
    return http.request({
      url: '/team/list',
      method: 'GET',
      params: { uid: uid }
    })
  },

  getPlacementTeam(uid) {
    return http.request({
      url: '/team/placement',
      method: 'GET',
      params: { uid: uid }
    })
  },

  rechargeList(param = {}) {
    return http.request({
      url: '/team/rechargeList',
      method: 'GET',
      params: {
        start_time: param.start_time,
        end_time: param.end_time,
        page: param.page
      }
    })
  },

  withdrawalList(param = {}) {
    return http.request({
      url: '/team/withdrawalList',
      method: 'GET',
      params: {
        start_time: param.start_time,
        end_time: param.end_time,
        page: param.page
      }
    })
  }
}
