import { defineStore } from 'pinia'
import { global } from './global'
import { user } from './user'
import { otc } from './otc'
import { wallet } from './wallet'

export const useGlobalStore = defineStore(global)
export const useUserStore = defineStore(user)
export const useOtcStore = defineStore(otc)
export const useWalletStore = defineStore(wallet)

const stores = [useGlobalStore, useUserStore, useOtcStore, useWalletStore]

export function resetAllStores() {
  stores.forEach((store) => {
    const initStore = store()
    initStore.$reset()
  })
}
