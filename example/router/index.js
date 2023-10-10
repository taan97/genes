import { createRouter, createWebHistory } from 'vue-router'
import {
  scrollBehavior,
  globalAuthenticationGuard,
  addFromRoute
} from './helpers'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior
})

router.beforeEach(globalAuthenticationGuard)
router.beforeEach(addFromRoute)

export default router
