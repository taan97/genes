<template>
  <BaseFormInputText
    ref="inputRef"
    :type="inputType"
  >
    <template #left-icon>
      <slot name="left-icon" />
    </template>
    <template #right-icon>
      <div class="flex items-center gap-2">
        <BaseIcon
          :name="eyeIcon"
          @click="isEyeOpen = !isEyeOpen"
        />
        <slot name="right-icon" />
      </div>
    </template>
  </BaseFormInputText>
</template>

<script setup>
import { ref, computed } from 'vue'

const isEyeOpen = ref(false)

const eyeIcon = computed(() => (isEyeOpen.value ? 'eye-show' : 'eye-hidden'))

const inputType = computed(() => (isEyeOpen.value ? 'text' : 'password'))

const inputRef = ref(null)

// exposable methods
function getValidationStatus() {
  return inputRef.value?.getValidationStatus() ?? false
}

function validate() {
  inputRef.value?.validate()
}

function forceValidate() {
  inputRef.value?.forceValidate()
}

function clearValidation() {
  inputRef.value?.clearValidation()
}

function markAsTouched() {
  inputRef.value?.markAsTouched()
}

function markAsUnTouched() {
  inputRef.value?.markAsUnTouched()
}

defineExpose({
  getValidationStatus,
  validate,
  forceValidate,
  clearValidation,
  markAsTouched,
  markAsUnTouched
})
</script>

<style scoped></style>
