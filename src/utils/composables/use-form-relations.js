import {
  ref,
  getCurrentInstance,
  inject,
  provide,
  onBeforeUnmount,
  onMounted
} from 'vue'

const FORM = 'form'

export function useFormParent(props) {
  const parent = inject(FORM, null)

  if (!parent) return { formInputs: {} }

  const { formInputs } = parent

  if (!props.rules.length) return { formInputs }

  onMounted(() => {
    const vm = getCurrentInstance()

    if (!props.name)
      throw Error("Missing 'name' prop in BaseFormInputText or its ancestors")

    formInputs.value[props.name] = {
      ...vm.exposed,
      getValue: () => vm.attrs.modelValue
    }
  })

  onBeforeUnmount(() => {
    delete formInputs.value[props.name]
  })

  return { formInputs }
}

export function useFormChildren() {
  const formInputs = ref({})
  provide(FORM, { formInputs })

  return { formInputs }
}
