<template>
  <BaseHeader :title="$t('PageHelpCenter.Title')" />

  <div class="p-5">
    <BaseIcon
      name="helpcenterbig"
      render-as-image
      class="mx-auto mb-12"
    />

    <div class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5">
      <ul
        v-if="helpList.length"
        class="py-1"
      >
        <li
          v-for="item in helpList"
          :key="item.id"
          class="border-b border-black-v-4 cursor-pointer last:border-b-0 py-4 px-8 text-left"
          @click="
            router.push({
              name: 'PageHelpCenterDetail',
              params: { id: item.id }
            })
          "
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCenterService from '@/services/user-center-service'
import { useRouter } from 'vue-router'

const router = useRouter()

const helpList = ref([])

setHelpList()

async function setHelpList() {
  try {
    const res = await UserCenterService.getHelpList()
    helpList.value = res.data.map((d) => ({
      id: d.id,
      title: d.title
    }))
  } catch {}
}
</script>

<style scoped></style>
