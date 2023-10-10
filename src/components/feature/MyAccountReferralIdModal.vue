<template>
  <BaseModal
    v-model:show="isVisible"
    class="h-80"
    hide-close-icon
  >
    <template #header>
      <div class="items-center flex flex-col gap-y-2 py-5">
        <BaseIcon name="referral-unvail" />
        <h1 class="text-white-1 text-size-6">
          {{ $t('PageMyAccountPurchaseViaUsdt.ReferralUnavailable') }}
        </h1>
        <p class="text-white-1">
          {{ $t('PageMyAccountPurchaseViaUsdt.InputReferralId') }}
        </p>

        <BaseForm
          class="w-full"
          @submitted="doSubmitted"
        >
          <BaseFormInputText
            v-model="referralId"
            name="referralId"
            type="digit"
            :placeholder="$t('PageMyAccountPurchaseViaUsdt.ReferralId')"
            :rules="['required']"
            light-theme
          >
            <template #left-icon>
              <BaseIcon
                name="referral"
                width="13"
                height="13"
                class="fill-orange-1"
              />
              <p
                v-if="referralId"
                class="text-white-1 ml-3 !mr-0"
              >
                GR
              </p>
            </template>
          </BaseFormInputText>

          <fieldset class="flex gap-2 flex-col-2 pt-20">
            <button
              type="button"
              class="w-full self-center rounded-full py-2 text-orange-1 text-center bg-white-1 border-gradient-dark-1"
              @click="isVisible = false"
            >
              <span class="font-bold text-size-5">{{
                $t('Button.Cancel')
              }}</span>
            </button>

            <button
              type="submit"
              class="w-full self-center rounded-full py-2 text-orange-1 text-center bg-black-1 border-gradient-1"
            >
              <span class="font-bold text-size-5">{{
                $t('Button.Submit')
              }}</span>
            </button>
          </fieldset>
        </BaseForm>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:show', 'submitted'])

const referralId = ref('')

const isVisible = computed({
  get: () => props.show,
  set: (newValue) => emit('update:show', newValue)
})

function doSubmitted() {
  emit('submitted', referralId)
  isVisible.value = false
}
</script>

<style scoped></style>
