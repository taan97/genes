import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@vant/touch-emulator'

import App from './App.vue'
import i18n from './locales'
import router from './router'
import plugins from './plugins'

import './styles/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(plugins)

app.mount('#app')
