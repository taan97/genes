import { onBeforeUnmount } from 'vue'
import { usePageVisibility } from '@vant/use'
import { watch } from 'vue'

export function useApiFetchInterval({
  callback,
  ms,
  conditionToStop // expect a reactive value (computed or ref)
} = {}) {
  let intervalId = null

  const pageVisibility = usePageVisibility()

  watch(pageVisibility, (value) => {
    if (value === 'hidden') return clearInterval(intervalId)

    startInterval()
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  async function startInterval() {
    await callback()

    clearInterval(intervalId)

    intervalId = setInterval(() => {
      if (conditionToStop?.value) return clearInterval(intervalId)

      callback()
    }, ms)
  }

  return {
    startInterval
  }
}
