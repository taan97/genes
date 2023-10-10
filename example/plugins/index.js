import directives from './directives'
import globalMethods from './global-methods'

export default {
  install(app, options) {
    app.use(directives, options)
    app.use(globalMethods, options)
  }
}
