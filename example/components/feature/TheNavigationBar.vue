<template>
  <Teleport to="body">
    <ul
      class="flex justify-between p-3 bg-black-v-5 shadow-inner-dark-v-2 fixed bottom-0 w-[min(100vw,var(--root-max-width))] m-auto z-10"
    >
      <li
        v-for="item in menuOptions"
        :key="item.value"
        class="flex flex-col justify-between items-center cursor-pointer px-7 py-5 rounded-full h-[70px] w-[70px]"
        :class="{
          'bg-black-v-2 shadow-inner-dark-circle':
            currentMenuItem.value === item.value
        }"
        @click="onClick(item)"
      >
        <img
          :ref="
            (el) => {
              iconRefs[item.icon] = el
            }
          "
          class="h-[22px] object-contain"
          :src="getIconPath(item.icon)"
          :alt="item.icon"
        />
        <p
          class="text-size-1 text-grey-v-2 font-bold text-center mt-1"
          :class="{
            '!text-white-v-1': currentMenuItem.value === item.value
          }"
        >
          {{ item.label }}
        </p>
      </li>
    </ul>
  </Teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const MENU = {
  HOME: 'PageHome',
  WALLET: 'PageWallet',
  INVESTMENT: 'PageInvestment',
  PROFILE: 'PageUserProfile'
}

const { t } = useI18n()

const menuOptions = ref([
  {
    value: MENU.HOME,
    label: computed(() => t('PageHome.Home')),
    icon: 'logo'
  },
  {
    value: MENU.WALLET,
    label: computed(() => t('PageHome.EStatements')),
    icon: 'eStatement'
  },
  {
    value: MENU.INVESTMENT,
    label: computed(() => t('PageHome.Investment')),
    icon: 'investment'
  },
  {
    value: MENU.PROFILE,
    label: computed(() => t('PageHome.Profile')),
    icon: 'user'
  }
])

const router = useRouter()
const route = useRoute()

const currentMenuItem = computed(
  () =>
    menuOptions.value.find((m) => m.value === route.name) ||
    menuOptions.value[0]
)

const iconRefs = ref({})

function onClick(item) {
  iconRefs.value[item.icon].src = getIconPath(item.icon)
  router.push({
    name: item.value
  })
}

function getIconPath(name) {
  return new URL(`/src/assets/gifs/${name}.gif`, import.meta.url).href
}
</script>

<style scoped></style>
