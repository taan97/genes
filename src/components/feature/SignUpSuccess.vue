<template>
  <div class="flex-1 flex flex-col gap-8 items-center pt-16 pb-10 text-center">
    <BaseIcon name="logo" />

    <p class="text-size-9 text-orange-v-1">
      {{ $t('PageSignUp.Congratulations') }}
    </p>

    <p class="text-size-5 flex-1 whitespace-pre-line">
      {{ $t('PageSignUp.SuccessfullyCreatedAccount') }}
    </p>

    <button
      type="button"
      class="bg-black-1 rounded-full p-3 border-gradient-1 shadow-outer-orange-dark-1 flex items-center w-[248px] mx-auto"
      @click="onClick"
    >
      <span class="flex-1 text-orange-1 text-size-5 font-bold">
        {{ $t('PageSignUp.TapToStart') }}
      </span>
      <BaseIcon
        name="arrow-right"
        class="fill-white-1"
      />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onClick() {
  router.push({ name: 'PageHome' })
}
</script>

<style scoped></style>
