<template>
  <span
    v-if="!props.hideSelectButton"
    v-bind="$attrs"
    class="text-size-3 cursor-pointer text-black-1 whitespace-nowrap"
    @click="onClickSelectLanguage"
  >
    {{ currentLocale.label }}
    <BaseIcon
      class="inline fill-black-1"
      name="arrow-down"
      width="16"
      height="16"
    />
  </span>

  <BaseDropdown
    v-model:show="showSelectLanguageModal"
    :value="currentLocale.value"
    keyed-by="value"
    :options="LOCALE_LIST"
    @selected="doSelectedLanguage"
  >
    <template #header>
      <h1
        class="border-b-2 border-orange-1 w-full text-size-5 text-center py-4 text-orange-1 font-bold"
      >
        {{ $t('PageSignIn.SelectLanguage') }}
      </h1>
    </template>

    <template #item="{ item }">
      <div class="flex items-center gap-2 whitespace-nowrap overflow-visible">
        <p class="leading-none mt-1">{{ item.flag }}</p>
        <p class="text-white-1">{{ item.label }}</p>
      </div>
    </template>
  </BaseDropdown>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref } from 'vue'
import { LOCALE_LIST } from '@/locales'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/locales'
import BaseIcon from '@/components/shared/BaseIcon.vue'

const props = defineProps({
  hideSelectButton: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()

const currentLocale = ref(
  LOCALE_LIST.find((l) => locale.value === l.value) ?? LOCALE_LIST[0]
)

const showSelectLanguageModal = ref(false)

function onClickSelectLanguage() {
  showSelectLanguageModal.value = true
}

function doSelectedLanguage(selected) {
  currentLocale.value = selected
  setLocale(selected.value)
}

defineExpose({
  showSelectLanguageModal
})
</script>

<style scoped></style>
