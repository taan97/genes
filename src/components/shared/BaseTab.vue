<template>
  <div>
    <div
      ref="tabsRef"
      class="flex gap-2 bg-black-2 px-2 relative"
    >
      <button
        v-for="(tab, value) in tabs"
        :key="value"
        type="button"
        class="flex-1 py-4 text-orange-1 flex justify-center"
        :class="[{ 'text-white-1': activeValue === value }, tab.titleClass]"
        @click="onClickChangeTab(value)"
      >
        <span>{{ tab.title }}</span>
      </button>

      <div class="tab-underline" />
    </div>

    <slot name="fixed" />

    <template v-if="props.teleportContent">
      <Teleport
        v-if="isReadyToTeleport"
        :to="`#${props.teleportContent}`"
      >
        <slot />
      </Teleport>
    </template>

    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { useTabChildren } from '@/utils/composables/use-tab-relations'
import { computed, nextTick, onMounted, ref, useSlots } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  active: {
    type: String,
    default: ''
  },

  teleportContent: {
    type: String,
    default: ''
  },

  routeSync: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:active', 'changed'])

const slots = useSlots()
const router = useRouter()
const route = useRoute()

const tabItems = slots.default().filter((s) => s.type.__name === 'BaseTabItem')

const DEFAULT_ACTIVE = tabItems[0]?.props.value || ''
const initialTab = props.routeSync ? route.query.tab : ''
const localActiveValue = ref(props.active || initialTab || DEFAULT_ACTIVE)

const activeValue = computed({
  get: () => props.active || localActiveValue.value,
  set: (newValue) => {
    emit('update:active', newValue)
    localActiveValue.value = newValue
  }
})

const activeIndex = computed(() => {
  return tabItems.findIndex((t) => t.props.value === activeValue.value) || 0
})

const { tabs } = useTabChildren(activeValue)

const tabsRef = ref(null)
const tabsWidth = ref(0)

const isReadyToTeleport = ref(false)

const tabUnderlinePosition = computed(() => {
  const tabsWidth = tabsRef.value.getBoundingClientRect().width
  const length = Object.keys(tabs.value).length

  const space = (tabsWidth - length * tabsWidth * 0.2) / (length * 2)
  return space + activeIndex.value * (space * 2 + tabsWidth * 0.2) + 'px'
})

setRoute()

onMounted(() => {
  tabsWidth.value = tabsRef.value.getBoundingClientRect().width

  setupTeleportContent()
})

function setRoute() {
  props.routeSync && router.replace({ query: { tab: activeValue.value } })
}

function setupTeleportContent() {
  if (!props.teleportContent) return

  const target = document.getElementById(props.teleportContent)
  if (!target) throw Error('Teleport target is not found')
  isReadyToTeleport.value = true
}

async function onClickChangeTab(value) {
  activeValue.value = value
  emit('changed', value)
  await nextTick()
  setRoute()
}
</script>

<style scoped>
.tab-underline {
  position: absolute;
  bottom: 0;

  left: 0;
  height: 3px;
  width: 20%;

  background-color: var(--root-orange-1);
  border-radius: 9999px;

  transform: translateX(v-bind('tabUnderlinePosition'));
  transition: all 0.3s ease-out;
}
</style>
