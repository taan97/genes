import {
  setItemToStorage,
  clearAppStorage,
  STORAGE_KEY
} from '@/utils/storage-adapter'
import { resetAllStores } from './index'
import router from '@/router'
import AuthService from '@/services/auth-service'

export const user = {
  id: 'user',

  state: () => ({
    account: '',
    agent_gift: 0,
    alert: 0,
    avatar: '',
    child: 0,
    country: '',
    created_at: '',
    email: '',
    first_name: '',
    gcr_bond: '',
    gcr_rate: '',
    id: null,
    is_fixed_level: 0,
    last_at: null,
    last_name: '',
    level: null,
    level_desc: '',
    lock: null,
    nickname: '',
    parent_id: 0,
    phone: '',
    real_name: '',
    receive_gift: 0,
    referral: '',
    verified: null,
    id_number: ''
  }),

  getters: {
    userAvatar() {
      return (
        this.avatar ||
        new URL('../assets/images/profile-default.png', import.meta.url).href
      )
    }
  },

  actions: {
    async setUser({ replace = false } = {}) {
      if (!replace && this.id) return

      try {
        const { data: user } = await AuthService.getUser()

        this.account = user.account
        this.agent_gift = user.agent_gift
        this.alert = user.alert
        this.avatar = user.avatar
        this.child = user.child
        this.country = user.country
        this.created_at = user.created_at
        this.email = user.email
        this.first_name = user.first_name
        this.gcr_bond = user.gcr_bond
        this.gcr_rate = user.gcr_rate
        this.id = user.id
        this.is_fixed_level = user.is_fixed_level
        this.last_at = user.last_at
        this.last_name = user.last_name
        this.level = user.level
        this.level_desc = user.level_desc
        this.lock = user.lock
        this.nickname = user.nickname
        this.parent_id = user.parent_id
        this.phone = user.phone
        this.real_name = user.real_name
        this.receive_gift = user.receive_gift
        this.referral = user.referral
        this.verified = user.verified
        this.id_number = user.id_number
      } catch {}
    },

    handleSignIn(token) {
      setItemToStorage(STORAGE_KEY.TOKEN, token)
      router.push({ name: 'PageHome' })
    },

    handleSignOut() {
      resetAllStores()
      clearAppStorage()
      router.push({ name: 'PageSignIn' })
    }
  }
}
