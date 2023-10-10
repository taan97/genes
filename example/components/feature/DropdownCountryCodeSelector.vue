<template>
  <BaseDropdownDrawer
    v-model:show="isVisible"
    v-model:value="selectedValue"
    :options="displayCountryOptions"
    @selected="doSelected"
  >
    <template #header>
      <BaseInputText v-model="searchText">
        <template #left-icon>
          <BaseIcon
            name="search-square"
            render-as-image
          />
        </template>
      </BaseInputText>
    </template>
  </BaseDropdownDrawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import countryJson from '@/assets/country_code.json'
import { LOCALE } from '@/utils/const.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:show', 'update:value', 'selected'])

const { locale } = useI18n()

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const selectedValue = computed({
  get: () => props.value,
  set: (newValue) => emit('update:value', newValue)
})

const countryOptions = countryJson.map((c) => ({
  label: c.native_name,
  value: c.alpha_2
}))

const displayCountryOptions = computed(() =>
  countryOptions.filter((c) =>
    c.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

const searchText = ref('')

const CHINA_COUNTRY_CODE = 'cn'
const US_COUNTRY_CODE = 'us'

setDefaultOption()

function setDefaultOption() {
  const defaultValue =
    locale.value === LOCALE.CHINESE ? CHINA_COUNTRY_CODE : US_COUNTRY_CODE

  const found =
    countryOptions.find((c) => c.value === defaultValue) || countryOptions[0]
  doSelected(found)
}

function doSelected(item) {
  emit('selected', item)
}
</script>

<style scoped></style>
