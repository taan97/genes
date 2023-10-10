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
