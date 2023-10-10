<template>
  <BaseModal
    v-model:show="isModalVisible"
    class="auto-invest-selector-modal"
  >
    <template #body>
      <p>{{ $t('PageInvestmentInvest.AutoInvestTitle') }}</p>
      <div
        class="w-[18rem] flex right-0 left-0 mx-auto mt-8 items-center justify-between bg-grey-v-4 rounded-md"
      >
        <button
          class="py-4 px-5"
          :disabled="investmentPercent === 0"
          @click="investmentPercent -= STEP"
        >
          <BaseIcon
            name="minus"
            :class="investmentPercent > 0 ? 'fill-white-v-1' : 'fill-grey-v-1'"
          />
        </button>

        <p class="py-2 text-size-4 font-bold">{{ investmentPercent }}%</p>

        <button
          class="py-3.5 px-5"
          :disabled="investmentPercent === 100"
          @click="investmentPercent += STEP"
        >
          <BaseIcon
            name="plus"
            :class="
              investmentPercent < 100 ? 'fill-white-v-1' : 'fill-grey-v-1'
            "
          />
        </button>
      </div>
      <van-steps
        :active="active"
        active-icon="quadrilateral"
        inactive-icon="diamond"
        active-color="var(--root-grey-v-3)"
        inactive-color="var(--root-grey-v-3)"
      >
        <van-step
          v-for="item in stepOptions"
          :key="item"
        ></van-step>
      </van-steps>
      <button
        class="rounded-lg w-[18rem] py-2 mb-12 mt-5 text-white-v-1 text-size-3 font-bold bg-gradient-orange shadow-outer-orange-v-1"
        @click="onClickInvest"
      >
        {{ $t('Button.AutoInvestment') }}
      </button>
    </template>
  </BaseModal>
</template>

<script>
const STARTING_PERCENT = 50
</script>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  percent: {
    type: Number,
    default: STARTING_PERCENT
  }
})

const emit = defineEmits(['update:show', 'invested'])

const STEP = 5

const isModalVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const stepOptions = [1, 25, 50, 75, 100]
const investmentPercent = ref(STARTING_PERCENT)

const active = computed(() => {
  return stepOptions.reduce((activeIndex, current, index) => {
    if (current <= investmentPercent.value) activeIndex = index
    return activeIndex
  }, -1)
})

watch(
  isModalVisible,
  (newValue) => {
    if (newValue) {
      investmentPercent.value = props.percent
    }
  },
  { immediate: true }
)

function onClickInvest() {
  emit('invested', investmentPercent.value)
  emit('update:show', false)
}
</script>

<style></style>
