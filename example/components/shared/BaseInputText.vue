<template>
  <div class="w-full">
    <van-field
      autocomplete="off"
      class="custom-input-dark"
      :class="[
        {
          'border border-red-v-1': hasRules && status.touched && errorMessage
        },
        {
          'border border-orange-v-1':
            hasRules && status.touched && !errorMessage
        }
      ]"
      v-bind="$attrs"
      @blur="onBlur"
      @input="onInput"
    >
      <template #left-icon>
        <slot name="left-icon"></slot>
      </template>
      <template #right-icon>
        <slot name="right-icon"></slot>
      </template>
    </van-field>
    <div
      v-if="props.showErrorMessage && status.touched && errorMessage"
      class="absolute text-size-1 italic my-1 text-red-v-2"
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
  }
})

const emit = defineEmits(['update:modelValue'])

useFormParent(props)

const attrs = useAttrs()

const status = reactive({
  dirty: false, // input has not been changed
  touched: false // input has not been blurred
})

const errorMessage = ref('')

const hasRules = computed(() => Boolean(props.rules.length))

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
.custom-input-dark.van-field {
  min-height: 36px;

  padding: 5px;

  border-radius: 8px;

  font-size: var(--root-size-base);

  background-color: var(--root-black-v-1);
  --van-field-input-text-color: var(--root-white-v-1);
  --van-field-placeholder-text-color: var(--root-grey-v-2);
}
.custom-input-dark.van-field > :deep(.van-field__left-icon) {
  display: flex;
  align-items: center;
}

.custom-input-dark.van-field > :deep(.van-field__label) {
  color: var(--root-white-v-1);
  width: 4rem;
}

.custom-input-dark.van-field > :deep(.van-field__left-icon > *:last-child) {
  margin-right: 1rem;
}

.van-cell:after {
  display: none;
}
</style>
