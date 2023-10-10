<template>
  <BaseHeader
    :title="$t('PagePersonalDetails.Title')"
    class="!bg-none !bg-black-1 text-white-1"
  >
    <template #sub-header>
      <ProfilePhoto show-upload />
    </template>
  </BaseHeader>

  <div
    class="grid grid-cols-[auto_auto_1fr] gap-x-1 gap-y-4 bg-black-opacity-1 w-full p-5"
  >
    <p class="text-white-1">{{ $t('PagePersonalDetails.FullName') }}</p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1 break-all">{{ userStore.real_name }}</p>

    <p class="text-white-1">{{ $t('PagePersonalDetails.Email') }}</p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1 break-all">{{ userStore.email }}</p>

    <p class="text-white-1">{{ $t('PagePersonalDetails.MobileNumber') }}</p>
    <p class="text-orange-1">:</p>
    <p class="text-orange-1 break-all">{{ userStore.phone }}</p>

    <p class="text-white-1">{{ $t('PagePersonalDetails.Uid') }}</p>
    <p class="text-orange-1">:</p>
    <p class="flex gap-2 items-center text-orange-1 break-all">
      {{ userStore.id }}
      <button
        type="button"
        @click="onClickCopy(userStore.id)"
      >
        <BaseIcon
          name="copy-small"
          fill="var(--root-white-1)"
        />
      </button>
    </p>

    <p class="text-white-1">{{ $t('PagePersonalDetails.Nickname') }}</p>
    <p class="text-orange-1">:</p>
    <BaseFormInputText
      v-if="isEdit"
      v-model="nickname"
      light-theme
      container-class="nickname"
    >
      <template #right-icon>
        <button
          type="button"
          @click="onClickCancel"
        >
          <BaseIcon name="close-thin" />
        </button>

        <button
          type="button"
          @click="onClickUpdateName"
        >
          <BaseIcon
            name="checkmark"
            class="fill-green-2"
          />
        </button>
      </template>
    </BaseFormInputText>
    <p
      v-else
      class="flex gap-2 items-center text-orange-1 break-all"
    >
      {{ userStore.nickname }}
      <button
        type="button"
        @click="isEdit = true"
      >
        <BaseIcon name="edit" />
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import UserService from '@/services/user-service.js'
import { copyText as onClickCopy } from '@/utils/shared-methods.js'

const userStore = useUserStore()
const isEdit = ref(false)
const nickname = ref(userStore.nickname)

async function onClickUpdateName() {
  try {
    await UserService.changeNickname(nickname.value)
    await userStore.setUser({ replace: true })
    isEdit.value = false
  } catch {}
}

function onClickCancel() {
  nickname.value = userStore.nickname
  isEdit.value = false
}
</script>

<style scoped>
:deep(.nickname) {
  position: relative;
}
:deep(.van-cell.van-field.custom-input) {
  position: absolute;
  top: -0.5rem;
}
</style>
