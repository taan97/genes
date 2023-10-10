<template>
  <BaseHeader />

  <div class="text-center p-5">
    <BaseIcon
      name="download-big"
      class="left-0 right-0 mx-auto"
    />

    <p class="text-size-4 pt-6 pb-8">
      {{ $t('PageOverview.DownloadDocuments') }}
    </p>

    <InfinityList
      container-class="flex flex-col gap-4"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <DownloadDocumentItem
          :file-url="item.url"
          :file-title="item.title"
          @previewed="() => doPreviewed(item.url)"
        />
      </template>
    </InfinityList>
  </div>
</template>

<script setup>
import UserCenterService from '@/services/user-center-service'
import { useRouter } from 'vue-router'

const router = useRouter()

function doPreviewed(url) {
  const href = router.resolve({
    name: 'PagePdfViewer',
    query: { src: url, blank: true }
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

<style scoped></style>
