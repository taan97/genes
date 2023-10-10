import {
  unref,
  isRef,
  watch,
  onBeforeUnmount,
  onMounted,
  onDeactivated,
  onActivated
} from 'vue'

export function useEventListener(
  event,
  handler,
  { target = window, immediate } = {}
) {
  let isBinded = false

  onActivated(add)
  onMounted(add)

  onBeforeUnmount(remove)
  onDeactivated(remove)

  if (isRef(target)) {
    watch(target, (newValue, oldValue) => {
      remove(oldValue)
      add(newValue)
    })
  }

  function add(targetElement = target) {
    if (isBinded) return

    const element = unref(targetElement)

    element.addEventListener(event, handler)
    if (immediate) handler()
    isBinded = true
  }

  function remove(targetElement = target) {
    targetElement.removeEventListener(event, handler)
    isBinded = false
  }
}
