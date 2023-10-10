<template>
  <BaseHeader :title="helpDetails.title" />

  <div class="p-5">
    <video
      :src="helpDetails.videoUrl"
      class="w-full"
      controls
    >
      {{ $t('PageHelpCenter.NoVideosSupport') }}
    </video>
    <!-- eslint-disable vue/no-v-html -->
    <p
      class="text-size-2 px-5 mt-12"
      v-html="helpDetails.content"
    />
    <!--eslint-enable vue/no-v-html-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import UserCenterService from '@/services/user-center-service'

const route = useRoute()

const helpDetails = ref({
  title: '',
  content: '',
  videoUrl: ''
})

setHelpDetails()

async function setHelpDetails() {
  try {
    const { data } = await UserCenterService.getHelpDetail(route.params.id)

    helpDetails.value = {
      title: data.title,
      content: data.content,
      videoUrl: data.video
    }
  } catch {}
}
</script>
<style scoped></style>
