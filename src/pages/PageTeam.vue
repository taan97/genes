<template>
  <MainHeader :title="$t('PageTeam.MyTeam')">
    <BaseTab
      v-model:active="currentTab"
      teleport-content="tab-content"
      @changed="doChanged"
    >
      <template #fixed>
        <MyTeamCommissionBox
          :elite-detail="myInfo"
          :tab-name="tabName[currentTab]"
          :commission-income="income[currentTab]"
          @searched-id="doSearchedId"
        />
      </template>

      <BaseTabItem
        :title="$t('PageTeam.DevelopmentCommission')"
        title-class="whitespace-pre-line"
        value="0"
      >
        <MyTeamDevelopment
          :subordinate-list="list[currentTab].teamCommission"
          :development-bond="reward[currentTab]"
          @searched-id="doSearchedId"
        >
          <BaseBreadcrumb
            :paths="breadcrumb"
            @searched-id="doSearchedId"
          />
        </MyTeamDevelopment>
      </BaseTabItem>

      <BaseTabItem
        :title="$t('PageTeam.EliteCommission')"
        title-class="whitespace-pre-line"
        value="1"
      >
        <MyTeamElite
          :subordinate-list="list[currentTab].teamCommission"
          :elite-bond="reward[currentTab]"
          @searched-id="doSearchedId"
        >
          <BaseBreadcrumb
            :paths="breadcrumb"
            @searched-id="doSearchedId"
          />
        </MyTeamElite>
      </BaseTabItem>

      <BaseTabItem
        :title="$t('PageTeam.PlacementCommission')"
        title-class="whitespace-pre-line"
        value="2"
      >
        <MyTeamPlacement
          :placement-list="list[currentTab].teamCommission"
          :placement-bond="reward[currentTab]"
          @searched-id="doSearchedId"
        >
          <BaseBreadcrumb
            :paths="breadcrumb"
            @searched-id="doSearchedId"
          />
        </MyTeamPlacement>
      </BaseTabItem>
    </BaseTab>
  </MainHeader>

  <div
    id="tab-content"
    class="pb-5"
  />
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import TeamService from '@/services/team-service.js'
import { useUserStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()

const myInfo = ref({})
const currentTab = ref('0')
const breadcrumb = ref([])
const income = ref({})
const reward = ref({})

const { t } = useI18n()

const tabName = [
  'PageTeam.TotalDevelopmentCommission',
  'PageTeam.TotalEliteCommission',
  'PageTeam.TotalPlacementCommission'
]

const list = reactive({
  0: {
    searchText: '',
    handler: getTeamList,
    teamCommission: []
  },
  1: {
    searchText: '',
    handler: getTeamList,
    teamCommission: []
  },
  2: {
    searchText: '',
    handler: getPlacementTeam,
    teamCommission: []
  }
})

watch(
  () => list[currentTab.value].searchText,
  async (newValue) => {
    const data = await list[currentTab.value].handler(newValue)

    list[currentTab.value].teamCommission = data

    breadcrumb.value =
      data.extra?.path.map((item) => ({
        label: userStore.id === item ? t('PageTeam.Me') : item,
        value: item
      })) || []
  }
)

init()

async function doChanged() {
  list[currentTab.value].teamCommission = await list[currentTab.value].handler(
    list[currentTab.value].searchText
  )
}

async function init() {
  setMyTeam()

  list[currentTab.value].teamCommission = await list[currentTab.value].handler()
}

async function setMyTeam() {
  try {
    const { data } = await TeamService.getMyTeam()

    myInfo.value = {
      uid: data.uid,
      real_name: data.real_name,
      area_child: data.area_child,
      area_child_balance: data.area_child_balance,
      area_team: data.area_team,
      balance: data.balance,
      develop: data.develop,
      level: data.level,
      elite: data.elite,
      equity: data.equity,
      income: data.income,
      pimt: data.pimt,
      level_at: data.level_at
    }

    income.value = {
      0: data.algebra_income,
      1: data.team_income,
      2: data.area_income
    }

    reward.value = {
      0: data.algebra_reward,
      1: data.team_reward,
      2: data.area_reward
    }
  } catch {}
}

async function getTeamList(uid) {
  try {
    const { data } = await TeamService.getTeamList(uid)
    return data
  } catch {
    return {}
  }
}

async function getPlacementTeam(uid) {
  try {
    const { data } = await TeamService.getPlacementTeam(uid)
    return {
      parents: data.extra.user,
      childs: data.items,
      extra: data.extra
    }
  } catch {
    return {}
  }
}

function doSearchedId(value) {
  list[currentTab.value].searchText = value
}
</script>

<style scoped></style>
