import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { HTTP_LOCALE } from '@/locales/languages'
import { getLocale } from '@/locales/helpers'
import { getItemFromStorage, STORAGE_KEY } from '@/utils/storage-adapter'
import { useGlobalStore, useUserStore } from '@/stores'
import { HelperService } from './helper-service'
import { showToast } from '@/utils/shared-methods.js'
import { getPlanUrlFrom } from './plans'

class HttpRequest extends HelperService {
  constructor(opts = {}) {
    super()
    this.initialOptions = opts
    this.requestQueue = {}
    this.axios = axios.create()
    this.setupInterceptors()
  }

  /**
   * function for making API requests
   * @param {Object} requestConfig - any options that you would pass to a normal axios instance, you could pass them here. See available config options in official axios document (https://github.com/axios/axios/blob/master/README.md#request-config).
   * @returns {Promise}
   */
  async request(
    opts = {},
    { silent = false, noEncrypt = false, exactUrl = false } = {}
  ) {
    const config = {
      ...this.config,
      ...opts,
      url: exactUrl ? opts.url : getPlanUrlFrom(opts.url),
      headers: {
        ...this.config.headers,
        ...opts.headers
      }
    }

    if (!noEncrypt && opts.method === 'POST' && import.meta.env.PROD) {
      config.data = this.encrypt(opts.data)
    }

    const response = await this.axios(config)

    if (!silent && opts.method === 'POST')
      showToast({
        type: 'success',
        message: response.message
      })

    return response
  }

  get config() {
    return {
      ...this.initialOptions,
      headers: {
        ...this.initialOptions.headers,
        language: HTTP_LOCALE[getLocale()],
        Authorization: 'Bearer ' + getItemFromStorage(STORAGE_KEY.TOKEN)
      }
    }
  }

  dequeueRequest(requestId) {
    delete this.requestQueue[requestId]
    if (!Object.keys(this.requestQueue).length) {
      // request to turn off global loading sign for this instance
      const store = useGlobalStore()
      store.isLoadingVisible = false
    }
  }

  queueRequest() {
    const requestId = uuidv4()
    this.requestQueue[requestId] = true
    // request to turn on global loading sign for this instance
    const store = useGlobalStore()
    store.isLoadingVisible = true
    return requestId
  }

  setupInterceptors() {
    this.axios.interceptors.request.use(
      ({ ...config }) => {
        config.__requestId = this.queueRequest()
        return config
      },
      (error) => {
        this.dequeueRequest(error.config.__requestId)
        return Promise.reject(error)
      }
    )

    this.axios.interceptors.response.use(
      async (res) => {
        this.dequeueRequest(res.config.__requestId)
        switch (res.data.code) {
          case 0:
            return res.data
          case 2: // failed to login over 5 times consecutively
            return res.data
          case 401: {
            const store = useUserStore()
            store.handleSignOut()
            showToast({
              type: 'fail',
              message: res.data.message
            })
            return Promise.reject(res.data)
          }
          case 500: {
            const message = 'Server error'
            showToast({
              type: 'fail',
              message
            })
            return Promise.reject(message)
          }
          default:
            showToast({
              type: 'fail',
              message: res.data.message
            })
            return Promise.reject(res.data)
        }
      },
      (error) => {
        this.dequeueRequest(error.config.__requestId)
        return Promise.reject(error)
      }
    )
  }
}

export default HttpRequest
