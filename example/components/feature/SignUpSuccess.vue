<template>
  <div
    class="flex-1 flex flex-col gap-8 justify-center pt-32 pb-10 text-center"
  >
    <BaseIcon
      name="logo-with-text"
      class="place-self-center"
    />
    <p class="text-size-9 font-medium text-orange-v-1">
      {{ $t('PageSignUp.Congratulations') }}
    </p>
    <p class="text-size-4 flex-1">
      {{ $t('PageSignUp.SuccessfullyCreatedAccount') }}
    </p>
    <button
      class="bg-gradient-orange shadow-outer-orange rounded-[10px] py-2 px-14 font-bold text-size-5 text-center flex justify-around items-center place-self-center"
      @click="onClick"
    >
      {{ $t('Button.TapToStart') }}
      <BaseIcon
        name="arrow-right"
        class="absolute right-0 mr-3.5"
      />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores'

const router = useRouter()
const globalStore = useGlobalStore()

function onClick() {
  router.push({ name: 'PageHome' })
  globalStore.setAnnouncementModalVisibility(true)
}
</script>

<style scoped></style>
