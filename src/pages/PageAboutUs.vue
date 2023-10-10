<template>
  <BaseHeader
    id="header"
    class="!bg-none !bg-black-2 text-white-1"
  />
  <div class="!bg-none !bg-black-2 text-white-1 py-5">
    <BaseIcon
      name="logo-orange"
      class="mx-auto -mt-5"
    />

    <p class="text-center font-bold text-size-4 mt-4">
      {{ $t('PageAboutUs.AboutUsTitle') }}
    </p>
  </div>

  <div class="py-5 text-justify">
    <h3 class="text-size-5 font-bold pb-2 px-5">
      {{ $t('PageAboutUs.AboutUs') }}
    </h3>
    <div
      class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
    >
      <p>
        {{ $t('PageAboutUs.AboutUsContent') }}
      </p>
    </div>

    <h3 class="text-size-5 font-bold pt-4 pb-2 px-5">
      {{ $t('PageAboutUs.WhoWeAre') }}
    </h3>
    <van-swipe
      id="about-history"
      @change="onChangePurpose"
    >
      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.OurHistory') }}
          </p>
          <img
            src="@/assets/images/about_us/who_we_are_1.png"
            class="h-[200px]"
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.OurHistoryBanner1Content1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="historySwipe"
            background-class="!bg-none"
          >
            <i18n-t
              keypath="PageAboutUs.OurHistoryBanner1Content2"
              tag="p"
              class="text-white whitespace-pre-line pb-4"
              scope="global"
            >
              <template #SecLicense>
                <button
                  type="button"
                  class="text-orange-1 underline"
                  @click="onClick(urlMap.sec)"
                >
                  {{ $t('PageAboutUs.SecLicense') }}
                </button>
              </template>

              <template #NfaLicense>
                <button
                  type="button"
                  class="text-orange-1 underline"
                  @click="onClick(urlMap.nfa)"
                >
                  {{ $t('PageAboutUs.NfaLicense') }}
                </button>
              </template>

              <template #AsicLicens>
                <button
                  type="button"
                  class="text-orange-1 underline"
                  @click="onClick(urlMap.australian)"
                >
                  {{ $t('PageAboutUs.AsicLicens') }}
                </button>
              </template>
            </i18n-t>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>

      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col flex-1 gap-2"
        >
          <p>
            {{ $t('PageAboutUs.LeadershipTeam') }}
          </p>

          <p>
            {{ $t('PageAboutUs.GenesisCapitalResources') }}
          </p>

          <p class="flex justify-center">
            <!-- <img
              src="@/assets/images/about_us/rhys_whydam_warren.png"
              class="rounded h-[167px]"
            /> -->
          </p>

          <div>
            <p
              class="text-orange-1 text-center w-full whitespace-pre-line font-bold"
            >
              {{ $t('PageAboutUs.RhysWarren') }}
            </p>
            <p class="text-center whitespace-pre-line">
              {{ $t('PageAboutUs.RhysWarrenPosition') }}
            </p>
          </div>

          <BaseCollapseExpand
            v-model:is-expanded="leadershipSwipe"
            background-class="!bg-none"
          >
            <p class="whitespace-pre-line">
              {{ $t('PageAboutUs.RhysWarrenDetail') }}
            </p>
            <div
              v-for="(item, index) in members"
              :key="index"
              class="flex flex-col gap-4 pt-2 flex-1"
            >
              <p class="flex justify-center">
                <!-- <img
                  :src="members[index].image"
                  class="h-[180px] rounded"
                /> -->
              </p>

              <div>
                <p
                  class="text-orange-1 text-center w-full whitespace-pre-line font-bold"
                >
                  {{ item.name }}
                </p>
                <p class="text-center whitespace-pre-line">
                  {{ $t(item.position) }}
                </p>
              </div>

              <p class="whitespace-pre-line">
                {{ $t(item.detail) }}
              </p>
            </div>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>

      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.OurPurpose') }}
          </p>
          <img
            src="@/assets/images/about_us/banner_2.png"
            class="h-[200px]"
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.OurPurposeContent1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="purposeSwipe"
            background-class="!bg-none"
          >
            <p class="text-white whitespace-pre-line pb-4">
              {{ $t('PageAboutUs.OurPurposeContent2') }}
            </p>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>

      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.OurVision') }}
          </p>
          <img
            src="@/assets/images/about_us/banner_2.png"
            class="h-[200px]"
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.OurVisionContent1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="historySwipe"
            background-class="!bg-none"
          >
            <p class="text-white whitespace-pre-line pb-4">
              {{ $t('PageAboutUs.OurVisionContent2') }}
            </p>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>
    </van-swipe>

    <h3 class="text-size-5 font-bold pb-4 px-5">
      {{ $t('PageAboutUs.OurStrategy') }}
    </h3>
    <van-swipe>
      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.BusinessModel') }}
          </p>
          <img
            src="@/assets/images/about_us/strategy_banner_1.png"
            alt=""
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.BusinessModelContent1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="modelSwipe"
            background-class="!bg-none"
          >
            <p class="text-white whitespace-pre-line pb-4">
              {{ $t('PageAboutUs.BusinessModelContent2') }}
            </p>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>
    </van-swipe>

    <h3 class="text-size-5 font-bold py-4 px-5">
      {{ $t('PageAboutUs.OilBusiness') }}
    </h3>
    <van-swipe
      id="oil-bussiness"
      @change="onChangeOil"
    >
      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.OilExtractionAndRefining') }}
          </p>
          <img
            src="@/assets/images/about_us/oil_banner_1.png"
            alt=""
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.OilBusinessBanner1Content1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="extractionSwipe"
            background-class="!bg-none"
          >
            <p class="text-white whitespace-pre-line pb-4">
              {{ $t('PageAboutUs.OilBusinessBanner1Content2') }}
            </p>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>

      <van-swipe-item>
        <div
          class="relative text-white-1 bg-black-opacity-1 p-5 flex flex-col gap-3"
        >
          <p>
            {{ $t('PageAboutUs.OilFuturesTrading') }}
          </p>
          <img
            src="@/assets/images/about_us/oil_banner_2.png"
            alt=""
          />
          <p class="text-white whitespace-pre-line">
            {{ $t('PageAboutUs.OilFuturesTradingContent1') }}
          </p>
          <BaseCollapseExpand
            v-model:is-expanded="futureSwipe"
            background-class="!bg-none"
          >
            <p class="text-white whitespace-pre-line pb-4">
              {{ $t('PageAboutUs.OilFuturesTradingContent2') }}
            </p>
          </BaseCollapseExpand>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>

  <ImageViewer
    v-model:show="ispreviewer"
    :url="urlImage"
  />
