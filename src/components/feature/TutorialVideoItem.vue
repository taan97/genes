<template>
  <div class="pt-2 relative w-full my-2">
    <video-player
      class="video-player vjs-theme-forest rounded-3xl"
      :src="props.detail.video"
      :poster="props.detail.thumbnail"
      controls
      playsinline
      :height="200"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  detail: {
    type: Object,
    default: () => ({
      thumbnail: '',
      video: '',
      title: ''
    })
  }
})
</script>

<style scoped>
:deep(.video-js) {
  width: 100%;
}

:deep(.vjs-big-play-button) {
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}

:deep(.vjs-poster) {
  border-radius: 24px;
}
</style>
