import { getLanguageList } from '../simple-localize'

export const LOCALE = {
  EN: 'en',
  ZH_CN: 'zh-cn',
  VI: 'vi',
  KO_KR: 'ko-kr',
  JA: 'ja',
  ID: 'id',
  TH: 'th',
  PT_BR: 'pt-br'
}

export const DEFAULT_LOCALE = LOCALE.EN
export const FALLBACK_LOCALE = LOCALE.ZH_CN

export const LOCALE_LIST = [
  {
    label: 'English',
    value: LOCALE.EN,
    flag: '🇬🇧'
  },
  {
    label: '中文',
    value: LOCALE.ZH_CN,
    flag: '🇨🇳'
  },
  {
    label: 'Tiếng Việt',
    value: LOCALE.VI,
    flag: '🇻🇳'
  },
  {
    label: '한국어',
    value: LOCALE.KO_KR,
    flag: '🇰🇷'
  },
  {
    label: '日本語',
    value: LOCALE.JA,
    flag: '🇯🇵'
  },
  {
    label: 'Bahasa Indonesia',
    value: LOCALE.ID,
    flag: '🇮🇩'
  },
  {
    label: 'ภาษาไทย',
    value: LOCALE.TH,
    flag: '🇹🇭'
  },
  {
    label: 'Idioma Do Brasil',
    value: LOCALE.PT_BR,
    flag: '🇧🇷'
  }
]

export const HTTP_LOCALE = {
  [LOCALE.EN]: 'en',
  [LOCALE.ZH_CN]: 'zh',
  [LOCALE.VI]: 'vi',
  [LOCALE.KO_KR]: 'ko',
  [LOCALE.JA]: 'ja',
  [LOCALE.ID]: 'id',
  [LOCALE.TH]: 'th',
  [LOCALE.PT_BR]: 'pt'
}

export const ISO_LANGUAGE_MAP = {
  [LOCALE.EN]: 'en',
  [LOCALE.ZH_CN]: 'zh',
  [LOCALE.VI]: 'vi',
  [LOCALE.KO_KR]: 'ko',
  [LOCALE.JA]: 'ja',
  [LOCALE.ID]: 'id',
  [LOCALE.TH]: 'th',
  [LOCALE.PT_BR]: 'pt'
}

export const liveChatMap = {
  [LOCALE.EN]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=7a97edeb-f79b-479e-8af8-c87cf6d61542',
  [LOCALE.ZH_CN]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=dd49b461-f877-43fe-beda-11a31e2ca497',
  [LOCALE.VI]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=f786924e-e8ce-44ad-8b43-6b90a1e47fea',
  [LOCALE.KO_KR]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=7a97edeb-f79b-479e-8af8-c87cf6d61542',
  [LOCALE.JA]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=3eb6c54e-d9f1-4fd8-b905-9b960948b4dc',
  [LOCALE.ID]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=7a97edeb-f79b-479e-8af8-c87cf6d61542',
  [LOCALE.TH]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=7a97edeb-f79b-479e-8af8-c87cf6d61542',
  [LOCALE.PT_BR]:
    'https://vue.comm100.com/chatwindow.aspx?siteId=90004262&planId=7a97edeb-f79b-479e-8af8-c87cf6d61542'
}

checkSynchronizationWithSimpleLocalize()

async function checkSynchronizationWithSimpleLocalize() {
  const availableModuleMap = getAvailableLocaleModuleMap()
  const simpleLocalizeLanguageMap = await getSimpleLocalizeLanguageMap()

  LOCALE_LIST.forEach(({ value }) => {
    const error = new Error()
    error.name = 'Synchronization With SimpleLocalize check'

    if (!availableModuleMap[value]) {
      error.message = `Language key '${value}' doesn't exist in static language module. Please make sure that src/locales/languages/${value}.json exists.`
      throw error
    }

    if (!simpleLocalizeLanguageMap[value]) {
      error.message = `Language key '${value}' is defined in this application, but it doesn't exist in SimpleLocalize.`
      throw error
    }
  })
}

function getAvailableLocaleModuleMap() {
  const modules = import.meta.glob('./*.json')
  return Object.keys(modules).reduce((modules, item) => {
    const key = item.replace(/\.\/|\.json/g, '')
    modules[key] = true
    return modules
  }, {})
}

async function getSimpleLocalizeLanguageMap() {
  const languages = (await getLanguageList()) || LOCALE_LIST
  return languages.reduce((map, item) => {
    map[item.value] = true
    return map
  }, {})
}
