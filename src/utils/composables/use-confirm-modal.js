import { ref } from 'vue'

const isVisible = ref(false)

const getDefaultOptions = () => ({
  title: '',
  message: '',
  headerIcon: '',
  confirmText: 'Button.Yes',
  confirmClass: '',
  cancelText: 'Button.Cancel',
  cancelClass: '',
  hideCancelButton: false
})

const options = ref(getDefaultOptions())

const handlers = ref({
  confirm: () => {},
  cancel: () => {}
})

export function useConfirmModal() {
  function open(opts) {
    options.value = {
      ...options.value,
      ...opts
    }
    isVisible.value = true

    return new Promise((resolve, reject) => {
      handlers.value.confirm = () => handle(resolve)
      handlers.value.cancel = () => handle(reject)
    })
  }

  return {
    open
  }
}

export function useConfirmModalRoot() {
  return {
    isVisible,
    options,
    handlers
  }
}

function handle(cb) {
  cb()
  isVisible.value = false
  cleanUp()
}

function cleanUp() {
  // Need to delay 300ms because of confirm modal transition duration
  setTimeout(() => {
    handlers.value = {
      confirm: () => {},
      cancel: () => {}
    }
    options.value = getDefaultOptions()
  }, 300)
}
