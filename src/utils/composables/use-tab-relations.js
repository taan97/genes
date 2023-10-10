import { ref, inject, provide, toRef } from 'vue'

const TAB = 'tabProvider'

export function useTabChildren(activeIndex) {
  const tabs = ref({})
  provide(TAB, { tabs, active: activeIndex })

  return {
    tabs
  }
}

export function useTabParent(props) {
  const { tabs, active } = inject(TAB, {})

  if (tabs.value[props.value])
    throw Error(`Duplicated tab value: Value ${props.value} already exists`)

  tabs.value[props.value] = {
    title: props.title,
    titleClass: toRef(props, 'titleClass')
  }

  return {
    tabs,
    active
  }
}
