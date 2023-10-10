<template>
  <button
    v-if="!props.hideSelectButton"
    type="button"
    v-bind="$attrs"
    class="text-size-3 text-orange-1 whitespace-nowrap border-gradient-1 rounded-full flex items-center px-3 py-1"
    @click="onClickSelectPlan"
  >
    {{ $t(currentPlan.label) }}
    <BaseIcon
      class="inline fill-orange-1"
      name="arrow-down"
      width="16"
      height="16"
    />
  </button>

  <Teleport to="body">
    <BaseDropdown
      v-model:show="showSelectPlanModal"
      :value="currentPlan.value"
      keyed-by="value"
      :options="PLAN_TYPE_LIST"
      translate-item
      @selected="doSelectedPlan"
    >
      <template #header>
        <h1
          class="border-b-2 border-orange-1 w-full text-size-5 text-center py-4 text-orange-1 font-bold"
        >
          {{ $t('AppPlanSelector.DropdownTitle') }}
        </h1>
      </template>
    </BaseDropdown>
  </Teleport>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref } from 'vue'
import {
  PLAN_TYPE_LIST,
  setPlan,
  getPlan,
  PLAN_TYPE
} from '@/services/base-service/plans'
import UserService from '@/services/user-service'

const props = defineProps({
  hideSelectButton: {
    type: Boolean,
    default: false
  }
})

const currentPlan =
  PLAN_TYPE_LIST.find((l) => getPlan() === l.value) ?? PLAN_TYPE_LIST[0]

const showSelectPlanModal = ref(false)

function onClickSelectPlan() {
  showSelectPlanModal.value = true
}

async function doSelectedPlan(selected) {
  try {
    selected.value === PLAN_TYPE._B && (await UserService.openPlanB())

    setPlan(selected.value)
    window.location.reload()
  } catch {}
}

defineExpose({
  showSelectPlanModal
})
</script>

<style scoped></style>
