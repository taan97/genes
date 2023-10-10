import CryptoJS from 'crypto-js'
import { useWalletStore } from '@/stores'

export class HelperService {
  encrypt(data) {
    const timeStamp = Date.parse(new Date()) / 1000
    const encrypted = AES_CBC_ENCRYPT(
      JSON.stringify(data),
      import.meta.env.VITE_AES_CBC_ENCRYPT_KEY
    )
    const hash = CryptoJS.SHA1(encrypted)

    return {
      timeStamp, // 校验这个时间不能相差超过10s
      data: encrypted,
      payload: hash // 可以利用这个做一个防重复提交
    }
  }

  convertToFormData(data = {}) {
    return Object.entries(data).reduce((formData, [key, value]) => {
      formData.append(key, value)
      return formData
    }, new FormData())
  }

  async updateWallet() {
    const walletStore = useWalletStore()
    await walletStore.setWallet({ replace: true })
  }
}

/**
 * AES-256-CBC对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 加密后的密文，Base64格式
 */
function AES_CBC_ENCRYPT(text, secretKey) {
  const keyHex = CryptoJS.enc.Base64.parse(secretKey)
  const ivHex = keyHex.clone()
  // 前16字节作为向量
  ivHex.sigBytes = 16
  ivHex.words.splice(4)
  const messageHex = CryptoJS.enc.Utf8.parse(text)
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
