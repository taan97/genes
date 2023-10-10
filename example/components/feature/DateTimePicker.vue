<template>
  <div
    v-bind="$attrs"
    @click="isVisible = true"
  >
    <slot>
      <button>
        {{ props.content }}
      </button>
    </slot>
  </div>
  <BaseActionSheet
    v-model:show="isVisible"
    hide-close-icon
  >
    <template #content>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="props.title"
        :cancel-button-text="$t('Button.Cancel')"
        :confirm-button-text="$t('Button.Confirm')"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
        @cancel="isVisible = false"
      />
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const isVisible = ref(false)
const currentDate = ref(new Date())
const emit = defineEmits(['changed'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})

const maxDate = ref(new Date())

const minDate = ref(new Date(2000, 0, 1))

function onConfirmDate(date) {
  emit('changed', dayjs(date).format('YYYY-MM-DD'))
  isVisible.value = false
}
</script>

<style scoped>
.van-picker,
:deep(.van-picker-column__item) {
  background-color: var(--root-black-v-5);
  color: var(--root-grey-v-1);
  background: scroll;
  font-size: var(--root-size-base);
}
.van-picker.van-datetime-picker {
  --van-picker-mask-color: var(--root-black-v-5);
}
:deep(.van-picker__toolbar) {
  width: 100%;
  justify-content: space-around;
}
:deep(.van-picker__title.van-ellipsis) {
  color: var(--root-white-v-1);
  font-weight: bold;
  font-size: var(--root-size-base);
}
:deep(.van-picker__cancel) {
  background: var(--root-gradient-dark);
  color: var(--root-grey-v-1);
  border-radius: 0.5rem;
  height: 25px;
  font-size: var(--root-size-base);
}
:deep(.van-picker__confirm) {
  background: var(--root-gradient-orange);
  color: var(--root-white-v-1);
  border-radius: 0.5rem;
  height: 25px;
  font-size: var(--root-size-base);
}
:deep(.van-picker-column__item.van-picker-column__item--selected) {
  color: var(--root-white-v-1);
}
*,
:deep(::before),
:deep(::after) {
  border-color: var(--root-black-v-4);
}
</style>
