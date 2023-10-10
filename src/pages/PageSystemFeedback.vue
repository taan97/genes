<template>
  <BaseHeader
    :title="$t('PageSystemFeedback.Title')"
    :fallback-back-option="{ name: 'PageHelpFeedback' }"
  />

  <BaseForm
    ref="supportFormRef"
    class="flex-1 flex flex-col gap-7 my-6 px-5"
    @submitted="isVisible = true"
  >
    <BaseFormInputText
      v-model="supportForm.username"
      name="username"
      :placeholder="$t('PageSystemFeedback.YourName')"
      :rules="supportFormRules.username"
    >
      <template #left-icon>
        <BaseIcon name="name-card" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="supportForm.email"
      name="email"
      :placeholder="$t('PageSystemFeedback.Email')"
      :rules="supportFormRules.email"
    >
      <template #left-icon>
        <BaseIcon
          name="email"
          width="13"
          height="11"
        />
      </template>
    </BaseFormInputText>

    <fieldset class="flex gap-4">
      <BaseFormInputText
        v-model="supportForm.countryCode"
        readonly
        :formatter="(v) => `+${v}`"
        class="!w-[95px]"
        container-class="!w-min"
        @click="isCountryDropdownVisible = true"
      >
        <template #left-icon>
          <BaseIcon name="mobile" />
        </template>
        <template #right-icon>
          <BaseIcon
            name="arrow-down"
            width="14"
            class="fill-black-1"
          />
        </template>
      </BaseFormInputText>

      <BaseFormInputText
        v-model="supportForm.phoneNumber"
        name="phoneNumber"
        :placeholder="$t('PageSystemFeedback.MobilePhoneNumber')"
        :rules="supportFormRules.phoneNumber"
      />
    </fieldset>

    <BaseFormInputText
      v-model="supportForm.problem"
      name="problem"
      :rules="supportFormRules.problem"
      rows="5"
      autosize
      type="textarea"
      maxlength="200"
      :placeholder="$t('PageSystemFeedback.ProblemDescription')"
      show-word-limit
      class="!text-black-1 rounded-xl border-2 border-black-1"
    />

    <div class="flex flex-col gap-4">
      <p>{{ $t('PageSystemFeedback.Screenshot') }}</p>

      <ImageUploader
        id="PageSupport"
        v-model="supportForm.proof"
      >
        <template #add-button>
          <p class="flex gap-2">
            <BaseIcon
              name="camera"
              render-as-image
            />
            <span class="underline">{{
              $t('PageSystemFeedback.AddAPhoto')
            }}</span>
          </p>
        </template>
      </ImageUploader>
    </div>

    <div class="flex-1" />

    <button
      type="submit"
      class="relative rounded-full w-full bg-black-1 p-3 border-gradient-1 shadow-outer-orange-dark-1"
    >
      <div class="text-orange-1 text-size-5 font-bold">
        {{ $t('Button.Submit') }}
      </div>
      <BaseIcon
        name="submit"
        class="absolute top-0 bottom-0 my-auto"
      />
    </button>
  </BaseForm>

  <OnlineHelpDesk>
    <template #button>
      <p class="text-center py-3">
        {{ $t('PageSystemFeedback.OrYouCan') }}
        <span class="underline font-bold">{{
          $t('PageSystemFeedback.ChatNow')
        }}</span>
      </p>
    </template>
  </OnlineHelpDesk>

  <DropdownPhoneCodeSelector
    v-model:show="isCountryDropdownVisible"
    @selected="(e) => (supportForm.countryCode = e)"
  />

  <RatingActionsheet
    v-model:rate="supportForm.rate"
    v-model:is-visible="isVisible"
    @submitted="doSubmitSupportForm"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import UserService from '@/services/user-service'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCountryDropdownVisible = ref(false)
const isVisible = ref(false)

const supportForm = reactive({
  proof: '',
  username: '',
  email: '',
  phoneNumber: '',
  countryCode: '',
  problem: '',
  rate: 0
})

const supportFormRules = ref({
  username: ['required'],
  email: ['required', 'email'],
  phoneNumber: ['required'],
  problem: ['required']
})

async function doSubmitSupportForm() {
  try {
    await UserService.sendFeedback(supportForm)

    router.go(-1, { name: 'PageHelpFeedback' })
  } catch {}
}
</script>

<style scoped></style>
