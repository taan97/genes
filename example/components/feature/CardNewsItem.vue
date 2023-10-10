<template>
  <li
    class="pb-2 border-dashed"
    :class="{
      'border-b-[0.5px] border-grey-v-3': props.border === 'bottom',
      'border-t-[0.5px] border-grey-v-3': props.border === 'top'
    }"
  >
    <router-link
      :to="{ name: 'PageNewsDetail', params: { id: props.id } }"
      class="flex flex-row"
      :class="isReversed ? 'flex-row-reverse' : ''"
    >
      <!-- <img
        v-if="props.cover"
        class="flex-auto w-28 h-28 bg-cover"
        :src="props.cover"
      /> -->
      <div
        class="bg-cover bg-center w-28 h-[59px]"
        :style="{ backgroundImage: 'url(' + props.cover + ')' }"
      />
      <div class="flex-auto w-72 pl-3">
        <p
          v-if="props.category"
          class="text-size-2 font-semibold mb-1.5"
        >
          {{ props.category }}
        </p>
        <p
          class="text-yellow-v-1 font-bold"
          :class="props.cover ? 'text-size-2' : 'text-size-3'"
        >
          {{ props.title }}
        </p>
      </div>
    </router-link>
    <!-- <div
      v-if="props.hasFooter"
      class="flex mt-5"
    >
      <div class="flex gap-4 ml-auto">
        <BaseIcon
          v-if="props.cover"
          name="share"
          @click="onClickShare(props.title, url)"
        />
      </div>
    </div> -->
  </li>
</template>

<script setup>
// import { computed } from 'vue'
// import { share as onClickShare } from '@/utils/shared-methods.js'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    default: ''
  },

  title: {
    type: String,
    required: true
  },

  cover: {
    type: String,
    default: ''
  },

  createdTime: {
    type: String,
    default: ''
  },

  readTime: {
    type: String,
    default: ''
  },

  hasFooter: {
    type: Boolean,
    default: true
  },

  isReversed: {
    type: Boolean,
    default: false
  },

  border: {
    type: String,
    default: ''
  }
})

// const url = computed(() => {
//   const origin = window.location.origin
//   const referralRoute = router.resolve({
//     name: 'PageNewsDetail',
//     params: {
//       id: props.id
//     }
//   })
//   return `${origin}${referralRoute.href}`
// })
</script>

<style scoped></style>
