<template>
  <BaseModal
    v-model:show="isVisible"
    class="!overflow-visible !w-[280px]"
    @cancelled="handlers.cancel"
  >
    <template #header>
      <BaseIcon
        v-if="options.headerIcon"
        render-as-image
        :name="options.headerIcon"
        class="absolute -top-[30px] left-0 right-0 mx-auto"
        width="60"
        height="60"
      />
    </template>

    <template #body>
      <div class="px-6 flex flex-col gap-4 pb-6">
        <h2 class="text-size-7 text-orange-v-1 font-bold">
          {{ options.title }}
        </h2>
        <p>
          {{ options.message }}
        </p>
        <button
          type="submit"
          class="self-center rounded-xl min-w-[12rem] py-3 px-4 mt-6 text-white-v-1"
          :class="options.buttonClass"
          @click="handlers.confirm"
        >
          <div class="text-size-5 font-bold">{{ options.buttonText }}</div>
          <BaseIcon
            v-if="options.confirmIcon"
            :name="options.confirmIcon"
            fill="var(--root-white-v-1)"
            class="absolute top-0 bottom-0 my-auto"
          />
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { useConfirmModal } from '@/utils/composables/use-confirm-modal.js'

const { isVisible, options, handlers } = useConfirmModal()
</script>

<style scoped></style>
