import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default {
  install(app) {
    app.use(VueVideoPlayer)
  }
}
