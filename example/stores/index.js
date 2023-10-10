import { defineStore } from 'pinia'
import { global } from './global'
import { user } from './user'
import { wallet } from './wallet'
import { otc } from './otc'

export const useGlobalStore = defineStore(global)
export const useUserStore = defineStore(user)
export const useWalletStore = defineStore(wallet)
export const useOtcStore = defineStore(otc)

const stores = [useGlobalStore, useUserStore, useWalletStore, useOtcStore]

export function resetAllStores() {
  stores.forEach((store) => {
    const initStore = store()
    initStore.$reset()
  })
}
