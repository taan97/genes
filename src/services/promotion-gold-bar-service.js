import { http } from './base-service'

export default {
  getList({ page = 1 } = {}) {
    return http.request({
      url: '/pledge/list',
      method: 'GET',
      params: {
        page
      }
    })
  },

  canPledge(amount) {
    return http.request(
      {
        url: '/pledge/canPledge',
        method: 'POST',
        data: {
          amount
        }
      },
      { silent: true }
    )
  },

  async pledge(data) {
    const res = await http.request({
      url: '/pledge/pledge',
      method: 'POST',
      data: {
        amount: data.quantity,
        receiver_name: data.receiverName,
        phone: data.phone,
        address: data.streetAddress,
        postal_code: data.postalCode,
        city: data.city,
        country: data.countryCode
      }
    })

    await http.updateWallet()
    return res
  },

  getCancelFee(id) {
    return http.request(
      {
        url: '/pledge/cancelFee',
        method: 'POST',
        data: {
          order_id: id
        }
      },
      { silent: true }
    )
  },

  async cancel(id) {
    const res = await http.request({
      url: '/pledge/cancel',
      method: 'POST',
      data: {
        order_id: id
      }
    })

    await http.updateWallet()
    return res
  }
}
