<template>
  <fieldset>
    <van-checkbox
      v-model="checkboxValue"
      shape="square"
      v-bind="$attrs"
    >
      <slot />
    </van-checkbox>

    <BaseFormInputText
      ref="inputRef"
      v-model="inputValue"
      :name="props.name"
      :rules="props.required ? ['required'] : []"
      class="!hidden"
    />
  </fieldset>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },

  name: {
    /**
     * Unique id for this instance
     * required if used in inside BaseForm.vue
     */
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'var(--root-black-1)'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)

const checkboxValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const inputValue = computed(() => (checkboxValue.value === true ? 'true' : ''))

watch(
  () => checkboxValue.value,
  async () => {
    await nextTick()
    inputRef.value?.forceValidate()
  }
)
</script>

<style scoped>
.van-checkbox {
  --van-checkbox-checked-icon-color: transparent;
}
.van-checkbox :deep(.van-badge__wrapper) {
  border: 1px solid v-bind('props.color');
  border-radius: 4px;
}
.van-checkbox[aria-checked='false'] :deep(.van-icon-success:before) {
  color: transparent;
}
.van-checkbox[aria-checked='true'] :deep(.van-icon-success:before) {
  color: v-bind('props.color');
}
</style>
