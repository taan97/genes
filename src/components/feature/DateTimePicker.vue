<template>
  <button
    type="button"
    class="border-b-2 !border-orange-1 w-fit flex gap-5 items-center pb-2"
    @click="isVisible = true"
  >
    <slot>
      <span class="text-white-1 w-20 text-left">
        {{ currentDate || props.placeholder }}
      </span>
    </slot>

    <BaseIcon
      class="fill-orange-1"
      name="dropdown"
    />
  </button>

  <BaseActionSheet v-model:show="isVisible">
    <template #content>
      <van-datetime-picker
        type="date"
        :model-value="new Date(currentDate)"
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

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['changed'])

const isVisible = ref(false)

const currentDate = ref(
  props.content ? dayjs(props.content).format('YYYY-MM-DD') : ''
)

const maxDate = ref(new Date())

const minDate = ref(new Date(2000, 0, 1))

function onConfirmDate(date) {
  emit('changed', dayjs(date).format('YYYY-MM-DD'))
  currentDate.value = dayjs(date).format('YYYY-MM-DD')
  isVisible.value = false
}
</script>

<style scoped>
.van-picker,
:deep(.van-picker-column__item) {
  background-color: var(--root-black-1);
  color: var(--root-grey-1);
  background: scroll;
  font-size: var(--root-size-base);
}
.van-picker.van-datetime-picker {
  --van-picker-mask-color: var(--root-black-1);
}
:deep(.van-picker__toolbar) {
  width: 100%;
  justify-content: space-around;
}
:deep(.van-picker__title.van-ellipsis) {
  color: var(--root-orange-1);
  font-weight: bold;
  font-size: var(--root-size-base);
}
:deep(.van-picker__cancel) {
  background: var(--root-gradient-dark);
  color: var(--root-grey-1);
  border-radius: 0.5rem;
  height: 25px;
  font-size: var(--root-size-base);
}
:deep(.van-picker__confirm) {
  color: var(--root-white-1);
  border-radius: 0.5rem;
  height: 25px;
  font-size: var(--root-size-base);
}
:deep(.van-picker-column__item.van-picker-column__item--selected) {
  color: var(--root-white-1);
}
*,
:deep(::before),
:deep(::after) {
  border-color: var(--root-black-4);
}
</style>
