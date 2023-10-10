<template>
  <div class="relative">
    <div class="flex flex-row absolute z-10 w-full top-10 px-5">
      <p class="text-size-8 font-bold">NORDLYS</p>
      <button
        class="ml-auto self-center"
        @click="globalStore.setAnnouncementModalVisibility(true)"
      >
        <van-badge :content="globalStore.badgeNumber">
          <BaseIcon
            name="announcement-small"
            class="fill-white-v-1"
          />
        </van-badge>
      </button>
    </div>

    <CardNewsHeadline
      v-if="firstMarketsItem.id"
      :id="firstMarketsItem.id"
      :cover="firstMarketsItem.thumbnail"
      :category="categoryType[firstMarketsItem.type].label"
      :title="firstMarketsItem.title"
      title-class="text-size-5"
      :created-time="firstMarketsItem.created_at"
    >
      <template #summary>
        <ul class="list-[square] mt-3 mb-6 pl-5"></ul>
      </template>
    </CardNewsHeadline>
  </div>

  <ul class="mx-5 grid gap-7 my-7">
    <CardNewsItem
      v-for="(item, index) in newsList.markets"
      :id="item.id"
      :key="index"
      class="border-b-[0.5px] border-grey-v-3"
      :cover="item.thumbnail"
      :category="categoryType[item.type].label"
      :title="item.title"
      :created-time="item.created_at"
      :border="'bottom'"
    ></CardNewsItem>
  </ul>

  <CardNewsHeadline
    v-if="firstStockItem.id"
    :id="firstStockItem.id"
    :cover="firstStockItem.thumbnail"
    :big-category="$t('PageHome.Stock')"
    :category="categoryType[firstStockItem.type].label"
    :title="firstStockItem.title"
    :created-time="firstStockItem.created_at"
  >
  </CardNewsHeadline>

  <ul class="mx-5 grid gap-7 my-7">
    <CardNewsItem
      v-for="(item, index) in newsList.stock"
      :id="item.id"
      :key="index"
      class="border-b-[0.5px] border-grey-v-3"
      :cover="item.thumbnail"
      :category="categoryType[item.type].label"
      :title="item.title"
      :created-time="item.created_at"
      :border="'bottom'"
    ></CardNewsItem>
  </ul>

  <CardNewsHeadline
    v-if="firstCryptoItem.id"
    :id="firstCryptoItem.id"
    :cover="firstCryptoItem.thumbnail"
    :big-category="$t('PageHome.Crypto')"
    :category="categoryType[firstCryptoItem.type].label"
    :title="firstCryptoItem.title"
    :created-time="firstCryptoItem.created_at"
  >
  </CardNewsHeadline>

  <ul class="mx-5 grid gap-7 my-7">
    <CardNewsItem
      v-for="(item, index) in newsList.crypto"
      :id="item.id"
      :key="index"
      class="border-b-[0.5px] border-grey-v-3"
      :cover="item.thumbnail"
      :category="categoryType[item.type].label"
      :title="item.title"
      :created-time="item.created_at"
      :border="'bottom'"
    ></CardNewsItem>
  </ul>

  <CardNewsHeadline
    v-if="firstNewsItem.id"
    :id="firstNewsItem.id"
    :cover="firstNewsItem.thumbnail"
    :big-category="$t('PageHome.TopNews')"
    :category="categoryType[firstNewsItem.type].label"
    :title="firstNewsItem.title"
    :created-time="firstNewsItem.created_at"
  >
  </CardNewsHeadline>

  <ul class="mx-5 grid gap-7 my-7">
    <CardNewsItem
      v-for="(item, index) in newsList.news"
      :id="item.id"
      :key="index"
      class="border-b-[0.5px] border-grey-v-3"
      :cover="item.thumbnail"
      :category="categoryType[item.type].label"
      :title="item.title"
      :created-time="item.created_at"
      :border="'bottom'"
    ></CardNewsItem>
  </ul>

  <SuggestionTag
    class=""
    :content="$t('PageHome.SuggestionTag')"
    content-class="text-size-2"
  ></SuggestionTag>

  <div class="mx-5">
    <div class="flex flex-row mb-6">
      <h2 class="text-size-8 text-yellow-v-1 font-bold">
        {{ $t('PageHome.Recommended') }}
      </h2>
    </div>

    <p class="text-size-3 font-semibold mr-16">
      {{ $t('PageHome.RecommendTitle') }}
    </p>

    <ul class="grid gap-7 my-7">
      <CardNewsItem
        v-for="(item, index) in newsList.foryou"
        :id="item.id"
        :key="index"
        :cover="item.thumbnail"
        :title="item.title"
        :has-footer="false"
        :is-reversed="true"
      ></CardNewsItem>
    </ul>
  </div>

  <TheAnnouncementModal />
</template>

<script setup>
import CardNewsItem from '../components/feature/CardNewsItem.vue'
import SuggestionTag from '../components/feature/SuggestionTag.vue'
import BaseIcon from '../components/shared/BaseIcon.vue'
import NewsService from '@/services/news-service.js'
import { computed, ref } from 'vue'
import { NEWS_CATEGORY, REWARD_STATUS } from '@/utils/const.js'
import { useI18n } from 'vue-i18n'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores'

