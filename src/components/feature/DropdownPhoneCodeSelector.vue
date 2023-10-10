<template>
  <BaseDropdown
    v-model:show="isVisible"
    v-model:value="selectedValue"
    keyed-by="alpha_2"
    :options="displayCountryOptions"
    @selected="doSelected"
  >
    <template #header>
      <p class="text-orange-1 text-size-6 font-medium py-3">
        {{ $t('PageSignUp.SelectCountry') }}
      </p>
      <BaseFormInputText
        v-model="searchText"
        :placeholder="$t('PageSignUp.SearchCountry')"
        light-theme
        class="w-12"
      >
        <template #left-icon="{ color }">
          <BaseIcon
            name="search"
            :fill="color"
          />
        </template>
      </BaseFormInputText>
    </template>

    <template #item="{ item }">
      <span class="flex items-center leading-none">{{ item.flag }}</span>
      <span class="flex-1 pl-3 text-white-1">
        {{ item.label }}
      </span>
      <span class="text-orange-1">+{{ item.value }}</span>
    </template>
  </BaseDropdown>
</template>

<script setup>
import { ref, computed } from 'vue'
import countryJson from '@/assets/country_code.json'
import { LOCALE } from '@/locales'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'selected'])

const { locale } = useI18n()

const selectedValue = ref(locale.value === LOCALE.ZH_CN ? 'cn' : 'us')

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const countryOptions = countryJson.map((c) => ({
  label: `${c.native_name}`,
  value: `${c.phone_code}`,
  alpha_2: c.alpha_2,
  flag: c.flag
}))

const displayCountryOptions = computed(() =>
  countryOptions.filter(
    (c) =>
      c.label.toLowerCase().includes(searchText.value.toLowerCase()) ||
      c.value.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

const searchText = ref('')

emit(
  'selected',
  countryOptions.find((c) => c.alpha_2 === selectedValue.value)?.value
)

function doSelected(item) {
  emit('selected', item.value)
}
</script>

<style scoped></style>
