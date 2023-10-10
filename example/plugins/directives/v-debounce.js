const DEFAULT_DELAY = 500

/**
 * custom directive v-debounce
 * dynamic debouncing for DOM elements
 * value: handler attached to the element
 * arg: delay time.
 *    For example: <input v-debounce:300="myHandler" />
 *    delay time is 300ms, if it's not set, then it's default to 500ms
 * modifiers: multiple events that are passed to the element, if it's not set, then it's default to 'input'
 */
export default {
  name: 'debounce',

  options: {
    mounted(el, { value: fn, arg: delay = DEFAULT_DELAY, modifiers }) {
      const events =
        Object.keys(modifiers).length === 0 ? ['input'] : Object.keys(modifiers)

      events.forEach((eventName) => {
        el.addEventListener(eventName, debounce(el, fn, parseInt(delay)))
      })
    }
  }
}

function debounce(el, fn, delay) {
  let timeoutId = null

  return function (event) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.call(el, event.target.value)
    }, delay)
  }
}
