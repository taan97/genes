<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup>
import { computed } from 'vue'

import { useFormChildren } from '@/utils/composables/use-form-relations.js'

const emit = defineEmits(['submitted'])

const { formInputs } = useFormChildren()

const getValues = computed(() => {
  return Object.entries(formInputs.value).reduce((form, [key, value]) => {
    form[key] = value.getValue()
    return form
  }, {})
})

const getValidationStatus = computed(() => {
  return Object.values(formInputs.value).every(
    (input) => input.getValidationStatus().isValid ?? false
  )
})

function onSubmit() {
  if (!getValidationStatus.value) return forceValidate()

  emit('submitted', getValues.value)
}

function reset() {
  Object.values(formInputs.value).forEach((input) => {
    input.reset()
  })
}

function validate() {
  Object.values(formInputs.value).forEach((input) => {
    input.validate()
  })
}

function forceValidate() {
  Object.values(formInputs.value).forEach((input) => {
    input.forceValidate()
  })
}

function clearValidation() {
  Object.values(formInputs.value).forEach((input) => {
    input.clearValidation()
  })
}

function markAsTouched() {
  Object.values(formInputs.value).forEach((input) => {
    input.markAsTouched()
  })
}

function markAsUnTouched() {
  Object.values(formInputs.value).forEach((input) => {
    input.markAsUnTouched()
  })
}

defineExpose({
  formInputs,
  reset,
  getValidationStatus,
  validate,
  forceValidate,
  clearValidation,
  markAsTouched,
  markAsUnTouched
})
</script>

<style scoped></style>
