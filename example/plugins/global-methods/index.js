export default {
  install(app) {
    app.config.globalProperties.$formatCurrency = $formatCurrency
    app.config.globalProperties.$formatCurrencyWithPrefix =
      $formatCurrencyWithPrefix
    app.config.globalProperties.$formatColorCurrency = $formatColorCurrency
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

export function $formatColorCurrency(amount) {
  if (Number(amount) > 0) return 'text-green-v-2'

  if (Number(amount) === 0) return 'text-white-v-1'

  return 'text-red-v-1'
}
