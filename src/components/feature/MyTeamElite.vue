<template>
  <div class="flex-1 flex flex-col text-center gap-4 px-2">
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

    <div>
      <p class="text-white-1 pt-3">
        {{ $t('PageTeam.EliteCommission') }}
      </p>
      <p class="text-size-5">{{ $formatCurrency(props.eliteBond) }}</p>
      <p class="text-pink-1 text-size-2">
        {{ $t('PageTeam.ConvertibleBond') }}
      </p>
    </div>

    <CardSubordinateMember
      v-for="(item, index) in props.subordinateList.items"
      :key="index"
      :index="index"
      :elite-detail="item"
      @click="onClickItem(item.uid)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  subordinateList: {
    type: Object,
    default: () => ({
      extra: {},
      items: {}
    })
  },

  eliteBond: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['searched-id'])

const searchText = ref('')

function onClickItem(value) {
  searchText.value = value
  emit('searched-id', value)
}

function onClickSearch() {
  emit('searched-id', searchText.value)
}
</script>

<style scoped></style>
