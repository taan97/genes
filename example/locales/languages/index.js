import en from './en.json'
import zh from './zh.json'

export const localeList = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '中文',
    value: 'zh'
  }
]

export const httpLocaleMap = {
  en: 'en',
  zh: 'zh'
}

export const liveChatMap = {
  en: 'https://nordlys.ladesk.com/scripts/inline_chat.php?cwid=3b4hfyxi',
  zh: 'https://nordlys.ladesk.com/scripts/inline_chat.php?cwid=c4849z8u'
}

export default {
  en,
  zh
}
