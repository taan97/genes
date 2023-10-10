import http from './base-service'

export default {
  getNewsDetail(id) {
    return http.request({
      url: `/api/newsDetails/${id}`,
      method: 'GET'
    })
  },

  getNews() {
    return http.request({
      url: '/api/news',
      method: 'GET'
    })
  },

  getNewsByCategoryId(id) {
    return http.request({
      url: '/api/news',
      method: 'GET',
      params: {
        category: id
      }
    })
  }
}
