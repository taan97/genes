<template>
  <BaseHeader :title="$t('PageRedeem.Title')" />

  <div class="p-5 pt-0">
    <div class="flex justify-end items-center">
      <span class="text-size-1">{{ $t('PageInvestmentInvest.Records') }}</span>

      <BaseIcon
        name="record-circle"
        render-as-image
        @click="router.push({ name: 'PageRewardClaimRecord' })"
      />
    </div>

    <h1 class="text-size-5 mt-4 mb-1">{{ $t('PageRedeem.FormTitle') }}</h1>
    <p class="text-orange-v-1">{{ $t('PageRedeem.MemberInformation') }}</p>

    <BaseForm
      ref="redeemFormRef"
      class="flex-1 flex flex-col gap-7 my-6"
      @submitted="onSubmitRedeem"
    >
      <BaseInputText
        v-model="pickingForm.reward"
        name="reward"
        readonly
        class="!bg-black-v-3"
        :placeholder="$t('PageRedeem.SelectYourReward')"
        :rules="pickingFormRules.reward"
        @click="showSelectReward = !showSelectReward"
      >
        <template #right-icon>
          <BaseIcon
            name="arrow-down"
            width="16"
            height="16"
          ></BaseIcon>
        </template>
      </BaseInputText>

      <BaseInputText
        v-model="pickingForm.username"
        name="username"
        :placeholder="$t('PageRedeem.FieldReceiverUsername')"
        :rules="pickingFormRules.username"
      >
        <template #left-icon>
          <BaseIcon name="user" />
        </template>
      </BaseInputText>

      <BaseInputText
        v-model="pickingForm.phoneNumber"
        name="phoneNumber"
        :placeholder="$t('PageRedeem.FieldReceiverPhoneNumber')"
        :rules="pickingFormRules.phoneNumber"
      >
        <template #left-icon>
          <button
            type="button"
            class="min-w-[54px] px-2 flex justify-around items-center rounded-md bg-black-v-3"
            @click="isPickingCountryDropdownVisible = true"
          >
            <span class="text-white-v-1">+ {{ pickingForm.countryCode }}</span>
            <BaseIcon
              name="arrow-down"
              width="14"
            />
          </button>
        </template>
      </BaseInputText>

      <BaseInputText
        v-model="pickingForm.receiverAddress"
        name="receiverAddress"
        rows="3"
        type="textarea"
        :placeholder="$t('PageRedeem.FieldReceiverAddress')"
        :rules="pickingFormRules.receiverAddress"
      />

      <BaseInputText
        v-model="pickingForm.email"
        name="email"
        :placeholder="$t('PageRedeem.FieldEmail')"
        :rules="pickingFormRules.email"
      >
        <template #left-icon>
          <BaseIcon
            name="email"
            render-as-image
          />
        </template>
      </BaseInputText>

      <button
        v-toggle-active-state:red="redeemFormRef?.getValidationStatus"
        type="submit"
        class="mt-auto self-center rounded-lg w-[18rem] py-2 px-4"
      >
        <div class="text-size-5 font-bold">{{ $t('Button.AcceptAward') }}</div>
      </button>
    </BaseForm>
  </div>

  <DropdownPhoneCodeSelector
    v-model:show="isPickingCountryDropdownVisible"
    @selected="(e) => (pickingForm.countryCode = e)"
  />

  <BaseDropdownDrawer
    v-model:show="showSelectReward"
    v-model:value="pickingForm.reward"
    :title="$t('PageRedeem.ChooseReward')"
    :options="rewardList"
    @closed="doClosedReward"
  />
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import UserCenterService from '@/services/user-center-service'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()

const isPickingCountryDropdownVisible = ref(false)
const showSelectReward = ref(false)
const rewardList = ref([])

const pickingForm = reactive({
  reward: '',
  username: '',
  phoneNumber: '',
  countryCode: '',
  receiverAddress: '',
  email: ''
})

const pickingFormRules = {
  reward: ['required'],
  username: ['required'],
  phoneNumber: ['required'],
  receiverAddress: ['required'],
  email: ['email']
}

const redeemFormRef = ref(null)

setRewardList()

async function doClosedReward() {
  await nextTick()
  redeemFormRef.value.formInputs.reward.forceValidate()
}

async function setRewardList() {
  try {
    const { data } = await UserCenterService.getRewardOption()
    rewardList.value = data.items.map((item) => ({
      label: item,
      value: item
    }))
  } catch {}
}

async function onSubmitRedeem() {
  const data = {
    reward_name: pickingForm.reward,
    receiver_name: pickingForm.username,
    receiver_phone: pickingForm.phoneNumber,
    receiver_address: pickingForm.receiverAddress,
    email: pickingForm.email
  }

  try {
    await UserCenterService.redeemReward(data)

    handleRedeemRewardSuccess()
  } catch {}
}

async function handleRedeemRewardSuccess() {
  router.replace({ name: 'PageRewardClaimRecord' })
  await userStore.setUser({ replace: true })
}
</script>

<style scoped></style>
