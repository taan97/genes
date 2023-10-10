import { http } from './base-service'

export default {
  uploadImage(file) {
    return http.request(
      {
        url: '/user/upload',
        method: 'POST',
        data: http.convertToFormData({ file })
      },
      { noEncrypt: true }
    )
  }
}
