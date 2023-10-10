<template>
  <MainHeader :title="$t('PageMyAccount.Title')">
    <BaseTab
      v-model:active="currentTab"
      teleport-content="tab-content"
      route-sync
    >
      <template #fixed>
        <MyAccountTabBox />
      </template>

      <BaseTabItem
        :title="
          getPlan() === PLAN_TYPE._A
            ? $t('PageMyAccount.GcrShare')
            : $t('PageMyAccount.GcrSharePlanB')
        "
        value="0"
      >
        <div class="pt-4 px-8 flex flex-col gap-3">
          <p class="text-white-1 flex items-center justify-center gap-2">
            <!--            <BaseIcon name="info" />-->
            <span>{{ $t('PageMyAccount.AverageDailyDeductibleBond') }}</span>
          </p>
          <p class="text-center text-size-5">
            {{ $formatCurrency(walletStore.wallet.average) }}
          </p>

          <router-link
            :to="{ name: 'PageMyAccountPurchaseViaUsdt' }"
            class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center my-1"
          >
            <BaseIcon
              name="buy"
              class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
            />
            <span class="text-orange-1 text-size-5 font-bold">
              {{
                getPlan() === PLAN_TYPE._A
                  ? $t('PageMyAccount.PurchaseGcrShares')
                  : $t('PageMyAccount.PurchaseGcrSharesPlanB')
              }}
            </span>
          </router-link>

          <div
            class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center my-1"
            style="--bg-color: var(--root-white-1)"
          >
            <router-link :to="{ name: 'PageMyAccountRefundGcrUnits' }">
              <BaseIcon
                name="refund"
                class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
              />
              <span class="text-orange-1 text-size-5 font-bold">
                {{
                  getPlan() === PLAN_TYPE._A
                    ? $t('PageMyAccount.RefundGcrUnits')
                    : $t('PageMyAccount.RefundGcrUnitsPlanB')
                }}
              </span>
            </router-link>

            <BaseIcon
              name="info"
              class="absolute z-[1] -right-6"
              @click.stop="
                $router.push({
                  name: 'PageGcrShareRedemptionTermsAndConditions'
                })
              "
            />
          </div>

          <router-link
            :to="{ name: 'PageGcrSharesPurchaseListing' }"
            class="flex gap-2 items-center"
          >
            <span class="underline">
              {{
                getPlan() === PLAN_TYPE._A
                  ? $t('PageGcrSharesPurchaseListing.Title')
                  : $t('PageGcrSharesPurchaseListing.TitlePlanB')
              }}
            </span>
            <BaseIcon
              class="inline fill-black-1"
              name="dropdown"
            />
          </router-link>
          <router-link
            :to="{ name: 'PageMyAccountHistoryGcrBond' }"
            class="flex gap-2 items-center"
          >
            <span class="underline">
              {{ $t('PageMyAccount.GcrBondStatementHistory') }}
            </span>
            <BaseIcon
              class="inline fill-black-1"
              name="dropdown"
            />
          </router-link>
        </div>
      </BaseTabItem>

      <BaseTabItem
        :title="$t('PageMyAccount.ConvertibleGcr')"
        value="1"
      >
        <div class="py-4 px-8 flex flex-col gap-3">
          <router-link
            :to="{ name: 'PagePromotionGoldBar' }"
            class="bg-[url('@/assets/images/genesis-station.jpeg')] bg-cover bg-center rounded-3xl p-3 border-gradient-1 shadow-outer-orange-dark-1 text-center my-1 h-[121px]"
          >
            <BaseIcon
              name="gcr-wallet"
              render-as-image="png"
              class="h-[40px] inline mt-2"
            />
            <p class="text-white-1 text-size-5 font-bold mt-4">
              {{ $t('PageMyAccount.GoldBarStation') }}
            </p>
          </router-link>

          <router-link
            :to="{ name: 'PageMyAccountConvertToUsdt' }"
            class="relative rounded-3xl p-3 border-gradient-1 shadow-outer-orange-dark-1 text-center my-1"
          >
            <BaseIcon
              name="wallet"
              class="fill-orange-1 absolute top-3 left-4"
            />
            <p class="text-orange-1 text-size-5 font-bold">
              {{ $t('PageMyAccount.ConvertibleGcr') }}
            </p>

            <p class="text-white-1 text-size-5 font-bold">
              {{ $t('PageMyAccount.Units') }}
            </p>
            <p class="text-orange-1 text-size-8 font-bold">
              {{ $formatCurrency(walletStore.wallet.ticket) }}
            </p>

            <p class="text-white-1 text-size-2">
              USD {{ $formatCurrency(walletStore.wallet.ticket_usd) }}
            </p>

            <BaseIcon
              name="info-white"
              class="absolute right-3 bottom-3"
            />
          </router-link>

          <router-link
            v-if="Number(walletStore.wallet.pending) !== 0"
            :to="{
              name: 'PageMyAccountHistoryConvBond',
              query: { status: MY_ACCOUNT_STATUS.PENDING }
            }"
            class="relative rounded-3xl p-3 border-gradient-dark-1 shadow-outer-orange-dark-1 text-center my-1"
          >
            <BaseIcon
              name="wallet"
              class="fill-orange-1 absolute top-3 left-4"
            />
            <p class="text-orange-1 text-size-5 font-bold">
              {{ $t('PageMyAccount.Collected') }}
            </p>

            <p class="text-size-5 font-bold">
              {{ $t('PageMyAccount.Units') }}
            </p>
            <p class="text-orange-1 text-size-8 font-bold">
              {{ $formatCurrency(walletStore.wallet.pending) }}
            </p>

            <p class="text-size-2">
              USD {{ $formatCurrency(walletStore.wallet.pending_usd) }}
            </p>

            <BaseIcon
              name="info-white"
              class="absolute right-3 bottom-3"
            />
          </router-link>

          <router-link
            :to="{ name: 'PageMyAccountHistoryConvBond' }"
            class="flex gap-2 items-center"
          >
            <span class="underline">
              {{ $t('PageMyAccount.ConvertibleGrcStatementHistory') }}
            </span>
            <BaseIcon
              class="inline fill-black-1"
              name="dropdown"
            />
          </router-link>
        </div>
      </BaseTabItem>

      <BaseTabItem
        title="USDT"
        value="2"
      >
        <div class="py-4 px-8 flex flex-col gap-3">
          <router-link
            :to="{ name: 'PageMyAccountDeposit' }"
            class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center my-1"
          >
            <BaseIcon
              name="deposit-usdt"
              class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
            />
            <span class="text-orange-1 text-size-5 font-bold">
              {{ $t('Button.Deposit') }}
            </span>
          </router-link>

          <router-link
            :to="{ name: 'PageMyAccountWithdrawal' }"
            class="relative rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center justify-center my-1"
            style="--bg-color: var(--root-white-1)"
          >
            <BaseIcon
              name="withdrawal-usdt"
              class="fill-orange-1 absolute top-0 bottom-0 my-auto left-4"
            />
            <span class="text-orange-1 text-size-5 font-bold">
              {{ $t('Button.Withdraw') }}
            </span>
          </router-link>

          <router-link
            :to="{ name: 'PageMyAccountHistoryDeposit' }"
            class="flex gap-2 items-center"
          >
            <span class="underline">
              {{ $t('PageMyAccount.DepositStatementHistory') }}
            </span>
            <BaseIcon
              class="inline fill-black-1"
              name="dropdown"
            />
          </router-link>
          <router-link
            :to="{ name: 'PageMyAccountHistoryWithdrawal' }"
            class="flex gap-2 items-center"
          >
            <span class="underline">
              {{ $t('PageMyAccount.WithdrawalStatementHistory') }}
            </span>
            <BaseIcon
              class="inline fill-black-1"
              name="dropdown"
            />
          </router-link>
        </div>
      </BaseTabItem>
    </BaseTab>
  </MainHeader>

  <div
    id="tab-content"
    class="pb-5"
  />
</template>

<script setup>
import { useWalletStore } from '@/stores'
import { ref } from 'vue'
import { MY_ACCOUNT_STATUS } from '@/utils/const'
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'

const currentTab = ref(null)
const walletStore = useWalletStore()

walletStore.setActType()
walletStore.setWallet({ replace: true })
</script>

<style scoped></style>
