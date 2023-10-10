<template>
  <BaseHeader
    class="bg-black-2 text-white-1"
    :back-option="{ name: 'PageHome' }"
  />

  <div id="livestreamContainer" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { ISO_LANGUAGE_MAP } from '@/locales/languages'
import { useEventListener } from '@/utils/composables/use-event-listener'

const route = useRoute()
const userStore = useUserStore()
const { locale } = useI18n()
const iFrameHeight = ref(window.innerHeight)

const BELIVE_SCRIPT_ID = 'belive-embed-script'
const BELIVE_EMBED_LINK = 'https://beliveiframe.belive.sg/v2.0.0/belive.min.js'
const BELIVE_IFRAME_URL = import.meta.env.PROD
  ? 'https://sklive-web.belive.sg/'
  : 'https://sklive-stg-web.belive.sg/'

useEventListener('resize', setIFrameHeight, { immediate: true })

onMounted(() => {
  setupLivestream()
})

onUnmounted(() => {
  document.head.querySelector(`#${BELIVE_SCRIPT_ID}`)?.remove()
})

function setIFrameHeight() {
  const headerHeight = document
    .querySelector('header')
    .getBoundingClientRect().height
  iFrameHeight.value = window.innerHeight - headerHeight + 'px'
}

function setupLivestream() {
  const scriptTag = document.createElement('script')
  scriptTag.setAttribute('id', BELIVE_SCRIPT_ID)
  scriptTag.setAttribute('src', BELIVE_EMBED_LINK)
  scriptTag.addEventListener('load', () => {
    createFrame()
  })
  document.head.append(scriptTag)
}

function createFrame() {
  const src = route.params.id ? window.location.href : BELIVE_IFRAME_URL

  window.belive.createIframe({
    width: 'auto',
    height: 'auto',
    src,
    element: document.getElementById('livestreamContainer'),
    onMounted: function () {
      //executed after iframe is fully loaded
      window.belive.setLanguage(
        ISO_LANGUAGE_MAP[locale.value],
        function () {},
        function () {}
      )
      window.belive.login(
        {
          id: userStore.id,
          displayName: userStore.nickname
        },
        function () {},
        function () {}
      )
    },
    onUpdated: function () {},
    onAuthenticate: function () {
      //callback when user click on features that have to authenticate
    },
    onError: function () {
      //callback if any error occured
      // { statusCode: 404, message: "Source not found" }
      // { statusCode: 1341, message: "Your account is logged in from another device" }
    }
  })
}
</script>

<style scoped>
#livestreamContainer > :deep(*) {
  height: v-bind('iFrameHeight') !important;
}
</style>
