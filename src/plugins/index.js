import directives from './directives'
import globalMethods from './global-methods'
import videojsPlayer from './videojs-player'

export default {
  install(app, options) {
    app.use(directives, options)
    app.use(globalMethods, options)
    app.use(videojsPlayer, options)
  }
}
