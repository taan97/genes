import OtcService from '@/services/otc-service'
import { CURRENCY_TYPE } from '@/utils/const.js'

export const otc = {
  id: 'otc',

  state: () => ({
    order: {
      createdAt: '',
      merchant_name: '',
      updatedAt: '',
      totalPrice: '',
      price: '',
      number: '',
      tradeNumber: '',
      paymentName: '',
      paymentAccount: '',
      payment_bank: '',
      merchantName: '',
      bankRealName: '',
      bankAccount: '',
      bankName: '',
      cancelTime: '',
      appealTime: ''
    },

    currency: CURRENCY_TYPE.CNY
  }),

  getters: {},

  actions: {
    async setOrderDetail(id) {
      try {
        const { data } = await OtcService.getOrderDetail(id)

        this.order.createdAt = data.created_at
        this.order.merchant_name = data.merchant_name
        this.order.updatedAt = data.updated_at
        this.order.totalPrice = data.total_price
        this.order.price = data.price
        this.order.number = data.number
        this.order.tradeNumber = data.trade_number
        this.order.paymentName = data.payment_name
        this.order.paymentAccount = data.payment_account
        this.order.payment_bank = data.payment_bank
        this.order.merchantName = data.merchant_name
        this.order.bankRealName = data.bank_real_name
        this.order.bankAccount = data.bank_account
        this.order.bankName = data.bank_name
        this.order.cancelTime = data.cancel_time
        this.order.appealTime = data.appeal_time
      } catch {}
    }
  }
}
