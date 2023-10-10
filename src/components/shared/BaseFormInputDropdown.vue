<template>
  <BaseFormInputText
    ref="inputRef"
    :model-value="selectedItemLabel"
    v-bind="$attrs"
    readonly
    @click="!props.disabled && (isDropdownVisible = true)"
  >
    <template #left-icon>
      <slot name="left-icon" />
    </template>

    <template #right-icon>
      <BaseIcon
        v-if="!props.disabled"
        name="arrow-down"
        width="20"
        height="20"
        class="fill-black-1"
      />
    </template>
  </BaseFormInputText>

  <Teleport to="body">
    <BaseDropdown
      v-model:show="isDropdownVisible"
      v-model:value="selectedItemValue"
      :keyed-by="props.keyedBy"
      :options="matchedResults"
      :title="props.title"
      @closed="doClosedDropdown"
      @selected="(e) => emit('selected', e)"
    >
      <template
        v-if="showSearchInput"
        #header
      >
        <p class="text-orange-1 text-size-6 font-medium py-3">
          {{ props.title }}
        </p>
        <BaseFormInputText
          v-model="searchText"
          light-theme
        >
          <template #left-icon="{ color }">
            <BaseIcon
              name="search"
              :fill="color"
            />
          </template>
        </BaseFormInputText>
      </template>

      <template #item="{ item }">
        <slot
          name="item"
          :item="item"
        />
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
import { computed, ref, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },

  options: {
    /**
     * options: Item[]
     * type Item = {
     *  label: string,
     *  value: string | number
     * }
     */
    type: Array,
    default: () => []
  },

  keyedBy: {
    type: String,
    default: 'value'
  },

  title: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'selected'])

const SHOW_SEARCH_THRESHOLD = 20
const showSearchInput = computed(
  () => props.options.length >= SHOW_SEARCH_THRESHOLD
)

const searchText = ref('')

const matchedResults = computed(() => {
  if (!searchText.value) return props.options

  return props.options.filter((o) =>
    o.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const selectedItemValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const selectedItemLabel = computed(
  () =>
    props.options.find((o) => o[props.keyedBy] === selectedItemValue.value)
      ?.label || ''
)

const inputRef = ref(null)
const isDropdownVisible = ref(false)

async function doClosedDropdown() {
  await nextTick()
  inputRef.value?.forceValidate()
}
</script>

<style scoped></style>
