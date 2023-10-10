<template>
  <BaseHeader class="border-solid border-b-[0.5px] border-grey-v-3">
    <!-- <template #right-action>
      <div class="flex gap-4">
        <BaseIcon
          name="share"
          @click="onClickShare(newsDetail.title, url)"
        />
      </div>
    </template> -->
  </BaseHeader>

  <div class="p-5 pt-0">
    <div class="mt-3 mx-4 mb-7">
      <h2 class="text-yellow-v-1 text-size-5 font-bold mb-4">
        {{ newsDetail.title }}
      </h2>
      <!-- <p class="text-size-2 font-semibold">
      {{ $t('PageHome.By') }} {{ newsDetail.author }}
    </p> -->
      <p class="text-size-1 text-grey-v-1 mt-1">
        {{ newsDetail.created_at }}
      </p>
    </div>

    <div class="border-solid border-b-[0.5px] border-grey-v-3 pb-4">
      <img
        :src="newsDetail.thumbnail"
        class="w-full"
      />
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="pt-2"
        v-html="newsDetail.content"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>

    <div class="pt-3.5">
      <h2 class="text-size-3 font-bold mb-5">
        {{ $t('PageNewsDetail.Recommended') }}
      </h2>

      <ul class="grid gap-7 mb-7">
        <CardNewsItem
          v-for="(item, index) in displayRecommendedNews"
          :id="item.id"
          :key="index"
          class="border-b-[0.5px] border-grey-v-3"
          :category="item.category?.()"
          :cover="item.cover"
          :title="item.title"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
// import { share as onClickShare } from '@/utils/shared-methods.js'
import { useRoute } from 'vue-router'
import NewsService from '@/services/news-service.js'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const route = useRoute()

const { t } = useI18n()

const newsDetail = ref({
  type: null,
  title: '',
  author: '',
  thumbnail: '',
  content: '',
  created_at: null
})

const listRecommendedNews = ref([])

const displayRecommendedNews = computed(() =>
  listRecommendedNews.value.filter((n) => Number(route.params.id) !== n.id)
)

setRecommendedNewsList()

watch(
  () => route.params.id,
  () => {
    setNewsDetail()
  },
  { immediate: true }
)

// const url = computed(() => window.location.href)

async function setNewsDetail() {
  try {
    const { data } = await NewsService.getNewsDetail(route.params.id)
    newsDetail.value = {
      type: data.type,
      title: data.title,
      author: data.author,
      thumbnail: data.thumbnail,
      content: data.content,
      created_at: dayjs(data.created_at).format('YYYY-MM-DD hh:mm:ss')
    }
  } catch {}
}

async function setRecommendedNewsList() {
  try {
    const { data } = await NewsService.getNews(route.params.id)
    listRecommendedNews.value = data.foryou.map((d) => ({
      id: d.id,
      category: () => t('PageHome.ForYou'),
      title: d.title,
      cover: d.thumbnail
    }))
  } catch {}
}
</script>

<style scoped></style>
