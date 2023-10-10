<template>
  <BaseActionSheet
    v-model:show="isVisible"
    :title="$t('PageOtc.AppealFormTitle')"
    title-class="text-orange-v-1 text-size-6"
  >
    <template #content>
      <BaseInputText
        ref="reasonRef"
        v-model="appealForm.reason"
        rows="3"
        type="textarea"
        maxlength="30"
        show-word-limit
        class="mt-4"
        :placeholder="$t('PageOtc.AppealFormPlaceholder')"
        :rules="['required']"
      />

      <ImageUploader
        id="OtcAppealForm"
        ref="imageUploaderRef"
        class="mt-8"
        container-class="bg-gradient-dark !h-[88px] w-[88px] rounded-[10px]"
        @changed="(e) => (appealForm.proof = e)"
      >
        <template #add-button>
          <BaseIcon
            name="camera"
            render-as-image
          />
        </template>
      </ImageUploader>

      <div class="grid grid-flow-col gap-4 mt-10">
        <button
          class="bg-gradient-orange shadow-outer-orange-v-1 rounded-[10px] p-2 font-bold text-size-5 text-white-v-1 text-center"
          @click="isVisible = false"
        >
          {{ $t('PageOtc.ButtonCancel') }}
        </button>
        <button
          class="bg-gradient-orange shadow-outer-orange-v-1 rounded-[10px] p-2 font-bold text-size-5 text-white-v-1 text-center"
          @click="emit('submitted', appealForm)"
        >
          {{ $t('PageOtc.ButtonConfirm') }}
        </button>
      </div>
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

const reasonRef = ref(null)
const imageUploaderRef = ref(null)

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
  clearAppealFormState()
  reasonRef.value.$el.querySelector('textarea').focus()
})

function clearAppealFormState() {
  appealForm.reason = ''
  appealForm.proof = ''
  imageUploaderRef.value.clearImage()
  reasonRef.value.clearValidation()
  reasonRef.value.markAsUnTouched()
}
</script>

<style scoped></style>