</template>

<script setup>
import { ref } from 'vue'
import JeffersonMatthew from '@/assets/images/about_us/jefferson_matthew.png'
import KyleMcgaffey from '@/assets/images/about_us/kyle_mcgaffey.png'
import PhilipCollins from '@/assets/images/about_us/philip_collins.png'

const members = [
  {
    detail: 'PageAboutUs.JeffersonMatthewDetail',
    position: 'PageAboutUs.JeffersonMatthewPosition',
    name: 'Jefferson Matthew',
    image: JeffersonMatthew
  },
  {
    detail: 'PageAboutUs.KyleMcgaffeyDetail',
    position: 'PageAboutUs.KyleMcgaffeyPosition',
    name: 'Kyle Mcgaffey',
    image: KyleMcgaffey
  },
  {
    detail: 'PageAboutUs.PhilipCollinsDetail',
    position: 'PageAboutUs.PhilipCollinsPosition',
    name: 'Philip Collins',
    image: PhilipCollins
  }
]

const historySwipe = ref(false)
const leadershipSwipe = ref(false)
const purposeSwipe = ref(false)
const modelSwipe = ref(false)
const extractionSwipe = ref(false)
const futureSwipe = ref(false)
const ispreviewer = ref(false)
const urlImage = ref('')
const urlMap = {
  sec: 'https://genesis-disk.oss-accelerate.aliyuncs.com/about/seclicense.jpg',
  nfa: 'https://genesis-disk.oss-accelerate.aliyuncs.com/about/nfa.jpg',
  australian: 'https://genesis-disk.oss-accelerate.aliyuncs.com/about/asic.jpg'
}

function onChangePurpose() {
  historySwipe.value = false
  leadershipSwipe.value = false
  purposeSwipe.value = false
  scrollTop('about-history')
}

function onChangeOil() {
  extractionSwipe.value = false
  futureSwipe.value = false
  scrollTop('oil-bussiness')
}

function scrollTop(id) {
  const element = document.getElementById(id)
  const headerHeight = document.getElementById('header').offsetHeight

  window.scrollTo({
    top: element.offsetTop - headerHeight,
    left: 0,
    behavior: 'smooth'
  })
}

function onClick(url) {
  urlImage.value = url
  ispreviewer.value = true
}
</script>

<style scoped>
:deep(.van-swipe) {
  padding-bottom: 40px;
}
:deep(.van-swipe__indicator) {
  width: 8px;
  height: 8px;
  background-color: var(--root-black-1);
  opacity: 1;
}
.van-swipe-item {
  color: var(--root-black-1);
  height: auto;
}
:deep(.van-swipe__indicator--active) {
  width: 22px;
  border-radius: 9999px;
  background-color: var(--root-white-1);
}
</style>
