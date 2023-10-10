import {
  setItemToStorage,
  removeItemFromStorage
} from '@/utils/storage-adapter'
import { STORAGE_KEY } from '@/utils/const'
import { resetAllStores, useGlobalStore } from './index'
import router from '@/router'
import AuthService from '@/services/auth-service'

export const user = {
  id: 'user',

  state: () => ({
    email: '',
    country: '',
    created_at: '',
    experience: 0,
    forwardValidator: false,
    id: 0,
    is_fixed_level: 0,
    is_two_factor: false,
    last_at: null,
    level: 0,
    username: '',
    parent_id: 0,
    phone: '',
    referral: '',
    reward: 0,
    son_count: 0,
    valid_layer: 0,
    verified: null
  }),

  getters: {},

  actions: {
    async setUser({ replace } = { replace: false }) {
      if (!replace && this.id) return

      try {
        const { data: user } = await AuthService.getUser()

        this.email = user.account
        this.country = user.country
        this.created_at = user.created_at
        this.experience = user.experience
        this.forwardValidator = user.forwardValidator
        this.id = user.id
        this.is_fixed_level = user.is_fixed_level
        this.is_two_factor = user.is_two_factor
        this.last_at = user.last_at
        this.level = user.level
        this.username = user.nickname
        this.parent_id = user.parent_id
        this.phone = user.phone
        this.referral = user.referral
        this.reward = user.reward
        this.son_count = user.son_count
        this.valid_layer = user.valid_layer
        this.verified = user.verified
      } catch {}
    },

    handleSignIn(token) {
      setItemToStorage(STORAGE_KEY.TOKEN, token)
      router.push({ name: 'PageHome' })

      const globalStore = useGlobalStore()
      globalStore.setAnnouncementModalVisibility(true)
    },

    handleSignOut() {
      resetAllStores()
      removeItemFromStorage(STORAGE_KEY.TOKEN)
      // TODO: clean up localStorage
      router.push({ name: 'PageSignIn' })
    }
  }
}
