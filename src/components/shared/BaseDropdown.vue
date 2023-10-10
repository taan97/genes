<template>
  <BaseActionSheet v-model:show="isVisible">
    <template #header>
      <div class="mx-auto w-9 h-1 bg-white-1 rounded-full" />

      <slot name="header">
        <h3
          class="border-b-2 border-orange-1 w-full text-size-5 text-center py-4 text-orange-1 font-bold"
        >
          {{ props.title }}
        </h3>
      </slot>
    </template>
    <template #content>
      <ul class="overflow-auto h-40 mt-2">
        <li
          v-for="item in props.options"
          :key="item[props.keyedBy]"
          class="text-size-3 flex items-center px-8 py-2 cursor-pointer z-0"
          :class="{
            hidden: item.disabled,
            'bg-grey-3':
              props.highlightSelection && selected === item[props.keyedBy]
          }"
          @click="onClickSelected(item)"
        >
          <slot
            name="item"
            :item="item"
          >
            <p class="text-white-1">
              {{ props.translateItem ? $t(item.label) : item.label }}
            </p>
          </slot>
        </li>
      </ul>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },

  show: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: ''
  },

  options: {
    /**
     * options: Item[]
     * type Item = {
     *  label: string,
     *  value: string,
     *  id?: string,
     *  disabled?: boolean
     * }
     */
    type: Array,
    default: () => []
  },

  keyedBy: {
    type: String,
    default: 'value'
  },

  highlightSelection: {
    type: Boolean,
    default: true
  },

  closeAfterSelection: {
    type: Boolean,
    default: true
  },

  translateItem: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'update:show', 'selected', 'closed'])

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const selected = computed({
  get: () => props.value,
  set: (newValue) => emit('update:value', newValue)
})

watch(
  () => isVisible.value,
  (newValue) => {
    document.body.style.overflowY = newValue ? 'hidden' : 'auto'

    if (!newValue) {
      emit('closed')
    }
  }
)

function onClickSelected(item) {
  selected.value = item[props.keyedBy]
  emit('selected', item)
  props.closeAfterSelection && (isVisible.value = false)
}
</script>

<style scoped></style>
