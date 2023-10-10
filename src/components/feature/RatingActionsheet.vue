<template>
  <BaseActionSheet v-model:show="isVisible">
    <template #header>
      <h1 class="text-orange-1">{{ $t('PageSystemFeedback.RatingTitle') }}</h1>
    </template>
    <template #content>
      <div class="flex flex-col flex-1">
        <van-rate
          v-model="rate"
          :size="30"
          color="var(--root-white-1)"
        />

        <div class="flex flex-1" />

        <div class="my-11 mx-5">
          <button
            type="submit"
            class="relative rounded-full w-full p-3 border-gradient-1"
            style="background: var(--root-black-2)"
            @click="onClickRate"
          >
            <div class="text-orange-1 text-size-5 font-bold">
              {{ $t('Button.Submit') }}
            </div>
            <BaseIcon
              name="submit"
              class="absolute top-0 bottom-0 my-auto"
            />
          </button>
        </div>
      </div>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rate: {
    type: Number,
    default: 0
  },

  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:rate', 'update:isVisible', 'submitted'])

const rate = computed({
  get: () => props.rate,
  set: (newValue) => emit('update:rate', newValue)
})

const isVisible = computed({
  get: () => props.isVisible,
  set: (newValue) => emit('update:isVisible', newValue)
})

function onClickRate() {
  isVisible.value = false
  emit('submitted')
}
</script>

<style scoped>
.van-rate {
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
}
</style>
