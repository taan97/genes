import { onBeforeUnmount } from 'vue'

export function useApiFetchInterval({
  callback,
  ms,
  conditionToStop, // expect a reactive value (computed or ref)
  startImmediately = true
} = {}) {
  let intervalId = null

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  async function startInterval() {
    startImmediately && (await callback())

    clearInterval(intervalId)

    intervalId = setInterval(() => {
      if (conditionToStop.value) return clearInterval(intervalId)

      callback()
    }, ms)
  }

  return {
    startInterval
  }
}
