import dayjs from 'dayjs'
import i18n from '@/locales'

export default {
  install(app) {
    app.config.globalProperties.$formatCurrency = $formatCurrency
    app.config.globalProperties.$formatCurrencyWithPrefix =
      $formatCurrencyWithPrefix
    app.config.globalProperties.$formatUnits = $formatUnits
    app.config.globalProperties.$formatNumber = $formatNumber
    app.config.globalProperties.$formatDateTime = $formatDateTime
    app.config.globalProperties.$formatDate = $formatDate
    app.config.globalProperties.$formatTime = $formatTime
  }
}

export function $formatCurrency(amount) {
  const number = Number(amount) || 0

  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export function $formatCurrencyWithPrefix(amount) {
  if (Number(amount) > 0) return `+ ${$formatCurrency(amount)}`

  return `${$formatCurrency(amount)}`
}

export function $formatUnits(amount) {
  const number = Number(amount) || 0

  return `${number.toLocaleString('en-US')} ${i18n.global.t(
    'AppMessage.Units'
  )}`
}

export function $formatNumber(amount) {
  const number = Number(amount) || 0

  return number.toLocaleString('en-US')
}

export function $formatDateTime(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function $formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function $formatTime(date) {
  return dayjs(date).format('HH:MM')
}
