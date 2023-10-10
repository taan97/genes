import debounce from './v-debounce'

const directives = [debounce]

export default {
  install(app) {
    directives.forEach(({ name, options }) => {
      app.directive(name, options)
    })
  }
}
