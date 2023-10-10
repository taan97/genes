<template>
  <div>
    <section
      class="h-[160px] pt-6 px-10 tiny:px-14 flex gap-4 tiny:gap-8 items-center shadow-inner-dark-v-1"
    >
      <BaseIcon
        name="logo-square-yellow"
        width="82"
        height="86"
        class="w-[82px]"
      />
      <div class="flex-1 flex flex-col gap-1">
        <h3 class="text-orange-v-1 text-size-4 font-bold">
          {{ userDetails.username }}
        </h3>
        <van-rate
          v-model="userDetails.starPoint"
          :size="12"
          color="var(--root-orange-v-1)"
          void-icon="star"
          void-color="var(--root-black-v-8)"
          :count="MAXLEVEL"
          readonly
        />
        <p>
          <span class="text-orange-v-1"
            >{{ $t('PageUserProfile.Email') }}:
          </span>
          <span class="inline-block break-all">{{ userDetails.email }}</span>
        </p>
        <p class="flex flex-wrap items-center gap-1">
          <span class="text-orange-v-1">{{ $t('PageUserProfile.Id') }}: </span>
          <span class="inline-block break-all">{{ userDetails.id }}</span>
          <BaseIcon
            name="copy"
            width="13"
            height="13"
            class="ml-2 fill-orange-v-1"
            @click="onClickCopy(userDetails.id)"
          />
        </p>
      </div>
    </section>

    <ul class="mx-5 my-9 px-3 py-2 rounded-3xl shadow-inner-dark-v-1">
      <router-link
        :to="{ name: 'PageReferral' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="referral-square"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.Referral') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageManagementInformation' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="team-management-square"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.ManagementInformation') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageManagementRank' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="tier"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.ManagementRank') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageInvestmentEstatements' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="investment-statement"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.InvestmentEstatements') }}</p>
      </router-link>

      <!--      <router-link-->
      <!--        v-if="!userStore.verified"-->
      <!--        :to="{ name: 'PageIdentityVerificationFirstStep' }"-->
      <!--        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"-->
      <!--      >-->
      <!--        <BaseIcon-->
      <!--          name="identity-verification"-->
      <!--          render-as-image-->
      <!--        />-->
      <!--        <p>{{ $t('PageUserProfile.IdentityVerification') }}</p>-->
      <!--      </router-link>-->

      <router-link
        :to="{ name: 'PageHelpCenter' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="help-center-square"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.HelpCenter') }}</p>
      </router-link>

      <OnlineHelpDesk>
        <template #button>
          <div
            class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
          >
            <BaseIcon
              name="live-chat"
              render-as-image
            />
            <p>{{ $t('PageUserProfile.OnlineHelpDesk') }}</p>
          </div>
        </template>
      </OnlineHelpDesk>

      <router-link
        v-if="!userStore.is_two_factor"
        :to="{ name: 'PageBindingValidator' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="link"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.BindingValidator') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageDownloadDocuments' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="download-document"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.DownloadDocuments') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageRewardClaimRecord' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="redeem-square-small"
          render-as-image
        />
        <p>{{ $t('PageRedeem.RewardClaimRecord') }}</p>
      </router-link>

      <router-link
        :to="{ name: 'PageChangePassword' }"
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4"
      >
        <BaseIcon
          name="change-password-square"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.ChangePassword') }}</p>
      </router-link>

      <li
        class="flex items-center gap-6 px-[16px] py-2 border-b-[1px] border-black-v-4 cursor-pointer"
        @click="languageSelectorRef.showSelectLanguageModal = true"
      >
        <BaseIcon
          name="globe"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.Language') }}</p>
      </li>

      <li
        class="flex items-center gap-6 px-[16px] py-2 cursor-pointer"
        @click="onClickSignOut"
      >
        <BaseIcon
          name="logout-square-light"
          render-as-image
        />
        <p>{{ $t('PageUserProfile.SignOut') }}</p>
      </li>
    </ul>

    <LanguageSelector
      ref="languageSelectorRef"
      hide-select-button
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useConfirmModal } from '@/utils/composables/use-confirm-modal'
import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'

const { t } = useI18n()
const userStore = useUserStore()

const MAXLEVEL = 9

const userDetails = computed(() => ({
  username: userStore.username,
  email: userStore.email,
  id: userStore.id,
  starPoint: userStore.level
}))

const languageSelectorRef = ref(null)

async function onClickSignOut() {
  const Modal = useConfirmModal()
  try {
    await Modal.open({
      title: t('PageUserProfile.ConfirmModalSignOutTitle'),
      message: t('PageUserProfile.ConfirmModalSignOutMessage'),
      buttonText: t('Button.Yes'),
      confirmIcon: 'logout',
      headerIcon: 'logout-square'
    })
    handleSignOut()
  } catch {}
}

async function handleSignOut() {
  try {
    await AuthService.signOut()
    userStore.handleSignOut()
  } catch {}
}
</script>

<style scoped></style>
