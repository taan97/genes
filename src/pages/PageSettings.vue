<template>
  <BaseHeader :title="$t('PageSettings.Title')" />

  <div class="p-5 flex flex-col gap-4">
    <router-link
      :to="{ name: 'PageSettingsChangeLoginPassword' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="change-login-password"
        width="20"
        height="21"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.ChangeLoginPassword') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageSettingsChangeTransactionPassword' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="change-transaction-password"
        width="20"
        height="21"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.ChangeTransactionsPassword') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageResetSecurityQuestion' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="security-reset-question"
        width="20"
        height="21"
        render-as-image
        class="absolute"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.ResetSecurityQuestion') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <router-link
      :to="{ name: 'PageSetAlert' }"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="alert"
        class="absolute"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.SetAlert') }}
      </p>

      <BaseIcon
        class="inline fill-orange-1"
        name="dropdown"
      />
    </router-link>

    <button
      type="button"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      @click="languageSelectorRef.showSelectLanguageModal = true"
    >
      <BaseIcon
        name="language"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.Languages') }}
      </p>
    </button>

    <button
      type="button"
      class="flex justify-between items-center rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
      @click="onClickLogout"
    >
      <BaseIcon
        name="logout"
        class="absolute fill-orange-1"
      />

      <p class="font-bold ml-8 text-start">
        {{ $t('PageSettings.Logout') }}
      </p>
    </button>
  </div>

  <LanguageSelector
    ref="languageSelectorRef"
    class="px-3 py-4 w-min ml-auto flex gap-2"
    hide-select-button
  />
</template>

<script setup>
import { ref } from 'vue'
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'
import AuthService from '@/services/auth-service'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const languageSelectorRef = ref(null)

async function onClickLogout() {
  const Modal = useConfirmModal()

  try {
    await Modal.open({
      message: 'PageSettings.LogoutConfirmMessage',
      headerIcon: 'logout-big',
      confirmText: 'Button.Logout'
    })

    handleSignOut()
  } catch {}
}

async function handleSignOut() {
  try {
    await AuthService.signOut()
    userStore.handleSignOut()
  } catch {}
}
</script>

<style scoped></style>
