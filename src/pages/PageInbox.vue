<template>
  <BaseHeader
    :title="$t('PageInbox.Title')"
    class="!bg-black-2 text-white-1 !bg-none !p-[unset] !pt-4 !px-3"
  >
    <template #sub-header>
      <BaseTab
        teleport-content="tab-content-container"
        @changed="doChangedTab"
      >
        <BaseTabItem
          :title="$t('PageInbox.Notifications')"
          value="notification"
          :title-class="globalStore.notificationCount ? 'unread-dot' : ''"
        >
          <div class="flex-1 grid gap-2">
            <InfinityList
              ref="notificationRef"
              container-class="grid gap-4"
              @more-requested="doMoreRequestedNotification"
            >
              <template #item="{ item }">
                <div
                  class="relative text-white-1 bg-black-opacity-1 p-4 grid gap-2"
                >
                  <h3 class="font-bold">{{ item.title }}</h3>
                  <p class="text-size-2 text-orange-1">
                    {{ $formatDateTime(item.created_at) }}
                  </p>
                  <p class="text-size-2">{{ item.content }}</p>

                  <span
                    v-if="item.status === INBOX_STATUS.UNREAD"
                    class="absolute right-3 top-6 w-2 h-2 bg-red-2 rounded-full"
                  />
                </div>
              </template>

              <template #empty>
                <div
                  class="flex-1 flex flex-col gap-4 items-center justify-center h-[calc(100vh-130px)]"
                >
                  <BaseIcon name="no-notifications" />
                  <p>{{ $t('PageInbox.NoNotificationsFound') }}</p>
                </div>
              </template>
            </InfinityList>
          </div>
        </BaseTabItem>

        <BaseTabItem
          :title="$t('PageInbox.Messages')"
          value="message"
          :title-class="globalStore.messageCount ? 'unread-dot' : ''"
        >
          <div class="flex-1 grid gap-2">
            <InfinityList
              ref="messageRef"
              container-class="grid gap-4"
              @more-requested="doMoreRequestedMessage"
            >
              <template #item="{ item }">
                <div class="text-white-1 bg-black-opacity-1 p-4 grid gap-2">
                  <div class="flex justify-between items-center gap-3">
                    <span
                      v-if="item.status === INBOX_STATUS.UNREAD"
                      class="w-2 h-2 bg-red-2 rounded-full"
                    />

                    <h3 class="font-bold flex-1">{{ item.title }}</h3>

                    <span class="text-orange-1 text-size-2">
                      {{ $formatTime(item.created_at) }}
                    </span>
                  </div>

                  <p class="text-size-2 text-orange-1">
                    {{ $formatDate(item.created_at) }}
                  </p>

                  <p class="text-size-2">{{ item.content }}</p>
                </div>
              </template>

              <template #empty>
                <div
                  class="flex-1 flex flex-col gap-4 items-center justify-center h-[calc(100vh-130px)]"
                >
                  <BaseIcon name="no-message" />
                  <p>{{ $t('PageInbox.NoMessagesFound') }}</p>
                </div>
              </template>
            </InfinityList>
          </div>
        </BaseTabItem>
      </BaseTab>
    </template>
  </BaseHeader>

  <div
    id="tab-content-container"
    class="flex-1"
  />
</template>

<script setup>
import { ref } from 'vue'

import UserService from '@/services/user-service'
import { INBOX_TYPE, INBOX_STATUS } from '@/utils/const'
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
globalStore.setInboxCount()

const notificationRef = ref(null)
const messageRef = ref(null)

function doChangedTab(tab) {
  const map = {
    notification: notificationRef,
    message: messageRef
  }

  map[tab].value.onRefresh()
  globalStore.setInboxCount({ replace: true })
}

async function doMoreRequestedNotification(nextPage, finish) {
  try {
    const res = await UserService.getMessages({
      type: INBOX_TYPE.NOTIFICATION,
      page: nextPage
    })

    const list = res.data.items.map((item) => ({
      title: item.title,
      content: item.content,
      created_at: item.created_at,
      status: item.status
    }))

    finish(list, res.data.total)
  } catch {}
}

async function doMoreRequestedMessage(nextPage, finish) {
  try {
    const res = await UserService.getMessages({
      type: INBOX_TYPE.MESSAGE,
      page: nextPage
    })

    const list = res.data.items.map((item) => ({
      title: item.title,
      content: item.content,
      created_at: item.created_at,
      status: item.status
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped>
:deep(.unread-dot > *:first-child) {
  position: relative;
}
:deep(.unread-dot > *:first-child:after) {
  content: '';
  position: absolute;
  top: 0;
  right: -1rem;

  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--root-red-2);
}
</style>
