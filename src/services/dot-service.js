import axios from 'axios'
import { useGlobalStore } from '@/stores'

const token = 'RElTX3RyaWFsXzE0MTpMejRZdThoUjFhOFVPRGxrOE5rcXpnZXRUMFpSQ0RBQg=='
const version = 'v1'

const http = axios.create({
  baseURL: ''
})

http.interceptors.request.use(
  ({ ...config }) => {
    const store = useGlobalStore()
    store.isLoadingVisible = true

    config.headers.Authorization = 'Bearer ' + token
    return config
  },
  (error) => {
    const store = useGlobalStore()
    store.isLoadingVisible = false
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  async (res) => {
    const store = useGlobalStore()
    store.isLoadingVisible = false

    return res.data
  },
  (error) => {
    const store = useGlobalStore()
    store.isLoadingVisible = false
    return Promise.reject(error)
  }
)

export default {
  getCustomer(id) {
    return http({
      url: `/identity/api/${version}/customers/${id}`,
      method: 'GET'
    })
  },

  getCustomerPortrait(id) {
    return http({
      url: `/identity/api/${version}/customers/${id}/document/portrait`,
      method: 'GET'
    })
  },

  createCustomer() {
    return http({
      url: `/identity/api/${version}/customers`,
      method: 'POST'
    })
  },

  createLiveness(id) {
    return http({
      url: `/identity/api/${version}/customers/${id}/liveness`,
      method: 'PUT'
    })
  },

  uploadPassiveLiveness({ id, selfie }) {
    return http({
      url: `/identity/api/${version}/customers/${id}/liveness/selfies`,
      method: 'POST',
      data: {
        assertion: 'NONE',
        image: {
          data: selfie
        }
      }
    })
  },

  evaluatePassiveLiveness(id) {
    return http({
      url: `/identity/api/${version}/customers/${id}/liveness/evaluation`,
      method: 'POST',
      data: {
        type: 'PASSIVE_LIVENESS'
      }
    })
  },

  createDocument(customerId) {
    return http({
      url: `/identity/api/${version}/customers/${customerId}/document`,
      method: 'PUT',
      data: {
        advice: {
          classification: {
            countries: [],
            types: [],
            editions: [],
            machineReadableTravelDocuments: []
          }
        },
        sources: ['VIZ', 'MRZ', 'BARCODE', 'DOCUMENT_PORTRAIT']
      }
    })
  },

  uploadDocument({ customerId, document }) {
    return http({
      url: `/identity/api/${version}/customers/${customerId}/document/pages`,
      method: 'PUT',
      data: {
        image: {
          data: document
        }
      }
    })
  },

  createFace(selfie) {
    return http({
      url: `/identity/api/${version}/faces`,
      method: 'POST',
      data: {
        image: {
          data: selfie
        },
        detection: {
          mode: 'STRICT',
          faceSizeRatio: {
            min: 0.05,
            max: 0.5
          }
        }
      }
    })
  },

  compare({ faceId, referenceFace }) {
    return http({
      url: `/identity/api/${version}/faces/${faceId}/similarity`,
      method: 'POST',
      data: {
        referenceFace
      }
    })
  }
}
