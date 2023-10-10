<template>
  <div>
    <p class="text-black-1">{{ props.parentPlacementList.nickname }}</p>
    <p
      class="text-black-1 underline flex gap-1 items-center justify-center"
      @click="onClickCopy(props.parentPlacementList.uid)"
    >
      {{ props.parentPlacementList.uid }}
      <BaseIcon
        name="copy"
        class="fill-white-1"
      />
    </p>
  </div>
  <div
    class="relative grid items-center grid-flow-col grid-cols-3 gap-y-6 gap-x-2"
  >
    <MyTeamPlacementTreeCard
      :placement-info="props.parentPlacementList"
      class="row-start-1 col-start-2 parent-item cursor-pointer relative"
      hide-balance
      @clicked="doClicked"
    />
    <div
      class="row-start-2 col-span-full sudo grid grid-cols-3 gap-[var(--children-gap)] pt-6"
    >
      <div
        v-for="(item, index) in placementList"
        :key="index"
        class="child-item flex flex-col gap-1"
      >
        <MyTeamPlacementTreeCard
          :placement-info="item"
          class="flex-1"
          @clicked="doClicked"
        />
        <p class="text-black-1">{{ item.nickname }}</p>
        <p
          v-if="item.uid"
          class="text-black-1 underline flex gap-1 items-center justify-center"
          @click="onClickCopy(item.uid)"
        >
          {{ item.uid }}
          <BaseIcon
            name="copy"
            class="fill-white-1"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { copyText as onClickCopy } from '@/utils/shared-methods'

const props = defineProps({
  parentPlacementList: {
    type: Object,
    default: () => ({
      /**
       * uid: null,
       * nickname: '',
       * balance: '0.00',
       * today: '0.00',
       * bal: '0.00',
       * total: '0.00'
       */
    })
  },

  childrenPlacementList: {
    type: Array,
    default: () => [
      {
        /**
         * uid: null,
         * nickname: '',
         * balance: '0.00',
         * today: '0.00',
         * bal: '0.00',
         * total: '0.00'
         */
      }
    ]
  }
})

const emit = defineEmits(['clicked-item'])

const emptyList = Array(3).fill({})

const placementList = computed(() =>
  emptyList.reduce((item, current, index) => {
    if (props.childrenPlacementList[index]) {
      item.push(props.childrenPlacementList[index])
    } else item.push({})
    return item
  }, [])
)

function doClicked(id) {
  emit('clicked-item', id)
}
</script>

<style scoped>
.parent-item::after {
  content: '';
  display: block;
  position: absolute;
  left: calc(50% - 1px);
  bottom: -26px;
  height: 24px;
  background-color: var(--root-black-1);
  width: 2px;
}

.child-item {
  position: relative;
}

.child-item::before {
  content: '';
  display: block;
  position: absolute;
  left: calc(50% - 1px);
  top: -24px;
  height: 24px;
  background-color: var(--root-black-1);
  width: 2px;
}

.sudo {
  --children-gap: 8px;
  position: relative;
}
.sudo::after {
  content: '';
  height: 2px;
  width: calc(100% - (100% - 2 * var(--children-gap)) / 3 + 2px);
  background-color: var(--root-black-1);
  position: absolute;
  top: 0;
  left: calc((100% - 2 * var(--children-gap)) / 6 - 1px);
}
</style>
