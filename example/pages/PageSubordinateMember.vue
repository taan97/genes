<template>
  <BaseHeader :title="$t('PageManagementInformation.SubordinateMember')" />

  <div class="p-5 pt-0 flex-1 flex flex-col">
    <div class="flex flex-col gap-6 shadow-inner-dark-v-1 rounded-3xl p-4">
      <p class="self-center text-orange-v-1 font-bold text-size-7">
        {{ $t('PageManagementInformation.TotalAmount') }}
      </p>
      <p class="self-center text-white-v-1 text-size-7">
        USD {{ $formatCurrency(totalBalance) }}
      </p>
      <p class="text-center">
        {{ $t('PageUserProfile.TotalSubordinateMember') }}:
        {{ totalSubordinate }}
      </p>
    </div>

    <div class="my-4">
      <BaseInputText
        v-model="textSearch"
        :placeholder="$t('PageManagementInformation.SearchInputPlaceholder')"
      >
        <template #left-icon>
          <BaseIcon
            name="search-square"
            render-as-image
          />
        </template>

        <template #right-icon>
          <button
            class="text-orange-v-1"
            @click="onClickDetail(textSearch)"
          >
            {{ $t('Button.Search') }}
          </button>
        </template>
      </BaseInputText>
    </div>

    <InfinityList
      ref="subordinateMemberListRef"
      class="flex-1"
      @more-requested="doMoreRequested"
    >
      <template #item="{ item }">
        <SubordinateMemberItem
          :id="item.id"
          :balance="item.balance"
          :level="item.level"
          :username="item.username"
          :total-balance="item.directly"
          @click="onClickDetail(item.id)"
        />
      </template>
    </InfinityList>

    <div class="flex gap-2 py-10">
      <router-link
        v-toggle-active-state:green="Boolean(route.query.id)"
        :to="{ name: 'PageSubordinateMember', replace: true }"
        class="flex justify-center gap-2 items-center rounded-lg w-[18rem] py-3"
      >
        <BaseIcon name="arrow-left" />

        <p class="text-size-1 font-bold">
          {{ $t('PageUserProfile.BackToMyOwn') }}
        </p>
      </router-link>

      <router-link
        v-toggle-active-state="Boolean(parentId)"
        :to="{
          name: 'PageSubordinateMember',
          query: { id: parentId },
          replace: true
        }"
        class="flex justify-center gap-2 rounded-lg w-[18rem] py-3 font-bold"
      >
        <BaseIcon name="arrow-left" />
        <p class="text-size-1 font-bold">
          {{ $t('PageUserProfile.BackToUpperLevel') }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserCenterService from '@/services/user-center-service'
import { showToast } from '../utils/shared-methods'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const textSearch = ref('')
const totalBalance = ref('')
const totalSubordinate = ref('')
const subordinateMemberListRef = ref(null)
const parentId = ref(0)

watch(
  () => route.query.id,
  () => {
    subordinateMemberListRef.value.onRefresh()
  }
)

async function doMoreRequested(nextPage, finish) {
  try {
    const { data } = await UserCenterService.getMemberList({
      page: nextPage,
      id: route.query.id
    })
    if (!data.extra.id)
      return showToast({
        type: 'fail',
        message: t('PageSubordinateMember.IdNotExist')
      })

    totalBalance.value = data.extra.total_amount
    totalSubordinate.value = data.total
    parentId.value = data.extra.parent_id

    const list = data.items.map((item) => ({
      id: item.id,
      directly: item.directly,
      balance: item.balance,
      username: item.nickname,
      level: item.level
    }))

    finish(list, data.extra.total)
  } catch {}
}

function onClickDetail(id) {
  router.push({
    name: 'PageSubordinateMember',
    query: { id },
    replace: true
  })
}
</script>

<style scoped></style>
