<template>
  <van-pull-refresh
    v-model="refreshing"
    loading-text=" "
    pulling-text=" "
    :loosing-text="$t('AppMessage.LooseToRefresh')"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      :finished="finished"
      loading-text=" "
      :finished-text="
        total === 0
          ? $t('AppMessage.NoResultFound')
          : $t('AppMessage.EverythingHasBeenLoaded')
      "
      :class="props.containerClass"
      @load="onLoad"
    >
      <template
        v-for="(item, index) in accumulatingList"
        :key="item[props.keyedBy] || index"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
        />
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script>
const DEFAULT_LIST_ITEM_KEY = 'id'
</script>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  containerClass: {
    type: String,
    default: ''
  },

  keyedBy: {
    type: String,
    default: DEFAULT_LIST_ITEM_KEY
  }
})

const emit = defineEmits(['more-requested'])

const accumulatingList = ref([])
const finished = ref(false)
const loading = ref(false)
const refreshing = ref(false)
const total = ref(0)
const currentPage = ref(0)

function onLoad() {
  currentPage.value = getNextPage()
  if (currentPage.value > 0) return handleOnLoad()

  finished.value = true
}

function handleOnLoad() {
  loading.value = true

  emit('more-requested', currentPage.value, (items, totalItems) => {
    accumulatingList.value = [...accumulatingList.value, ...items]
    total.value = totalItems
    loading.value = false

    if (accumulatingList.value.length >= totalItems) {
      finished.value = true
    }

    refreshing.value = false
  })
}

function getNextPage() {
  if (accumulatingList.value.length === 0) return 1

  if (accumulatingList.value.length >= total.value) return 0

  return currentPage.value + 1
}

function onRefresh() {
  accumulatingList.value = []
  finished.value = false
  onLoad()
}

defineExpose({
  onRefresh,
  accumulatingList
})
</script>

<style scoped>
.van-pull-refresh {
  --van-pull-refresh-loading-icon-size: 0;
  --van-pull-refresh-head-text-color: var(--root-black-1);
  --van-list-text-color: var(--root-black-1);
  overflow: visible;
}
.van-list {
  --van-list-loading-icon-size: 0;
}
:deep(.van-pull-refresh__head) {
  z-index: -1;
}
</style>
