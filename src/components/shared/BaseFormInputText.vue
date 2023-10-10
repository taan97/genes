<template>
  <div
    class="w-full"
    :class="props.containerClass"
  >
    <van-field
      autocomplete="off"
      class="custom-input"
      v-bind="$attrs"
      @blur="onBlur"
      @input="onInput"
    >
      <template #left-icon>
        <slot
          name="left-icon"
          :color="mainColor.border"
        />
      </template>
      <template #right-icon>
        <slot name="right-icon" />
      </template>
    </van-field>
    <div
      v-if="props.showErrorMessage && status.touched && errorMessage"
      class="absolute text-size-2 italic my-1 text-white-1 font-bold"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { reactive, ref, computed, useAttrs } from 'vue'

import { rulesMap } from '@/utils/rules-map.js'
import { useFormParent } from '@/utils/composables/use-form-relations.js'

/**
 * This component is tightly coupled with its parent, BaseForm
 */
const props = defineProps({
  name: {
    /**
     * Unique id for this instance
     * required if used in inside BaseForm.vue
     */
    type: String,
    default: ''
  },

  rules: {
    /**
     * rules: Rule[]
     * type Rule = {
     *  validator: () => boolean,
     *  message: string|function // error message, if message is a function, it must return a string
     * }
     */
    type: Array,
    default: () => []
  },

  validateOn: {
    type: String,
    default: 'blur',
    validator: (prop) => ['blur', 'input'].includes(prop)
  },

  showErrorMessage: {
    type: Boolean,
    default: true
  },

  lightTheme: {
    type: Boolean,
    default: false
  },

  containerClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const mainColor = props.lightTheme
  ? { color: 'var(--root-white-1)', border: 'var(--root-orange-1)' }
  : { color: 'var(--root-black-1)', border: 'var(--root-black-1)' }

useFormParent(props)

const attrs = useAttrs()

const status = reactive({
  dirty: false, // input has not been changed
  touched: false // input has not been blurred
})

const errorMessage = ref('')

const normalizedRules = computed(() => {
  return props.rules.map((rule) => {
    if (typeof rule === 'string') return getRuleByName(rule)
    return rule
  })
})

function onInput(event) {
  emit('update:modelValue', event.target.value)

  status.dirty = true
  props.validateOn === 'input' && validate()
}

function onBlur() {
  status.touched = true
  props.validateOn === 'blur' && validate()
}

function getRuleByName(name) {
  if (!rulesMap[name])
    throw new Error(`${name} rule does not exist. Please write your own rule.`)
  return rulesMap[name]
}

// exposable methods
function reset() {
  emit('update:modelValue', '')
  clearValidation()
  markAsUnTouched()
}

function getValidationStatus() {
  for (const rule of normalizedRules.value) {
    if (!rule.validator(attrs.modelValue ?? attrs['model-value']))
      return {
        isValid: false,
        message:
          typeof rule.message === 'function' ? rule.message() : rule.message
      }
  }
  return { isValid: true, message: '' }
}

function validate() {
  const { message } = getValidationStatus()
  errorMessage.value = message
}

function forceValidate() {
  markAsTouched()
  const { message } = getValidationStatus()
  errorMessage.value = message
}

function clearValidation() {
  errorMessage.value = ''
}

function markAsTouched() {
  status.touched = true
}

function markAsUnTouched() {
  status.touched = false
}

defineExpose({
  reset,
  getValidationStatus,
  validate,
  forceValidate,
  clearValidation,
  markAsTouched,
  markAsUnTouched
})
</script>

<style scoped>
.custom-input.van-field {
  min-height: 36px;

  padding: 0px;

  border-bottom: 2px solid v-bind('mainColor.border');

  background-color: transparent;
  --van-field-input-text-color: v-bind('mainColor.color');
  --van-field-placeholder-text-color: v-bind('mainColor.color');
}
.custom-input.van-field > :deep(.van-field__left-icon) {
  display: flex;
  align-items: center;
}

.custom-input.van-field > :deep(.van-field__label) {
  color: v-bind('mainColor.color');
  width: 4rem;
}
.custom-input.van-field :deep(.van-field__value) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.custom-input.van-field :deep(.van-field__body > textarea) {
  padding: 0.5rem;
}
.custom-input.van-field :deep(.van-field__word-limit) {
  color: v-bind('mainColor.color');
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
}
.custom-input.van-field > :deep(.van-field__left-icon > *:last-child) {
  margin-right: 0.5rem;
}
.van-cell:after {
  display: none;
}
.custom-input.van-field :deep(.van-field__right-icon) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
