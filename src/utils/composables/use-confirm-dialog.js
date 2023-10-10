import { ref, reactive } from 'vue'

export function useConfirmDialog() {
  const isVisible = ref(false)

  const handlers = reactive({
    confirm: () => {},
    cancel: () => {}
  })

  function handle(cb) {
    cb()
    isVisible.value = false
  }

  function open() {
    isVisible.value = true

    return new Promise((resolve, reject) => {
      handlers.confirm = () => handle(resolve)
      handlers.cancel = () => handle(reject)
    })
  }

  return {
    isVisible,
    handlers,
    open
  }
}
