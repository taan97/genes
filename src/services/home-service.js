import { http } from './base-service'

export default {
  getHome() {
    return http.request({
      url: '/banner',
      method: 'GET'
    })
  },

  getInvestmentInfo() {
    return http.request({
      url: '/kline',
      method: 'GET'
    })
  }
}
