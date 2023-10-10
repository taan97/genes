import WalletService from '@/services/wallet-service.js'
import { getLocale } from '@/locales/helpers'
export const wallet = {
  id: 'wallet',

  state: () => ({
    actType: [],
    balanceType: { balance: '', capital: '' },
    associatedActTypeLocale: ''
  }),

  getters: {
    convertBalanceType(state) {
      return Object.entries(state.balanceType).reduce((map, [key, value]) => {
        map[value] = key
        return map
      }, {})
    },

    actTypeMap(state) {
      return state.actType.reduce((map, { label, value }) => {
        map[value] = label
        return map
      }, {})
    }
  },

  actions: {
    async setActType() {
      if (
        this.associatedActTypeLocale === getLocale() &&
        this.actTypeMap.invest
      )
        return

      try {
        const res = await WalletService.getWalletDetail()
        const { act_type, balance_type } = res.data.extra
        this.associatedActTypeLocale = getLocale()

        this.actType = act_type.map((a) => ({
          label: a.label,
          value: a.key
        }))

        this.balanceType = {
          balance: balance_type.balance,
          capital: balance_type.capital
        }
      } catch {}
    }
  }
}
