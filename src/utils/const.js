export const APP_LAYOUT = {
  WITH_NAV_BAR: 'LayoutWithNavigationBar',
  DEFAULT: 'LayoutDefault'
}

export const EMAIL_VERIFICATION_CODE_TYPE = {
  SIGN_UP: 'register',
  FORGOT_PASSWORD: 'forget',
  TRANSACTION_PASSWORD: 'fund',
  SECURITY_QUESTION: 'secret'
}

export const REFUND_STATE = {
  COMPLETED: '-1',
  PENDING: '0',
  REJECTED: '1',
  PROCESSING: '2',
  WITHDRAWAL_COMPLETED: '3',
  WITHDRAWAL_UNSUCCESSFULL: '4',
  CANCELLED: '5'
}

export const WITHDRAW_RECORD_STATE = {
  ALL: '',
  PENDING: '0',
  REFUSED: '1',
  TRANSFER: '2',
  COMPLETED: '3',
  FAILED: '4',
  CANCEL: '5'
}

export const INBOX_STATUS = {
  UNREAD: 0,
  READ: 1
}

export const INBOX_TYPE = {
  NOTIFICATION: 2,
  MESSAGE: 1
}

export const CURRENCY_TYPE = {
  USD: 'USD',
  CNY: 'CNY'
}

export const OTC_ACTION_TYPE = {
  BUY: 'buy',
  SELL: 'sell'
}

export const LIST_INVEST_TYPE = {
  PAGE_GCR_SHARE_PURCHASE_LISTING: '1'
}

export const MY_ACCOUNT_STATUS = {
  PENDING: 'pending'
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

export const REFUND_STATUS = {
  REFUNDED: 0,
  NOT_YET_REFUND: 1
}

export const DOCUMENT_TYPE = {
  ID: 1,
  PASSPORT: 2
}

export const VERIFICATION_STATUS = {
  UNDER_REVIEW: 0,
  SUCCESS_VERIFIED: 1,
  FAIL_VERIFY: 2,
  NOT_YET_VERIFIED: 3
}

export const CERTIFICATE_STATUS = {
  SUCCESS_VERIFIED: 1,
  UNDER_REVIEW: 0,
  FAIL_VERIFY: 2,
  NOT_YET_VERIFIED: 3
}

export const FIAT_DEPOSIT_STATUS = {
  PENDING: 0,
  REVIEW_FAILED: 1,
  APPROVED: 2,
  COMPLETED: 3,
  CANCELLED: 5,
  UNDER_REVIEW: 6
}

export const BALANCE_TYPE = {
  BOND: 'bond',
  TICKET: 'ticket'
}

export const PROMOTION_MACAU_ORDER_STATUS = {
  INSUFFICIENT: 0,
  INVESTING: 1,
  INVESTED: 2,
  OBSOLETE: 3
}

export const PROMOTION_MACAU_AMOUNT = 10000

export const CERTIFICATE_VERIFICATION = {
  PASS: 0,
  FAIL: 1
}
