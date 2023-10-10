import GlobalService from '@/services/global-service'

export const global = {
  id: 'global',

  state: () => ({
    isLoadingVisible: false,
    isAnnouncementModalVisible: false,
    contents: []
  }),

  getters: {
    badgeNumber() {
      return this.contents.length
    }
  },

  actions: {
    setLoadingVisibility(payload) {
      this.isLoadingVisible = payload
    },

    async setAnnouncementModalVisibility(payload) {
      if (payload) {
        await this.setAnnouncement()

        if (!this.badgeNumber) return
      }
      this.isAnnouncementModalVisible = payload
    },

    async setAnnouncement() {
      try {
        const res = await GlobalService.getAnnouncement()

        if (!res.data.length) return

        this.contents = res.data.map((d) => ({
          title: d.title,
          content: d.content,
          id: d.id
        }))
      } catch {}
    }
  }
}
