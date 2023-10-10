<template>
  <Teleport to="body">
    <Transition name="slide">
      <div
        v-show="isVisible"
        class="fixed top-0 z-[11] bg-black-2 h-full w-[min(100vw,var(--root-max-width))] right-[max(0px,calc((100vw-var(--root-max-width))/2))] flex flex-col"
      >
        <div class="flex gap-4 items-center px-5 pt-12 pb-7">
          <BaseIcon
            class="cursor-pointer"
            name="arrow-left"
            @click="onClickGoBack"
          />

          <slot name="header">
            <h3 class="flex-1 text-center text-size-4 font-bold">
              {{ props.title }}
            </h3>
          </slot>
        </div>
        <ul class="border-t border-black-4 overflow-auto">
          <li
            v-for="item in props.options"
            :key="item[props.keyedBy]"
            class="text-size-3 flex items-center gap-4 px-8 py-5 border-b border-black-4 cursor-pointer"
            :class="{
              hidden: item.disabled
            }"
            :icon="item.icon"
            :title="item.label"
            @click="onClickSelected(item)"
          >
            <slot
              name="item"
              :item="item"
            >
              <div class="w-[2rem] flex justify-end">
                <BaseIcon
                  v-if="item.icon"
                  :name="item.icon"
                />
              </div>
              <span
                class="flex-1"
                :class="{
                  'text-grey-2':
                    props.highlightSelection && selected !== item[props.keyedBy]
                }"
              >
                {{ item.label }}
              </span>
            </slot>
            <BaseIcon
              v-if="
                props.highlightSelection && selected === item[props.keyedBy]
              "
              name="checkmark"
            />
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
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
     *  icon?: string,
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

  icon: {
    type: String,
    default: ''
  },

  highlightSelection: {
    type: Boolean,
    default: true
  },

  closeAfterSelection: {
    type: Boolean,
    default: true
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

function onClickGoBack() {
  isVisible.value = false
}

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

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  width: 50%;
  opacity: 0;
}
</style>
