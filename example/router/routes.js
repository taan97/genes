import { APP } from '@/utils/const.js'
import {
  identityVerificationGuard,
  identityVerificationFirstStepGuard,
  identityVerificationSecondStepGuard,
  identityVerificationStatusGuard,
  otcOrderGuard,
  bindingValidatorGuard
} from './helpers'

export default [
  {
    path: '/sign-up',
    component: () => import('@/pages/PageSignUp.vue'),
    meta: {
      layout: APP.LAYOUT.DEFAULT
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
    path: '/sign-in',
    name: 'PageSignIn',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSignIn.vue')
  },
  {
    path: '/forgot-password',
    name: 'PageForgotPassword',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageForgotPassword.vue')
  },

  {
    path: '/redeem',
    name: 'PageRedeemForm',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageRedeemForm.vue')
  },

  {
    path: '/redeem/record',
    name: 'PageRewardClaimRecord',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageRewardClaimRecord.vue')
  },
  {
    path: '/',
    name: 'PageHome',
    meta: {
      layout: APP.LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageHome.vue')
  },
  {
    path: '/news-detail/:id',
    name: 'PageNewsDetail',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageNewsDetail.vue')
  },
  {
    path: '/change-password',
    name: 'PageChangePassword',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageChangePassword.vue')
  },
  {
    path: '/wallet',
    name: 'PageWallet',
    meta: {
      layout: APP.LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageWallet.vue')
  },
  {
    path: '/wallet/records',
    name: 'PageWalletRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageWalletRecords.vue')
  },
  {
    path: '/help-center',
    name: 'PageHelpCenter',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageHelpCenter.vue')
  },
  {
    path: '/help-center/detail/:id',
    name: 'PageHelpCenterDetail',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageHelpCenterDetail.vue')
  },
  {
    path: '/binding-validator',
    name: 'PageBindingValidator',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    beforeEnter: bindingValidatorGuard,
    component: () => import('@/pages/PageBindingValidator.vue')
  },
  {
    path: '/download-documents',
    name: 'PageDownloadDocuments',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageDownloadDocuments.vue')
  },
  {
    path: '/profile',
    name: 'PageUserProfile',
    meta: {
      layout: APP.LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageUserProfile.vue')
  },
  {
    path: '/referral',
    name: 'PageReferral',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageReferral.vue')
  },
  {
    path: '/investment',
    name: 'PageInvestment',
    meta: {
      layout: APP.LAYOUT.WITH_NAV_BAR
    },
    component: () => import('@/pages/PageInvestment.vue')
  },
  {
    path: '/investment/invest',
    name: 'PageInvestmentInvest',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentInvest.vue')
  },
  {
    path: '/investment/invest/subscribe',
    name: 'PageInvestmentInvestSubscription',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentInvestSubscription.vue')
  },
  {
    path: '/investment/deposit',
    name: 'PageInvestmentDeposit',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentDeposit.vue')
  },
  {
    path: '/investment/withdraw',
    name: 'PageInvestmentWithdraw',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentWithdraw.vue')
  },
  {
    path: '/investment/income-premium',
    name: 'PageInvestmentIncomePremium',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentIncomePremium.vue')
  },
  {
    path: '/investment/deposit/records',
    name: 'PageInvestmentDepositRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageInvestmentDepositRecords.vue')
  },
  {
    path: '/investment/number-code',
    name: 'PageStartExperienceNumberCode',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageStartExperienceNumberCode.vue')
  },
  {
    path: '/investment/number-code/terms-and-conditions',
    name: 'PageStartExperienceNumberCodeTermsAndConditions',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () =>
      import('@/pages/PageStartExperienceNumberCodeTermsAndConditions.vue')
  },
  {
    path: '/investment/deposit/usdt-deposit',
    name: 'PageUsdtDeposit',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageUsdtDeposit.vue')
  },
  {
    path: '/investment/deposit/purchase-records',
    name: 'PagePurchaseRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePurchaseRecords.vue')
  },
  {
    path: '/investment/usdt-deposit/subscription-records',
    name: 'PageSubscriptionRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSubscriptionRecords.vue')
  },
  {
    path: '/withdraw/usdt-withdraw',
    name: 'PageUsdtWithdrawal',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageUsdtWithdrawal.vue')
  },
  {
    path: '/management-information',
    name: 'PageManagementInformation',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageManagementInformation.vue')
  },
  {
    path: '/management-information/subordinate-member',
    name: 'PageSubordinateMember',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSubordinateMember.vue')
  },
  {
    path: '/management-information/subordinate-deposit-records',
    name: 'PageSubordinateDepositRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSubordinateDepositRecords.vue')
  },
  {
    path: '/management-information/subordinate-withdrawal',
    name: 'PageSubordinateWithdrawal',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSubordinateWithdrawal.vue')
  },
  {
    path: '/management-information/subordinate-ranking',
    name: 'PageSubordinateRanking',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageSubordinateRanking.vue')
  },
  {
    path: '/management-rank',
    name: 'PageManagementRank',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageManagementRank.vue')
  },
  {
    path: '/usdt-withdrawal-records',
    name: 'PageUsdtWithdrawalRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageUsdtWithdrawalRecords.vue')
  },
  {
    path: '/fixed-income-records',
    name: 'PageFixedIncomeRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageFixedIncomeRecords.vue')
  },
  {
    path: '/management-investment-records',
    name: 'PageManagementInvestmentRecords',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageManagementInvestmentRecords.vue')
  },
  {
    path: '/investment-estatements',
    name: 'PageInvestmentEstatements',
    component: () => import('@/pages/PageInvestmentEstatements.vue')
  },
  {
    path: '/download-documents',
    name: 'PageDownloadDocuments',
    component: () => import('@/pages/PageDownloadDocuments.vue')
  },
  {
    path: '/identity-verification',
    component: () => import('@/pages/PageIdentityVerification.vue'),
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    beforeEnter: identityVerificationGuard,
    children: [
      {
        path: '',
        redirect: '/identity-verification/step-1'
      },
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
        beforeEnter: identityVerificationSecondStepGuard
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
    path: '/otc',
    name: 'PageOtc',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtc.vue')
  },
  {
    path: '/otc/history',
    name: 'PageOtcOrderHistory',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtcOrderHistory.vue')
  },
  {
    path: '/otc/history/:id',
    name: 'PageOtcOrderHistoryItem',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PageOtcOrderHistoryItem.vue')
  },
  {
    path: '/otc/order/:id/:step',
    name: 'PageOtcOrderDetail',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    beforeEnter: otcOrderGuard,
    component: () => import('@/pages/PageOtcOrderDetail.vue')
  },
  {
    path: '/pdf-viewer',
    name: 'PagePdfViewer',
    meta: {
      layout: APP.LAYOUT.DEFAULT
    },
    component: () => import('@/pages/PagePdfViewer.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
