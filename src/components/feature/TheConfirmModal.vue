<template>
  <BaseActionSheet
    v-model:show="isVisible"
    @cancelled="handlers.cancel"
  >
    <template #header>
      <BaseIcon
        v-if="options.headerIcon"
        :name="options.headerIcon"
      />
    </template>
    <template #content>
      <div class="px-5 pt-4 pb-8 flex-1 flex flex-col gap-3 text-center">
        <h3 class="text-size-8 text-center text-orange-1 font-bold">
          {{ $t(options.title) }}
        </h3>

        <div
          v-if="isMessageHtml"
          class="flex-1 text-start text-white-1 text-size-5 whitespace-pre-line"
          v-html="options.message"
        />

        <p
          v-else
          class="flex-1 text-white-1 text-size-5 whitespace-pre-line"
        >
          {{ $t(options.message) }}
        </p>

        <div class="flex gap-4 mt-4">
          <button
            v-if="!options.hideCancelButton"
            type="button"
            class="flex-1 border-gradient-1 rounded-full text-orange-1 text-size-5 p-3"
            :class="options.cancelClass"
            style="--bg-color: var(--root-black-2)"
            @click="handlers.cancel"
          >
            {{ $t(options.cancelText) }}
          </button>
          <button
            type="button"
            class="flex-1 border-gradient-1 rounded-full text-white-1 text-size-5 p-3"
            :class="options.confirmClass"
            style="--bg-color: var(--root-black-2)"
            @click="handlers.confirm"
          >
            {{ $t(options.confirmText) }}
          </button>
        </div>
      </div>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { computed } from 'vue'
import { useConfirmModalRoot } from '@/utils/composables/use-confirm-modal.js'

const { isVisible, options, handlers } = useConfirmModalRoot()

const isMessageHtml = computed(() => {
  return /<[a-z][\s\S]*>/i.test(options.value.message)
})
</script>

<style scoped></style>
