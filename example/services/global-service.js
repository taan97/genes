import http from './base-service'

export default {
  uploadImage(file) {
    return http.request(
      {
        url: '/api/user/upload',
        method: 'POST',
        data: http.convertToFormData({ file })
      },
      { noEncrypt: true }
    )
  },

  getAnnouncement() {
    return http.request({
      url: '/api/announcement',
      method: 'GET'
    })
  }
}
