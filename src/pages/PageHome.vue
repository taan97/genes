<template>
  <div class="relative pb-10">
    <div
      class="absolute w-[min(100vw,var(--root-max-width))] mx-auto top-0 left-0 z-10 bg-black-opacity-1 flex justify-between gap-5 px-4 py-2 items-center"
    >
      <div class="grid grid-cols-[auto_1fr] gap-x-2">
        <div class="col-span-full flex gap-4 items-center mb-3">
          <button
            type="button"
            class="col-span-full w-max mt-1"
            @click="onClickAnnouncement"
          >
            <van-badge :dot="globalStore.announcementContents.length > 0">
              <BaseIcon
                name="announcement-small"
                class="fill-white-1"
              />
            </van-badge>
          </button>

          <!-- <router-link
            :to="{ name: 'PageLivestream' }"
            class="rounded-full px-3 flex items-center gap-2 py-1 font-bold text-size-3 text-white-1"
            :class="livestreaming ? 'bg-green-3' : 'bg-grey-3'"
          >
            <van-badge :dot="livestreaming">
              <BaseIcon name="wifi" />
            </van-badge>
            {{ $t('PageHome.Livestream') }}
          </router-link> -->
          <AppPlanSelector />
        </div>

        <p class="text-size-4 text-white-1 col-span-full flex gap-2">
          {{ $t('PageHome.Welcome') }}
          <span class="text-size-4 text-orange-1 break-all">
            {{ userStore.real_name }}
          </span>
        </p>

        <p class="text-size-4 text-white-1">{{ $t('PageHome.AccountNo') }} :</p>
        <p class="text-size-4 text-orange-1 break-all">GR{{ userStore.id }}</p>

        <div class="col-span-full mt-4">
          <router-link
            :to="{ name: 'PageHomeGcrNav' }"
            class="border-gradient-1 rounded-full flex items-center relative gap-2 px-3 py-1"
          >
            <p class="text-size-4 text-orange-1 border border-black-1">
              {{
                getPlan() === PLAN_TYPE._A
                  ? $t('PageHome.GcrNav')
                  : $t('PageHome.GcrNavPlanB')
              }}:
            </p>
            <p class="flex-1 text-orange-1 whitespace-nowrap">
              $ {{ userStore.gcr_rate }}
            </p>
            <BaseIcon name="dropdown" />
          </router-link>
        </div>
      </div>
      <div>
        <ProfilePhoto
          class="!w-[66px] !h-[66px]"
          @click="$router.push({ name: 'PageProfile' })"
        />
        <p class="text-size-4 text-white-1 pt-2">{{ userStore.gcr_bond }}</p>
        <p class="text-size-4 text-orange-1">{{ $t('PageHome.GCRBond') }}</p>
      </div>
    </div>

    <van-swipe
      :show-indicators="false"
      :touchable="false"
    >
      <van-swipe-item
        v-for="(item, index) in topBannerImages"
        :key="index"
      >
        <img
          :src="item.image"
          alt=""
          class="mb-5 rounded-b-3xl mx-auto w-full h-[341px] object-cover object-center"
        />
      </van-swipe-item>
    </van-swipe>

    <van-swipe
      indicator-color="var(--root-white-1)"
      :autoplay="3000"
    >
      <van-swipe-item
        v-for="(item, index) in bottomBannerImages"
        :key="index"
      >
        <img
          :src="item.image"
          alt=""
          class="mb-8 rounded-3xl mx-auto w-[94%] h-auto object-cover object-center"
          :class="{ 'pointer-events-none': !item.url }"
          @click.stop="onClickItem(item.url)"
        />
      </van-swipe-item>
    </van-swipe>
  </div>

  <ImageViewer
    v-model:show="isPreviewer"
    :url="urlImage"
  />
  <TheNotificationModal />
  <TheAnnouncementModal />
</template>

<script setup>
import HomeService from '@/services/home-service.js'
import { ref } from 'vue'
import { useUserStore, useGlobalStore } from '@/stores'
import { removeItemFromStorage, STORAGE_KEY } from '@/utils/storage-adapter'
import UserService from '@/services/user-service.js'
import { useApiFetchInterval } from '@/utils/composables/use-api-fetch-interval'
import { useRouter } from 'vue-router'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

const userStore = useUserStore()
const globalStore = useGlobalStore()
const router = useRouter()

globalStore.setAnnouncementModalVisibility(true)
globalStore.setNotificationModalVisibility(true)

const topBannerImages = ref([])
const bottomBannerImages = ref([])
const isPreviewer = ref(false)
const urlImage = ref('')
const livestreaming = ref(false)

setHome()

const { startInterval } = useApiFetchInterval({
  callback: setLivestreamStatus,
  ms: 30000
})
startInterval()

async function setHome() {
  try {
    const { data } = await HomeService.getHome()
    topBannerImages.value = data.banner1
    bottomBannerImages.value = data.banner2
  } catch {}
}

function onClickItem(url) {
  if (!url || !String(url).trim()) return

  if (/.(png|jpg|jpeg|gif)$/g.test(url)) {
    urlImage.value = url
    isPreviewer.value = true
    return
  }

  const target = router.resolve(url)
  if (target.name) return router.push({ name: target.name })

  window.open(url, '_blank')
}

function onClickAnnouncement() {
  removeItemFromStorage(STORAGE_KEY.ANNOUNCEMENT)
  globalStore.setAnnouncementModalVisibility(true)
}

async function setLivestreamStatus() {
  try {
    const { data } = await UserService.getLivestreamStatus()

    livestreaming.value = Number(data.data.live) === 1
  } catch {}
}
</script>

<style scoped>
:deep(.van-swipe__indicator) {
  width: 8px;
  height: 8px;
  background-color: var(--root-black-1);
  opacity: 1;
}
.van-swipe-item {
  color: var(--root-black-1);
  height: auto;
}
:deep(.van-swipe__indicator--active) {
  width: 22px;
  border-radius: 9999px;
}
</style>
