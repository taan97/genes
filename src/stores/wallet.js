import WalletService from '@/services/wallet-service.js'
import { getLocale } from '@/locales/helpers'
import { isEmpty } from '@/utils/shared-methods'

export const wallet = {
  id: 'wallet',

  state: () => ({
    wallet: {},
    actType: [],
    balanceType: { balance: '', bond: '', ticket: '', usd: '' },
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
        const res = await WalletService.getDetailsWallet()
        const { act_type, balance_type } = res.data.extra
        this.associatedActTypeLocale = getLocale()

        this.actType = act_type.map((a) => ({
          label: a.label,
          value: a.key
        }))

        this.balanceType = {
          balance: balance_type.balance,
          usd: balance_type.usd,
          bond: balance_type.bond,
          ticket: balance_type.ticket
        }
      } catch {}
    },

    async setWallet({ replace = false } = {}) {
      if (!replace && !isEmpty(this.wallet)) return

      try {
        const { data } = await WalletService.getWallet()
        this.wallet = {
          average: data.average,
          equity: data.equity,
          usd: data.usd,
          balance: data.balance,
          bond: data.bond,
          ticket: data.ticket,
          ticket_usd: data.ticket_usd,
          dream: data.dream,
          returns: data.returns,
          area: data.area,
          deposit: data.deposit,
          withdraw: data.withdraw,
          investment: data.investment,
          income: data.income,
          total_returns: data.total_returns,
          trc_address: data.trc_address,
          fee_rate: data.fee_rate,
          min: data.min,
          gcr_rate: data.gcr_rate,
          grc_min: data.grc_min,
          level: data.level,
          bond_usd: data.bond_usd,
          static_reward: data.static_reward,
          pending: data.pending,
          pending_usd: data.pending_usd,
          created_at: data.created_at
        }
      } catch {}
    }
  }
}
