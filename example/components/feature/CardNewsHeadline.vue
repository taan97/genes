<template>
  <h2
    v-if="bigCategory"
    class="text-size-8 text-yellow-v-1 font-bold pt-5 mb-4 ml-4"
  >
    {{ props.bigCategory }}
  </h2>

  <div
    class="bg-cover bg-center w-full h-[288px]"
    :style="{ backgroundImage: 'url(' + props.cover + ')' }"
  />

  <div class="px-5 pt-1.5">
    <p class="text-size-2 font-semibold mb-1.5">
      {{ props.category }}
    </p>
    <router-link
      :to="{ name: 'PageNewsDetail', params: { id: props.id } }"
      class="text-yellow-v-1 font-bold"
      :class="props.titleClass"
    >
      {{ props.title }}
    </router-link>
    <slot name="summary"></slot>

    <!-- <div
      class="flex mt-5 pb-2.5 border-dashed border-b-[0.5px] border-grey-v-3"
    >
      <div class="flex gap-4 ml-auto">
        <BaseIcon
          name="share"
          @click="onClickShare(props.title, url)"
        />
      </div>
    </div> -->
  </div>
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
  bigCategory: {
    type: String,
    default: ''
  },

  category: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  titleClass: {
    type: String,
    default: 'text-size-3'
  },

  cover: {
    type: String,
    required: true
  },

  createdTime: {
    type: String,
    required: true
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
