<template>
  <span
    v-if="!props.hideSelectButton"
    class="text-size-3 cursor-pointer"
    @click="onClickSelectLanguage"
    >{{ currentLocale.label }}
    <BaseIcon
      class="inline"
      name="arrow-down"
      width="16"
      height="16"
    ></BaseIcon
  ></span>
  <BaseDropdownDrawer
    v-model:show="showSelectLanguageModal"
    :title="$t('PageSignIn.ChooseLanguage')"
    :options="localeList"
    :value="currentLocale.value"
    @selected="doSelectedLanguage"
  ></BaseDropdownDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { localeList } from '@/locales/languages'
import { setLocale } from '@/locales/helpers'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  hideSelectButton: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()

const currentLocale = ref(
  localeList.find((l) => locale.value === l.value) ?? localeList[0]
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
