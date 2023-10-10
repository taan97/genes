import { createRouter, createWebHistory } from 'vue-router'
import {
  scrollBehavior,
  globalAuthenticationGuard,
  addFromRoute,
  showGlobalRewardModal
} from './helpers'

export class RouteBuilder {
  constructor(routes) {
    this.router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
      scrollBehavior
    })
    this.setupGuards()
    this.overrideGo()
  }

  setupGuards() {
    this.router.beforeEach(globalAuthenticationGuard)
    this.router.afterEach(addFromRoute)
    this.router.afterEach(showGlobalRewardModal)
  }

  overrideGo() {
    const originalGo = this.router.go
    const router = this.router

    this.router.go = function (step, fallbackRoute) {
      const previousRoute = router.resolve(window.history.state?.back || '*')
      if (previousRoute.name) return originalGo.call(this, step)

      return this.replace(fallbackRoute || { name: 'PageHome' })
    }
  }
}
