<template>
  <BaseActionSheet
    v-model:show="isVisible"
    :title="$t('PageOtc.AppealFormTitle')"
    title-class="text-orange-1 text-size-6"
  >
    <template #content>
      <BaseForm
        ref="formRef"
        class="px-6 pb-6"
        @submitted="emit('submitted', appealForm)"
      >
        <BaseFormInputText
          ref="reasonRef"
          v-model="appealForm.reason"
          name="reason"
          rows="3"
          type="textarea"
          maxlength="30"
          show-word-limit
          class="mt-4 !text-black-1 rounded-xl border-2 !border-orange-3"
          :placeholder="$t('PageOtc.AppealFormPlaceholder')"
          :rules="['required']"
          light-theme
        />

        <fieldset class="flex flex-col gap-2 mt-8 relative">
          <p class="text-white-1 text-size-5">{{ $t('PageOtc.Screenshot') }}</p>

          <ImageUploader
            id="OtcAppealForm"
            v-model="appealForm.proof"
          >
            <template #add-button>
              <p class="flex gap-2 items-center">
                <BaseIcon
                  name="camera"
                  class="text-orange-1"
                />
                <span class="underline text-white-1">{{
                  $t('PageOtc.AddPhoto')
                }}</span>
              </p>
            </template>
          </ImageUploader>

          <BaseFormInputText
            v-model="appealForm.proof"
            name="proof"
            :rules="['required']"
            class="!hidden"
            container-class="absolute bottom-14"
          />
        </fieldset>

        <fieldset class="grid grid-flow-col gap-4 mt-6">
          <button
            type="button"
            class="border-gradient-1 rounded-full text-orange-1 text-size-5 p-3"
            style="--bg-color: var(--root-black-2)"
            @click="isVisible = false"
          >
            {{ $t('PageOtc.ButtonCancel') }}
          </button>
          <button
            type="submit"
            class="border-gradient-1 rounded-full text-white-1 text-size-5 p-3"
            style="--bg-color: var(--root-black-2)"
          >
            {{ $t('PageOtc.ButtonConfirm') }}
          </button>
        </fieldset>
      </BaseForm>
    </template>
  </BaseActionSheet>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'submitted'])

const formRef = ref(null)
const reasonRef = ref(null)

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

const appealForm = reactive({
  reason: '',
  proof: ''
})

watch(isVisible, async () => {
  await nextTick()
  formRef.value.reset()
  reasonRef.value.$el.querySelector('textarea').focus()
})
</script>

<style scoped></style>
