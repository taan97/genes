import http from './base-service'
import { INVESTMENT_LOCK } from '@/utils/const.js'

export default {
  getInvestmentInfo() {
    return http.request({
      url: '/api/investment',
      method: 'GET'
    })
  },

  invest(amount) {
    return http.request({
      url: '/api/investment/invest',
      method: 'POST',
      data: {
        amount,
        lock: INVESTMENT_LOCK
      }
    })
  },

  redeem(amount) {
    return http.request({
      url: '/api/investment/redeem',
      method: 'POST',
      data: {
        amount,
        lock: INVESTMENT_LOCK
      }
    })
  },

  autoInvest(type, rate) {
    return http.request({
      url: '/api/investment/autoInvest',
      method: 'POST',
      data: {
        type,
        rate
      }
    })
  },

  getSubscribeInfo() {
    return http.request({
      url: '/api/investment/subscribe',
      method: 'GET'
    })
  },

  subscribe(amount) {
    return http.request({
      url: '/api/investment/subscribe',
      method: 'POST',
      data: {
        amount
      }
    })
  },

  investRecords(dateTime) {
    return http.request({
      url: '/api/investment/investRecords',
      method: 'GET',
      params: {
        datetime: dateTime
      }
    })
  },

  getSubscribeList(params = {}) {
    return http.request({
      url: '/api/investment/subscribeList',
      method: 'GET',
      params: {
        start_time: params.start_time,
        end_time: params.end_time,
        page: params.page
      }
    })
  },

  buyExperienceCode(amount) {
    return http.request({
      url: '/api/pin/buy',
      method: 'POST',
      data: {
        amount
      }
    })
  },

  useExperienceCode(code) {
    return http.request({
      url: '/api/pin/use',
      method: 'POST',
      data: {
        pin_code: code
      }
    })
  },

  getPinCodeOrderList(params = {}) {
    return http.request({
      url: '/api/pin/history',
      method: 'GET',
      params: {
        page: params.page ?? 1
      }
    })
  }
}
