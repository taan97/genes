<template>
  <BaseHeader :title="$t('PageMore.DownloadDocuments')" />

  <InfinityList
    class="p-5"
    @more-requested="doMoreRequested"
  >
    <template #item="{ item }">
      <div>
        <DownloadDocumentItem
          :title="item.title"
          @previewed="() => doPreviewed(item.url)"
        />
        <a
          :href="item.url"
          download
          class="flex w-full mt-1.5 rounded-3xl p-2 border-gradient-1 shadow-outer-orange-dark-1 items-center"
        >
          <BaseIcon name="download-small" />
          <p class="flex-1 text-size-4 text-orange-1 text-center">
            {{ $t('PageDownloadDocuments.Download') }}
          </p>
        </a>
      </div>
    </template>
  </InfinityList>
</template>

<script setup>
import { useRouter } from 'vue-router'
import UserCenterService from '@/services/user-center-service.js'

const router = useRouter()

function doPreviewed(url) {
  const href = router.resolve({
    name: 'PagePdfViewer',
    query: { src: url, newTab: true }
  }).href

  window.open(href, '_blank')
}

async function doMoreRequested(nextPage, finish) {
  try {
    const res = await UserCenterService.getDocuments({
      page: nextPage
    })

    const list = res.data.items.map((item) => ({
      title: item.title,
      url: item.url
    }))

    finish(list, res.data.total)
  } catch {}
}
</script>

<style scoped>
:deep(.van-list) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
:deep(.van-list__finished-text) {
  grid-column: 1 / -1;
}
</style>
