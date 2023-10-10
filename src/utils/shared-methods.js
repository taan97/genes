import { Toast } from 'vant'
import i18n from '@/locales'
import copy from 'copy-to-clipboard'

export function copyText(string) {
  if (!string) return

  copy(string)
  showToast({ type: 'success', message: i18n.global.t('AppMessage.Copied') })
}

export async function share(title, url) {
  if (!navigator.share)
    return showToast({
      type: 'fail',
      message: i18n.global.t('AppMessage.ShareNotSupported')
    })

  try {
    await navigator.share({ title, url })
  } catch {}
}

export function showToast(opts) {
  const defaultOptions = {
    duration: 3500
  }

  Toast({
    ...defaultOptions,
    ...opts
  })
}

export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export function toBase64(file, { fullPath = false } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () =>
      resolve(fullPath ? reader.result : reader.result.split(',').pop())
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export function isEmpty(obj) {
  return !Object.keys(obj).length
}

export function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k, v]) => k && v !== null && v !== undefined)
      .map(([k, v]) => [k, typeof v === 'object' ? removeEmpty(v) : v])
  )
}
