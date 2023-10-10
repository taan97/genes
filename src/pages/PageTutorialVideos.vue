<template>
  <BaseHeader :title="$t('PageTutorialVideos.Title')" />

  <div class="p-5">
    <BaseFormInputText
      v-model="searchText"
      name="SearchTutorialVideo"
      :placeholder="$t('PageTutorialVideos.SearchTutorialVideo')"
    >
      <template #left-icon>
        <BaseIcon
          name="search"
          fill="var(--root-black-1)"
        />
      </template>
    </BaseFormInputText>

    <TutorialVideoItem
      v-for="item in matchingVideos"
      :key="item.id"
      :detail="item"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import UserService from '@/services/user-service'

const searchText = ref('')
const videosList = ref([])

const matchingVideos = computed(() =>
  videosList.value.filter((item) =>
    item.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

setHelpList()

async function setHelpList() {
  try {
    const res = await UserService.getHelpList()
    videosList.value = res.data.map((d) => ({
      id: d.id,
      title: d.title,
      thumbnail: d.thumbnail,
      video: d.video
    }))
  } catch {}
}
</script>

<style scoped></style>
