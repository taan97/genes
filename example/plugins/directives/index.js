import debounce from './v-debounce'
import toggleActiveState from './v-toggle-active-state'

const directives = [debounce, toggleActiveState]

export default {
  install(app) {
    directives.forEach(({ name, options }) => {
      app.directive(name, options)
    })
  }
}