const userStore = useUserStore()

const router = useRouter()

const globalStore = useGlobalStore()
globalStore.setAnnouncement()

const { t } = useI18n()

var newsList = ref({
  crypto: [],
  foryou: [],
  markets: [],
  news: [],
  stock: []
})

const categoryType = ref({
  [NEWS_CATEGORY.MARKETS]: {
    label: computed(() => t('PageHome.Market')),
    value: NEWS_CATEGORY.MARKETS
  },
  [NEWS_CATEGORY.STOCK]: {
    label: computed(() => t('PageHome.Stock')),
    value: NEWS_CATEGORY.STOCK
  },
  [NEWS_CATEGORY.CRYPTO]: {
    label: computed(() => t('PageHome.Crypto')),
    value: NEWS_CATEGORY.CRYPTO
  },
  [NEWS_CATEGORY.NEWS]: {
    label: computed(() => t('PageHome.News')),
    value: NEWS_CATEGORY.NEWS
  },
  [NEWS_CATEGORY.FOR_YOU]: {
    label: computed(() => t('PageHome.Recommended')),
    value: NEWS_CATEGORY.FOR_YOU
  }
})

const firstMarketsItem = computed(() =>
  newsList.value.markets.length > 0
    ? newsList.value.markets[0]
    : {
        id: 0,
        author: '',
        content: '',
        created_at: '',
        locale: '',
        thumbnail: '',
        title: '',
        type: NEWS_CATEGORY.MARKETS,
        updated_at: ''
      }
)

const firstStockItem = computed(() =>
  newsList.value.stock.length > 0
    ? newsList.value.stock[0]
    : {
        id: 0,
        author: '',
        content: '',
        created_at: '',
        locale: '',
        thumbnail: '',
        title: '',
        type: NEWS_CATEGORY.STOCK,
        updated_at: ''
      }
)

const firstCryptoItem = computed(() =>
  newsList.value.crypto.length > 0
    ? newsList.value.crypto[0]
    : {
        id: 0,
        author: '',
        content: '',
        created_at: '',
        locale: '',
        thumbnail: '',
        title: '',
        type: NEWS_CATEGORY.CRYPTO,
        updated_at: ''
      }
)

const firstNewsItem = computed(() =>
  newsList.value.news.length > 0
    ? newsList.value.news[0]
    : {
        id: 0,
        author: '',
        content: '',
        created_at: '',
        locale: '',
        thumbnail: '',
        title: '',
        type: NEWS_CATEGORY.NEWS,
        updated_at: ''
      }
)

getNews()
showRewardModal()

function setNewsList(data) {
  newsList.value.crypto = data.crypto.map((d) => ({
    id: d.id,
    author: d.author,
    content: d.content,
    created_at: d.created_at,
    locale: d.locale,
    thumbnail: d.thumbnail,
    title: d.title,
    updated_at: d.updated_at,
    type: NEWS_CATEGORY.CRYPTO
  }))

  newsList.value.foryou = data.foryou.map((d) => ({
    id: d.id,
    author: d.author,
    content: d.content,
    created_at: d.created_at,
    locale: d.locale,
    thumbnail: d.thumbnail,
    title: d.title,
    updated_at: d.updated_at,
    type: NEWS_CATEGORY.FOR_YOU
  }))

  newsList.value.markets = data.markets.map((d) => ({
    id: d.id,
    author: d.author,
    content: d.content,
    created_at: d.created_at,
    locale: d.locale,
    thumbnail: d.thumbnail,
    title: d.title,
    updated_at: d.updated_at,
    type: NEWS_CATEGORY.MARKETS
  }))

  newsList.value.news = data.news.map((d) => ({
    id: d.id,
    author: d.author,
    content: d.content,
    created_at: d.created_at,
    locale: d.locale,
    thumbnail: d.thumbnail,
    title: d.title,
    updated_at: d.updated_at,
    type: NEWS_CATEGORY.NEWS
  }))

  newsList.value.stock = data.stock.map((d) => ({
    id: d.id,
    author: d.author,
    content: d.content,
    created_at: d.created_at,
    locale: d.locale,
    thumbnail: d.thumbnail,
    title: d.title,
    updated_at: d.updated_at,
    type: NEWS_CATEGORY.STOCK
  }))
}

async function getNews() {
  try {
    const { data } = await NewsService.getNews()
    setNewsList(data)
  } catch {}
}

async function showRewardModal() {
  if (userStore.reward === REWARD_STATUS.NO_REWARD) return

  const Modal = useConfirmModal()

  try {
    await Modal.open({
      title: t('PageRedeem.TitleModal'),
      message: t('PageRedeem.Content'),
      buttonText: t('Button.AcceptAward'),
      headerIcon: 'redeem-square',
      buttonClass: 'bg-gradient-red shadow-outer-red-v-1 '
    })

    router.push({ name: 'PageRedeemForm' })
  } catch {}
}
</script>

<style scoped></style>
