import { RouteBuilder } from './route-builder'
import routes from './routes'

const { router } = new RouteBuilder(routes)

export default router
