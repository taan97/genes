export const APP = {
  DEFAULT_LOCALE: 'en',
  FALLBACK_LOCALE: 'zh',

  LAYOUT: {
    WITH_NAV_BAR: 'LayoutWithNavigationBar',
    DEFAULT: 'LayoutDefault'
  }
}

export const LOCALE = {
  ENGLISH: 'en',
  CHINESE: 'zh'
}

export const STORAGE_KEY = {
  TOKEN: 'token',
  LOCALE: 'locale'
}

export const IDENTITY_VERIFICATION = {
  STATE: {
    UNDER_REVIEW: 0,
    SUCCESS_VERIFIED: 1,
    FAIL_VERIFY: 2,
    NOT_YET_VERIFIED: 3
  },
  TYPE_ID: 1,
  TYPE_PASSPORT: 2
}

export const WITHDRAW_RECORD_STATE = {
  PENDING: '0',
  REFUSED: '1',
  TRANSFER: '2',
  COMPLETED: '3',
  FAILED: '4',
  CANCEL: '5'
}

export const AUTO_INVEST_TYPE = {
  STATIC: 'static',
  DYNAMIC: 'dynamic'
}

export const INVESTMENT_LOCK = '0'

export const NEWS_CATEGORY = {
  MARKETS: 1,
  STOCK: 2,
  CRYPTO: 3,
  NEWS: 4,
  FOR_YOU: 5
}

export const EMAIL_VERIFICATION_CODE_TYPE = {
  SIGN_UP: 'register',
  FORGOT_PASSWORD: 'forget'
}

export const HAS_SUBSCRIBED = {
  YES: 1,
  NO: 0
}

export const BALANCE_TYPE = {
  balance: 'Invested Wallet',
  capital: 'Capital Wallet'
}

export const CURRENCY_TYPE = {
  USD: 'USD',
  CNY: 'CNY'
}

export const OTC_ACTION_TYPE = {
  BUY: 'buy',
  SELL: 'sell'
}

export const ORDER_STATUS = {
  PENDING: 0,
  COMPLETED: 3,
  APPEAL: 4,
  CANCELLED: 2,
  APPEAL_FAILED: 5,
  PAID: 1,
  MERCHANT_REJECTED: 7
}

export const OTC_ORDER_STEP = {
  CONFIRM: 1,
  PAY: 2,
  SELLER_CONFIRM: 3
}

export const PIN_CODE_STATUS = {
  VALID: 0,
  INVALID: 1,
  USED: 2
}

export const REDEEM_REWARD_STATUS = {
  NOT_SHIPPED: 0,
  SHIPPED: 1,
  COMPLETED: 2
}

export const REWARD_STATUS = {
  NO_REWARD: 0,
  HAS_REWARD: 1
}

export const SUBORDINATE_RANKING_TYPE = {
  LEVEL_UP: 1,
  LEVEL_DOWN: 2
}

export const ESTATEMENT_STATUS = {
  NOT_YET_GENERATED: 0,
  GENERATING: 1,
  GENERATED: 2
}
