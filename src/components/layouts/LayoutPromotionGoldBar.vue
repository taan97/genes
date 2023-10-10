<template>
  <main class="flex-1 flex flex-col overflow-x-clip">
    <div class="sticky top-0 z-[1]">
      <img
        src="@/assets/images/promotion-gold-bar-header-bg.jpg"
        class="w-full min-h-[110px]"
      />

      <ul class="absolute top-[41%] h-[37%] w-full">
        <li
          v-for="tab in tabs"
          :key="tab.value"
          class="absolute h-full aspect-square cursor-pointer"
          :style="{ left: tab.position }"
          @click="tab.handler"
        >
          <BaseIcon
            :name="tab.icon"
            render-as-image="png"
            class="w-full h-full rounded-full pt-[2px]"
            :class="{
              'shadow-outer-orange-dark-2': props.activeTab === tab.value
            }"
          />
        </li>
      </ul>
    </div>

    <div
      class="flex-1 flex flex-col bg-[url('@/assets/images/promotion-gold-bar-center-bg.jpg')] bg-center bg-contain"
    >
      <slot />
    </div>

    <div class="sticky bottom-0 z-[1]">
      <img
        src="@/assets/images/promotion-gold-bar-bottom-bg.jpg"
        class="w-full"
      />

      <div class="absolute top-[18%] h-[40%] w-full">
        <button
          v-for="button in displaySetups"
          :key="button.position"
          type="button"
          class="absolute h-full aspect-square"
          :style="{
            left: button.position
          }"
          @click="button.active && button.handler()"
        >
          <BaseIcon
            :name="button.active ? button.activeIcon : button.inactiveIcon"
            render-as-image="png"
          />

          <p class="relative text-orange-1 font-semibold text-center">
            {{ $t(button.label) }}
          </p>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { Toast } from 'vant'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps({
  setups: {
    type: Array,
    /**
     * type setups = Setup[]
     * type Setup = {
     *   activeIcon: string
     *   inactiveIcon: string
     *   active: boolean
     *   label: string
     *   handler: function
     * }
     */
    required: true
  },

  activeTab: {
    type: String,
    default: '1st'
  }
})

const { t } = useI18n()
const router = useRouter()

const tabs = [
  {
    value: '1st',
    icon: '1st-',
    position: '4.8%',
    handler: () => {
      router.replace({ name: 'PagePromotionGoldBar' })
    }
  },
  {
    value: '2nd',
    icon: '2nd-',
    position: '26%',
    handler: () => {
      router.replace({ name: 'PagePromotionGoldBar2nd' })
    }
  },
  {
    value: '3rd',
    icon: '3rd',
    position: '47.5%',
    handler: onClickNewFeature
  },
  {
    value: '4th',
    icon: '4th',
    position: '64.9%',
    handler: onClickNewFeature
  },
  {
    value: '5th',
    icon: '5th',
    position: '86%',
    handler: onClickNewFeature
  }
]

const PRESET = [
  {
    position: '12%'
  },
  {
    position: '32%'
  },
  {
    position: '53%'
  },
  {
    position: '73%'
  }
]

const displaySetups = computed(() =>
  PRESET.map((p, i) => ({ ...p, ...props.setups[i] }))
)

function onClickNewFeature() {
  Toast(t('AppMessage.ComingSoon'))
}
</script>

<style scoped></style>
