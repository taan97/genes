import http from './base-service'

export default {
  getBuyList({ currency, page }) {
    return http.request({
      url: '/api/otc/index',
      method: 'GET',
      params: {
        currency,
        page
      }
    })
  },

  getCurrencies() {
    return http.request({
      url: '/api/otc/currencies',
      method: 'GET'
    })
  },

  placeOrder(orderNumber, quantity) {
    return http.request({
      url: '/api/otc/createTrade',
      method: 'POST',
      data: {
        order_number: orderNumber,
        number: quantity
      }
    })
  },

  getOrders({ status, page }) {
    return http.request({
      url: '/api/otc/trades',
      method: 'GET',
      params: {
        status,
        page
      }
    })
  },

  getOrderDetail(tradeNumber) {
    return http.request({
      url: '/api/otc/tradeInfo',
      method: 'GET',
      params: {
        trade_number: tradeNumber
      }
    })
  },

  submitPayment(order) {
    return http.request({
      url: '/api/otc/voucher',
      method: 'POST',
      data: {
        trade_number: order.tradeNumber,
        payment_name: order.payerName,
        payment_bank: order.bankName,
        payment_account: order.bankCardNumber,
        payment_voucher: order.proof
      }
    })
  },

  cancelOrder(tradeNumber) {
    return http.request({
      url: '/api/otc/cancelTrade',
      method: 'POST',
      data: {
        trade_number: tradeNumber
      }
    })
  },

  appealOrder(order) {
    return http.request({
      url: '/api/otc/appeal',
      method: 'POST',
      data: {
        trade_number: order.tradeNumber,
        appeal_reason: order.reason,
        appeal_voucher: order.proof
      }
    })
  }
}
