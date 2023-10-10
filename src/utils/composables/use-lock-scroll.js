import { nextTick } from 'vue'

export function useLockScroll() {
  let scrollY = 0

  function lock() {
    scrollY = window.scrollY

    document.documentElement.style.overflowY = 'hidden'
    document.documentElement.style.height =
      'calc(var(--window-inner-height) - 1px)'

    document.body.style.overflowY = 'hidden'
    document.body.style.height = 'calc(var(--window-inner-height) - 1px)'
  }

  async function unlock() {
    document.documentElement.style.overflowY = ''
    document.documentElement.style.height = ''

    document.body.style.overflowY = ''
    document.body.style.height = ''

    await nextTick()
    window.scrollTo(0, scrollY)
  }

  return {
    lock,
    unlock
  }
}
