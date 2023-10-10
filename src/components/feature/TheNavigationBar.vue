<template>
  <Teleport to="body">
    <nav
      id="main-navigation"
      class="flex justify-between items-start px-3 py-2 bg-black-5 fixed bottom-0 w-[min(100vw,var(--root-max-width))] mx-auto z-10"
    >
      <router-link
        v-for="item in menuOptions"
        :key="item.value"
        :to="{ name: item.value }"
        class="flex flex-col items-center gap-1 w-[48px] text-white-1 text-size-2"
      >
        <BaseIcon
          :name="currentMenu === item.value ? item.activeIcon : item.icon"
          render-as-image
        />
        <span
          class="text-center"
          :class="[
            currentMenu === item.value ? 'text-orange-1' : 'text-white-1'
          ]"
          >{{ $t(item.label) }}</span
        >
      </router-link>
    </nav>
  </Teleport>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const MENU = {
  TEAM: 'PageTeam',
  MARKET: 'PageMarket',
  HOME: 'PageHome',
  MY_ACCOUNT: 'PageMyAccount',
  MORE: 'PageMore'
}

const menuOptions = ref([
  {
    value: MENU.TEAM,
    label: 'Navigation.Team',
    icon: 'team',
    activeIcon: 'team-active'
  },
  {
    value: MENU.MARKET,
    label: 'Navigation.Market',
    icon: 'market',
    activeIcon: 'market-active'
  },
  {
    value: MENU.HOME,
    label: 'Navigation.Home',
    icon: 'home',
    activeIcon: 'home-active'
  },
  {
    value: MENU.MY_ACCOUNT,
    label: 'Navigation.MyAccount',
    icon: 'my-account',
    activeIcon: 'my-account-active'
  },
  {
    value: MENU.MORE,
    label: 'Navigation.More',
    icon: 'more',
    activeIcon: 'more-active'
  }
])

const route = useRoute()

const currentMenu = computed(
  () =>
    menuOptions.value.find((m) => m.value === route.name)?.value || MENU.HOME
)
</script>

<style scoped>
#main-navigation {
  background: repeating-linear-gradient(
    to bottom,
    #4b271c 0px,
    #4b271c 1px,
    var(--root-black-1) 1px,
    var(--root-black-1) 15px
  );
}
</style>
