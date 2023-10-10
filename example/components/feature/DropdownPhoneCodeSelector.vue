<template>
  <BaseDropdownDrawer
    v-model:show="isVisible"
    :value="selected.id"
    keyed-by="id"
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
  }
})

const emit = defineEmits(['update:show', 'selected'])

const { locale } = useI18n()

const UNITED_STATE_OPTION = {
  label: 'United States',
  value: '1',
  id: 'us'
}

const CHINA_OPTION = {
  label: 'China',
  value: '86',
  id: 'cn'
}

const selected = ref(
  locale.value === LOCALE.CHINESE ? CHINA_OPTION : UNITED_STATE_OPTION
)

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const countryOptions = countryJson.map((c) => ({
  label: `${c.native_name} +${c.phone_code}`,
  value: c.phone_code,
  id: c.alpha_2
}))

const displayCountryOptions = computed(() =>
  countryOptions.filter((c) =>
    c.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

const searchText = ref('')

emit('selected', selected.value.value)

function doSelected(item) {
  selected.value = item
  emit('selected', item.value)
}
</script>

<style scoped></style>
