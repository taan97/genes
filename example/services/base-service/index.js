import HttpRequest from './base-http'

const http = new HttpRequest({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

export default http
