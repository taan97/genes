import { APP_LAYOUT } from '@/utils/const.js'
import {
  otcOrderGuard,
  identityVerificationGuard,
  identityVerificationFirstStepGuard,
  identityVerificationStatusGuard,
  setUserBankToParams,
  emptyQueryGuard,
  emptyParamsGuard,
  updateEquityGuard
} from './helpers'

export default [
  {
    path: '/sign-up',
    component: () => import('@/pages/PageSignUp.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    children: [
      {
        path: '',
        name: 'PageSignUpForm',
        component: () => import('@/pages/PageSignUpForm.vue')
      },
      {
        path: 'term',
        name: 'PageSignUpTerm',
        component: () => import('@/pages/PageSignUpTerm.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'PageStart',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageStart.vue')
  },
  {
    path: '/sign-in',
    name: 'PageSignIn',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSignIn.vue')
  },
  {
    path: '/reset-password',
    name: 'PageResetPassword',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageResetPassword.vue')
  },
  {
    path: '/home',
    name: 'PageHome',
    meta: {
      layout: APP_LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageHome.vue')
  },
  {
    path: '/livestream/watch/:id?',
    name: 'PageLivestream',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageLivestream.vue')
  },
  {
    path: '/home/gcr-nav',
    name: 'PageHomeGcrNav',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageHomeGcrNav.vue')
  },
  {
    path: '/team',
    name: 'PageTeam',
    meta: {
      layout: APP_LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageTeam.vue')
  },
  {
    path: '/team-information',
    name: 'PageTeamInformation',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageTeamInformation.vue')
  },
  {
    path: '/team-information/deposit-record',
    name: 'PageTeamDepositRecord',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageTeamDepositRecord.vue')
  },
  {
    path: '/team-information/withdrawal-record',
    name: 'PageTeamWithdrawRecord',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageTeamWithdrawRecord.vue')
  },
  {
    path: '/market',
    name: 'PageMarket',
    meta: {
      layout: APP_LAYOUT.WITH_NAV_BAR
    },
    beforeEnter: (to, from, next) => {
      window.open(
        'https://trading.gencapresources.com/User/Login?ReturnUrl=%2f',
        '_blank'
      )
      next(false)
    },
    component: () => import('@/pages/PageMarket.vue')
  },
  {
    path: '/my-account',
    name: 'PageMyAccount',
    meta: {
      layout: APP_LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageMyAccount.vue')
  },
  {
    path: '/my-account/purchase-gcr-units',
    name: 'PageMyAccountPurchaseGcrUnits',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountPurchaseGcrUnits.vue')
  },
  {
    path: '/my-account/purchase-gcr-units/list',
    name: 'PageGcrSharesPurchaseListing',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageGcrSharesPurchaseListing.vue')
  },
  {
    path: '/my-account/purchase-gcr-units/usdt',
    name: 'PageMyAccountPurchaseViaUsdt',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountPurchaseViaUsdt.vue')
  },
  {
    path: '/my-account/purchase-gcr-units/agreement',
    name: 'PageGcrSharesPurchaseAgreement',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: emptyQueryGuard({ redirect: 'PageMyAccountPurchaseViaUsdt' }),
    component: () => import('@/pages/PageGcrSharesPurchaseAgreement.vue')
  },
  {
    path: '/my-account/purchase-gcr-units/convertible-bond',
    name: 'PageMyAccountPurchaseViaConvertibleBond',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () =>
      import('@/pages/PageMyAccountPurchaseViaConvertibleBond.vue')
  },
  {
    path: '/my-account/convert-to-usdt',
    name: 'PageMyAccountConvertToUsdt',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PageMyAccountConvertToUsdt.vue')
  },
  {
    path: '/my-account/convert-to-usdt/history',
    name: 'PageMyAccountHistoryConvertToUsdt',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountHistoryConvertToUsdt.vue')
  },
  {
    path: '/my-account/convert-to-balance',
    name: 'PageMyAccountConvertToBalance',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PageMyAccountConvertToBalance.vue')
  },
  {
    path: '/my-account/convert-to-shares',
    name: 'PageMyAccountConvertToShares',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountConvertToShares.vue')
  },
  {
    path: '/my-account/refund-gcr-units',
    name: 'PageMyAccountRefundGcrUnits',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountRefundGcrUnits.vue')
  },
  {
    path: '/my-account/refund-gcr-units/form',
    name: 'PageMyAccountRefundGcrUnitsForm',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PageMyAccountRefundGcrUnitsForm.vue')
  },
  {
    path: '/my-account/refund-gcr-units/history',
    name: 'PageMyAccountRefundHistory',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountRefundHistory.vue')
  },
  {
    path: '/my-account/deposit',
    name: 'PageMyAccountDeposit',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountDeposit.vue')
  },
  {
    path: '/my-account/deposit/usdt',
    name: 'PageMyAccountDepositUsdt',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountDepositUsdt.vue')
  },
  {
    path: '/my-account/deposit/fiat',
    name: 'PageMyAccountDepositFiat',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountDepositFiat.vue')
  },
  {
    path: '/my-account/deposit/fiat/transaction-list',
    name: 'PageMyAccountDepositFiatTransactionList',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () =>
      import('@/pages/PageMyAccountDepositFiatTransactionList.vue')
  },
  {
    path: '/my-account/withdrawal',
    name: 'PageMyAccountWithdrawal',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountWithdrawal.vue')
  },
  {
    path: '/my-account/withdrawal/usdt',
    name: 'PageMyAccountWithdrawalUsdt',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PageMyAccountWithdrawalUsdt.vue')
  },
  {
    path: '/my-account/withdrawal/fiat',
    name: 'PageMyAccountWithdrawalFiat',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: [
      setUserBankToParams,
      emptyParamsGuard({ redirect: 'PageBindBankCard' })
    ],
    component: () => import('@/pages/PageMyAccountWithdrawalFiat.vue')
  },
  {
    path: '/my-account/withdrawal/fiat/transaction-list',
    name: 'PageMyAccounWithdrawalFiatTransactionList',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () =>
      import('@/pages/PageMyAccounWithdrawalFiatTransactionList.vue')
  },
  {
    path: '/my-account/history-gcr-bond',
    name: 'PageMyAccountHistoryGcrBond',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountHistoryGcrBond.vue')
  },
  {
    path: '/my-account/history-conv-bond',
    name: 'PageMyAccountHistoryConvBond',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountHistoryConvBond.vue')
  },
  {
    path: '/my-account/history-deposit',
    name: 'PageMyAccountHistoryDeposit',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountHistoryDeposit.vue')
  },
  {
    path: '/my-account/history-withdrawal',
    name: 'PageMyAccountHistoryWithdrawal',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyAccountHistoryWithdrawal.vue')
  },
  {
    path: '/more',
    name: 'PageMore',
    meta: {
      layout: APP_LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageMore.vue')
  },
  {
    path: '/privacy-policy',
    name: 'PagePrivacyPolicy',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePrivacyPolicy.vue')
  },
  {
    path: '/gcr-share-redemption-terms-conditions',
    name: 'PageGcrShareRedemptionTermsAndConditions',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () =>
      import('@/pages/PageGcrShareRedemptionTermsAndConditions.vue')
  },
  {
    path: '/inbox',
    name: 'PageInbox',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInbox.vue')
  },
  {
    path: '/bind-bank-card',
    name: 'PageBindBankCard',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageBindBankCard.vue')
  },
  {
    path: '/certificate-verification',
    name: 'PageCertificateVerification',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageCertificateVerification.vue')
  },
  {
    path: '/more/download',
    name: 'PageDownloadDocuments',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageDownloadDocuments.vue')
  },
  {
    path: '/more/share-certificate',
    name: 'PageShareCertificate',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageShareCertificate.vue')
  },
  {
    path: '/more/share-certificate/confirm',
    name: 'PageShareCertificateConfirm',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageShareCertificateConfirm.vue')
  },
  {
    path: '/more/share-certificate/confirm/address',
    name: 'PageShareCertificateConfirmAddress',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageShareCertificateConfirmAddress.vue')
  },
  {
    path: '/more/share-certificate/confirm/password',
    name: 'PageShareCertificateConfirmTransactionPassword',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: emptyParamsGuard({ redirect: 'PageShareCertificateConfirm' }),
    component: () =>
      import('@/pages/PageShareCertificateConfirmTransactionPassword.vue')
  },
  {
    path: '/more/share-certificate/list',
    name: 'PageShareCertificateList',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageShareCertificateList.vue')
  },
  {
    path: '/more/download/pdf-viewer',
    name: 'PagePdfViewer',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePdfViewer.vue')
  },
  {
    path: '/help-feedback',
    name: 'PageHelpFeedback',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageHelpFeedback.vue')
  },
  {
    path: '/system-feedback',
    name: 'PageSystemFeedback',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSystemFeedback.vue')
  },
  {
    path: '/help-feedback/tutorial-videos',
    name: 'PageTutorialVideos',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageTutorialVideos.vue')
  },
  {
    path: '/reset-security-question',
    name: 'PageResetSecurityQuestion',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageResetSecurityQuestion.vue')
  },
  {
    path: '/settings',
    name: 'PageSettings',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSettings.vue')
  },
  {
    path: '/referral',
    name: 'PageReferral',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageReferral.vue')
  },
  {
    path: '/settings/change-login-password',
    name: 'PageSettingsChangeLoginPassword',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSettingsChangeLoginPassword.vue')
  },
  {
    path: '/settings/change-transaction-password',
    name: 'PageSettingsChangeTransactionPassword',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSettingsChangeTransactionPassword.vue')
  },
  {
    path: '/settings/set-alert',
    name: 'PageSetAlert',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSetAlert.vue')
  },
  {
    path: '/about-us',
    name: 'PageAboutUs',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageAboutUs.vue')
  },
  {
    path: '/profile',
    name: 'PageProfile',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageProfile.vue')
  },
  {
    path: '/my-qr-code',
    name: 'PageMyQrCode',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageMyQrCode.vue')
  },
  {
    path: '/profile/detail',
    name: 'PagePersonalDetails',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePersonalDetails.vue')
  },
  {
    path: '/otc',
    name: 'PageOtc',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtc.vue')
  },
  {
    path: '/otc/history',
    name: 'PageOtcOrderHistory',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtcOrderHistory.vue')
  },
  {
    path: '/otc/history/:id',
    name: 'PageOtcOrderHistoryItem',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtcOrderHistoryItem.vue')
  },
  {
    path: '/otc/order/:id/:step',
    name: 'PageOtcOrderDetail',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: otcOrderGuard,
    component: () => import('@/pages/PageOtcOrderDetail.vue')
  },
  {
    path: '/kyc-verification',
    name: 'PageKycVerification',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageKycVerification.vue')
  },
  {
    path: '/claim',
    component: () => import('@/pages/PageClaimReward.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    children: [
      {
        path: 'reward',
        name: 'PageClaimRewardForm',
        component: () => import('@/pages/PageClaimRewardForm.vue')
      },
      {
        path: 'reward/term',
        name: 'PageClaimRewardTerm',
        component: () => import('@/pages/PageClaimRewardTerm.vue')
      },
      {
        path: 'gift',
        name: 'PageClaimGiftForm',
        component: () => import('@/pages/PageClaimGiftForm.vue')
      },
      {
        path: 'gift/term',
        name: 'PageClaimGiftTerm',
        component: () => import('@/pages/PageClaimGiftTerm.vue')
      }
    ]
  },
  {
    path: '/claim-reward/list',
    name: 'PageClaimRewardList',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageClaimRewardList.vue')
  },
  {
    path: '/promotion/macau',
    name: 'PagePromotionMacau',
    meta: {
      layout: 'LayoutPromotionMacau'
    },
    component: () => import('@/pages/PagePromotionMacau.vue')
  },
  {
    path: '/promotion/macau/terms',
    name: 'PagePromotionMacauTerms',
    meta: {
      layout: 'LayoutPromotionMacau'
    },
    component: () => import('@/pages/PagePromotionMacauTerms.vue')
  },
  {
    path: '/promotion/macau/deposit',
    name: 'PagePromotionMacauDeposit',
    meta: {
      layout: 'LayoutPromotionMacau'
    },
    component: () => import('@/pages/PagePromotionMacauDeposit.vue')
  },
  {
    path: '/promotion/macau/listing',
    name: 'PagePromotionMacauListing',
    meta: {
      layout: 'LayoutPromotionMacau'
    },
    component: () => import('@/pages/PagePromotionMacauListing.vue')
  },
  {
    path: '/promotion/macau/purchase-gcr',
    name: 'PagePromotionMacauPurchaseGcr',
    meta: {
      layout: 'LayoutPromotionMacau'
    },
    component: () => import('@/pages/PagePromotionMacauPurchaseGcr.vue')
  },
  {
    path: '/promotion/macau/reward',
    name: 'PagePromotionMacauClaimRewardForm',
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePromotionMacauClaimRewardForm.vue')
  },
  {
    path: '/promotion/gold-bar',
    name: 'PagePromotionGoldBar',
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PagePromotionGoldBar.vue')
  },
  {
    path: '/promotion/gold-bar/listing',
    name: 'PagePromotionGoldBarListing',
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PagePromotionGoldBarListing.vue')
  },
  {
    path: '/promotion/gold-bar/listing/confirm-cancel',
    name: 'PagePromotionGoldBarListingConfirmCancel',
    beforeEnter: [
      updateEquityGuard,
      emptyQueryGuard({ redirect: 'PagePromotionGoldBarListing' })
    ],
    component: () =>
      import('@/pages/PagePromotionGoldBarListingConfirmCancel.vue')
  },
  {
    path: '/promotion/gold-bar/reward-form',
    name: 'PagePromotionGoldBarClaimRewardForm',
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PagePromotionGoldBarClaimRewardForm.vue')
  },
  {
    path: '/promotion/gold-bar/terms',
    name: 'PagePromotionGoldBarTerms',
    beforeEnter: updateEquityGuard,
    component: () => import('@/pages/PagePromotionGoldBarTerms.vue')
  },
  {
    path: '/promotion/gold-bar/2nd',
    name: 'PagePromotionGoldBar2nd',
    beforeEnter: updateEquityGuard,
    component: () =>
      import('@/pages/promotion-gold-bar-2nd/PagePromotionGoldBar2nd.vue')
  },
  {
    path: '/promotion/gold-bar/2nd/listing',
    name: 'PagePromotionGoldBarListing2nd',
    beforeEnter: updateEquityGuard,
    component: () =>
      import(
        '@/pages/promotion-gold-bar-2nd/PagePromotionGoldBarListing2nd.vue'
      )
  },
  {
    path: '/promotion/gold-bar/2nd/listing/confirm-cancel',
    name: 'PagePromotionGoldBarListingConfirmCancel2nd',
    beforeEnter: [
      updateEquityGuard,
      emptyQueryGuard({ redirect: 'PagePromotionGoldBarListing' })
    ],
    component: () =>
      import(
        '@/pages/promotion-gold-bar-2nd/PagePromotionGoldBarListingConfirmCancel2nd.vue'
      )
  },
  {
    path: '/promotion/gold-bar/2nd/terms',
    name: 'PagePromotionGoldBarTerms2nd',
    beforeEnter: updateEquityGuard,
    component: () =>
      import('@/pages/promotion-gold-bar-2nd/PagePromotionGoldBarTerms2nd.vue')
  },
  {
    path: '/identity-verification',
    component: () => import('@/pages/PageIdentityVerification.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT
    },
    beforeEnter: identityVerificationGuard,
    children: [
      {
        path: 'step-1',
        name: 'PageIdentityVerificationFirstStep',
        component: () =>
          import('@/pages/PageIdentityVerificationFirstStep.vue'),
        beforeEnter: identityVerificationFirstStepGuard
      },
      {
        path: 'step-2',
        name: 'PageIdentityVerificationSecondStep',
        component: () =>
          import('@/pages/PageIdentityVerificationSecondStep.vue'),
        beforeEnter: emptyParamsGuard({
          redirect: 'PageIdentityVerificationFirstStep'
        })
      },
      {
        path: 'status',
        name: 'PageIdentityVerificationStatus',
        component: () => import('@/pages/PageIdentityVerificationStatus.vue'),
        beforeEnter: identityVerificationStatusGuard
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
