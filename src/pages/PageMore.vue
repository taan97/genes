<template>
  <h1 class="text-center font-bold text-size-5 pt-10">
    {{ $t('PageMore.More') }}
  </h1>

  <div class="p-5 flex flex-1 flex-col gap-4">
    <router-link
      :to="{ name: 'PageInbox' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="email"
        class="absolute fill-orange-1"
      />
      <van-badge :content="globalStore.inboxCount || null">
        <p class="font-bold ml-8 text-start">
          {{ $t('PageMore.Inbox') }}
        </p>
      </van-badge>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <OnlineHelpDesk
      class="flex items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 shadow-outer-orange-dark-1"
    >
      <template #button>
        <BaseIcon
          name="livechat"
          class="fill-orange-1"
          render-as-image
        />

        <p class="flex justify-between items-center w-full">
          <span class="font-bold text-left ml-4">
            {{ $t('PageMore.LiveChat') }}
          </span>

          <BaseIcon
            class="inline fill-orange-1"
            name="dropdown"
          />
        </p>
      </template>
    </OnlineHelpDesk>

    <router-link
      :to="{ name: 'PageDownloadDocuments' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="download"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.Downloads') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      v-if="getPlan() !== PLAN_TYPE._B"
      :to="{ name: 'PageShareCertificate' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="share-certificate"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.ShareCertificate') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageTeamInformation' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="team-stroke"
        class="absolute"
        render-as-image
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.TeamInformation') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageHelpFeedback' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="help"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.HelpFeedback') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageSettings' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="setting"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.Settings') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageReferral' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="referral"
        width="20"
        height="20"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.Referral') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageClaimRewardList' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="reward"
        width="20"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.RewardRecord') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      v-if="globalStore.macauCount > 0"
      :to="{ name: 'PagePromotionMacau' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="promotion-macau"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start">
        {{ $t('PageMore.PromotionMacau') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageAboutUs' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="conver-gcr"
        class="absolute fill-orange-1"
      />
      <p class="font-bold ml-8 text-start whitespace-pre-line">
        {{ $t('PageMore.AboutGenesisCapitalResourcesLtd') }}
      </p>
      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <p class="flex-1" />

    <p class="text-center">{{ $t('PageMore.Copyright') }}</p>

    <div class="flex justify-evenly pb-6">
      <router-link
        :to="{ name: 'PagePrivacyPolicy' }"
        class="underline"
      >
        {{ $t('PageMore.PrivacyPolicy') }}
      </router-link>

      <router-link
        :to="{ name: 'PageSignUpTerm' }"
        class="underline"
      >
        {{ $t('PageMore.TermsofUse') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getPlan, PLAN_TYPE } from '@/services/base-service/plans'
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()

globalStore.setInboxCount({ replace: true })
</script>

<style scoped>
:deep(.van-badge) {
  border: none;
  top: 4px;
  right: -15px;
  padding: 3px 4px;
  background-color: var(--root-red-2);
}
</style>
