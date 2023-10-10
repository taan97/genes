<template>
  <BaseHeader />

  <div class="p-5 pt-0">
    <div
      class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 text-center px-2 py-2"
    >
      <h2 class="text-size-5 font-bold text-yellow-v-1 mb-2">
        {{ $t('PageManagementRank.Title') }}
      </h2>

      <BaseIcon
        v-for="index in maxLevel"
        :key="index"
        class="inline-block mx-1.5"
        name="star"
        width="14"
        height="14"
        :fill="
          userManagementRankInfo.level >= index
            ? 'var(--root-yellow-v-1)'
            : 'var(--root-grey-v-3)'
        "
      />

      <div class="flex flex-col items-center my-4">
        <p class="flex items-center">
          <span class="text-size-3 font-bold mr-2">
            {{ $t('PageManagementRank.YourNextLevel') }}
          </span>

          <span class="text-size-3 text-yellow-v-1 font-bold mr-2">
            {{ userManagementRankInfo.nextLevel }}
          </span>

          <BaseIcon
            name="star"
            width="14"
            height="14"
            class="inline-block"
            fill="var(--root-yellow-v-1)"
          />
        </p>
      </div>

      <p class="mb-2">
        <span class="text-yellow-v-1 font-bold">
          {{ $t('PageManagementRank.TeamPerformance') }}:
        </span>

        <span class="font-bold">
          USD
          {{ $formatCurrency(userManagementRankInfo.teamPerformanceAmount) }}
        </span>
      </p>
    </div>

    <div class="shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 p-4 mt-7">
      <table class="w-full text-center text-size-1">
        <thead>
          <tr class="border-b-[0.5px] border-black-v-6">
            <th class="w-min whitespace-nowrap font-bold text-yellow-v-2 p-1">
              {{ $t('PageManagementRank.Rank') }}
            </th>

            <th class="font-bold text-yellow-v-2 w-24 p-1">
              {{ $t('PageManagementRank.Rebate') }}
            </th>

            <th class="font-bold text-yellow-v-2 w-24 p-1">
              {{ $t('PageManagementRank.AchievementRewards') }}
            </th>

            <th class="font-bold text-yellow-v-2 p-1">
              {{ $t('PageManagementRank.Requirements') }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in rewardList"
            :key="index"
            class="border-b-[0.5px] border-black-v-6"
          >
            <td>
              <span class="text-yellow-v-1 font-bold mr-1"
                >{{ index + 1 }}
              </span>

              <BaseIcon
                name="star"
                width="13"
                height="13"
                class="inline-block"
                fill="var(--root-yellow-v-1)"
              />
            </td>

            <td>{{ item.rewardRank }}</td>

            <td>{{ item.achievementRewards }}</td>

            <td class="whitespace-pre-line">
              <div
                v-if="index === 0"
                class="py-2"
              >
                {{ $t('PageManagementRank.Rank1Requirement') }}
              </div>

              <i18n-t
                v-else
                keypath="PageManagementRank.RankNRequirement"
                tag="div"
                scope="global"
                class="py-2"
              >
                <template #requirement>
                  <span class="text-yellow-v-1 font-bold mr-1"
                    >{{ index }}
                  </span>

                  <BaseIcon
                    name="star"
                    width="13"
                    height="13"
                    class="inline-block fill-yellow-v-1"
                  />
                </template>
              </i18n-t>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="text-size-1 mx-11 mt-3.5 text-center">
      {{ $t('PageManagementRank.Note') }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import UserCenterService from '@/services/user-center-service.js'

const MAX_LEVEL = 9
const maxLevel = ref(MAX_LEVEL)

const rewardList = ref([
  {
    rewardRank: '3%',
    achievementRewards: '0%'
  },
  {
    rewardRank: '6%',
    achievementRewards: '0%'
  },
  {
    rewardRank: '9%',
    achievementRewards: '2%'
  },
  {
    rewardRank: '12%',
    achievementRewards: '3%'
  },
  {
    rewardRank: '15%',
    achievementRewards: '4%'
  },
  {
    rewardRank: '18%',
    achievementRewards: '5%'
  },
  {
    rewardRank: '22%',
    achievementRewards: '6%'
  },
  {
    rewardRank: '26%',
    achievementRewards: '7%'
  },
  {
    rewardRank: '30%',
    achievementRewards: '8%'
  }
])

const userManagementRankInfo = ref({
  level: 0,
  nextLevel: 1,
  teamPerformanceAmount: ''
})

getUserManagementRankInfo()

async function getUserManagementRankInfo() {
  try {
    const { data } = await UserCenterService.getUserManagementRankInfo()
    userManagementRankInfo.value = {
      level: data.level,
      nextLevel: data.next_level,
      teamPerformanceAmount: data.team
    }
  } catch {}
}
</script>

<style scoped></style>
