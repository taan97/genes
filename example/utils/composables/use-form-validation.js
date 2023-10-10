import { reactive } from 'vue'

export function useFormValidation() {
  const fieldRefs = reactive({})

  function setFieldRef(key) {
    return (ref) => {
      fieldRefs[key] = ref
    }
  }

  function getValidationStatus() {
    return Object.values(fieldRefs).every(
      (ref) => ref?.getValidationStatus().isValid ?? false
    )
  }

  function validate() {
    Object.values(fieldRefs).forEach((ref) => {
      ref?.validate()
    })
  }

  function forceValidate() {
    Object.values(fieldRefs).forEach((ref) => {
      ref?.forceValidate()
    })
  }

  function clearValidation() {
    Object.values(fieldRefs).forEach((ref) => {
      ref?.clearValidation()
    })
  }

  function markAsTouched() {
    Object.values(fieldRefs).forEach((ref) => {
      ref?.markAsTouched()
    })
  }

  function markAsUnTouched() {
    Object.values(fieldRefs).forEach((ref) => {
      ref?.markAsUnTouched()
    })
  }

  return {
    fieldRefs,
    setFieldRef,
    getValidationStatus,
    validate,
    forceValidate,
    clearValidation,
    markAsTouched,
    markAsUnTouched
  }
}
