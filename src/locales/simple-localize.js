import axios from 'axios'

const http = axios.create({ baseURL: 'https://cdn.simplelocalize.io' })
const SIMPLE_LOCALIZE_PROJECT_KEY = 'adb661b4a24f41f7b7a205799440f3ac'
const ENV = import.meta.env.PROD ? '_production' : '_latest'

export async function getLocaleMessages(locale) {
  if (import.meta.env.PROD) return null

  try {
    const res = await http({
      url: `/${SIMPLE_LOCALIZE_PROJECT_KEY}/${ENV}/${locale}`,
      method: 'GET'
    })

    // TODO: SimpleLocalize CDN Links don't support adding options to transform flat object to nested one, so this is a workaround
    const transformedMessages = Object.keys(res.data).reduce(function (
      result,
      item
    ) {
      let o = result
      const leaf = item.match(/\w+/g).reduce(function (current, next) {
        o[current] = o[current] || (String(next >>> 0) === next ? [] : {})
        o = o[current]
        return next
      })
      o[leaf] = res.data[item]
      return result
    },
    {})

    return transformedMessages
  } catch {
    return null
  }
}

export async function getLanguageList() {
  if (import.meta.env.PROD) return null

  try {
    const res = await http({
      url: `/${SIMPLE_LOCALIZE_PROJECT_KEY}/${ENV}/_languages`,
      method: 'GET'
    })
    return res.data.map((d) => ({ value: d.key, label: d.name }))
  } catch {
    return null
  }
}
