import UserService from '@/services/user-service'
import {
  setItemToStorage,
  getItemFromStorage,
  removeItemFromStorage,
  STORAGE_KEY
} from '@/utils/storage-adapter'
import isEqual from 'lodash/isEqual'
import { useUserStore } from '.'

export const global = {
  id: 'global',

  state: () => ({
    isLoadingVisible: false,
    notificationCount: null,
    messageCount: null,
    macauCount: null,
    isAnnouncementModalVisible: false,
    isNotificationModalVisible: false,
    isClaimRewardModalVisible: false,
    isClaimGiftModalVisible: false,
    announcementContents: [],
    currentCustomerId: null
  }),

  getters: {
    inboxCount() {
      return this.notificationCount + this.messageCount
    }
  },

  actions: {
    async setClaimRewardModalVisibility(payload) {
      const userStore = useUserStore()
      if (payload && userStore.receive_gift === 0) return
      this.isClaimRewardModalVisible = payload
    },

    async setClaimGiftModalVisibility(payload) {
      const userStore = useUserStore()
      if (payload && userStore.agent_gift === 0) return
      this.isClaimGiftModalVisible = payload
    },

    async setNotificationModalVisibility(payload) {
      if (payload) {
        await this.setInboxCount({ replace: true })

        if (!this.inboxCount) return
      }
      this.isNotificationModalVisible = payload
    },

    async setInboxCount({ replace = false } = {}) {
      if (
        !replace &&
        this.notificationCount !== null &&
        this.macauCount !== null &&
        this.messageCount !== null
      )
        return

      try {
        const { data } = await UserService.countMessages()

        this.notificationCount = data.notification
        this.messageCount = data.message
        this.macauCount = data.macao
      } catch {}
    },

    async setAnnouncementModalVisibility(payload) {
      if (!payload) {
        this.isAnnouncementModalVisible = payload
        return
      }

      await this.setAnnouncement()

      if (!this.announcementContents.length) {
        removeItemFromStorage(STORAGE_KEY.ANNOUNCEMENT)
        return
      }

      if (
        !isEqual(
          getItemFromStorage(STORAGE_KEY.ANNOUNCEMENT),
          this.announcementContents
        )
      ) {
        setItemToStorage(STORAGE_KEY.ANNOUNCEMENT, this.announcementContents)
        this.isAnnouncementModalVisible = true
        return
      }
    },

    async setAnnouncement() {
      try {
        const res = await UserService.getAnnouncement()

        this.announcementContents = res.data.map((d) => ({
          title: d.title,
          content: d.content,
          id: d.id
        }))
      } catch {}
    }
  }
}
