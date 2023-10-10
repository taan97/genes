<template>
  <div class="px-2 flex-1 flex flex-col text-center gap-2">
    <div class="w-1/2 whitespace-nowrap self-end">
      <BaseFormInputText
        v-model="searchText"
        name="searchText"
        type="digit"
        :placeholder="$t('PageTeam.SearchText')"
      >
        <template
          v-if="searchText"
          #left-icon
        >
          <p class="text-black-1 !mr-0">GR</p>
        </template>
        <template #right-icon>
          <button
            type="button"
            @click="onClickSearch"
          >
            <BaseIcon
              name="search"
              fill="var(--root-black-1)"
            />
          </button>
        </template>
      </BaseFormInputText>
    </div>

    <slot />

    <p class="text-white-1 pt-3">
      {{ $t('PageTeam.PlacementCommission') }}
    </p>
    <p class="text-black-1 text-size-5">
      {{ $formatCurrency(props.placementBond) }}
    </p>
    <p class="text-pink-1 text-size-2">{{ $t('PageTeam.ConvertibleBond') }}</p>

    <MyTeamPlacementTree
      :parent-placement-list="props.placementList.parents"
      :children-placement-list="props.placementList.childs"
      @clicked-item="handleSearch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  placementList: {
    type: Object,
    default: () => ({
      extra: {},
      items: []
    })
  },

  placementBond: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['searched-id'])

const searchText = ref('')

function handleSearch(value) {
  searchText.value = value
  emit('searched-id', value)
}

function onClickSearch() {
  emit('searched-id', searchText.value)
}
</script>

<style scoped></style>
