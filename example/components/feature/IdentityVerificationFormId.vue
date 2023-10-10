<template>
  <div class="grid grid-cols-2 gap-x-6 gap-y-10 mb-6">
    <BaseInputText
      v-model="form.firstName"
      :placeholder="$t('PageIdentityVerification.FirstName')"
      :rules="['required']"
    />
    <BaseInputText
      v-model="form.lastName"
      :placeholder="$t('PageIdentityVerification.LastName')"
      :rules="['required']"
    />
    <BaseInputText
      v-model="form.idNumber"
      class="col-span-full"
      :placeholder="$t('PageIdentityVerification.IdNumber')"
      :rules="['required']"
    />

    <div class="col-span-full justify-self-center grid gap-2 w-min">
      <h3 class="text-size-4 font-bold">
        {{ $t('PageIdentityVerification.UploadYourIdCard') }}
      </h3>

      <p class="mt-4">{{ $t('PageIdentityVerification.FrontSideIdCard') }}</p>
      <ImageUploader
        id="PageIdVerificationFormIdFront"
        class="w-[251px]"
        icon="frontid"
        @changed="(e) => (form.frontDocument = e)"
      />

      <p class="mt-4">{{ $t('PageIdentityVerification.BackSideIdCard') }}</p>
      <ImageUploader
        id="PageIdVerificationFormIdBack"
        class="w-[251px]"
        icon="backid"
        @changed="(e) => (form.backDocument = e)"
      />

      <p class="mt-4">{{ $t('PageIdentityVerification.HandheldDocument') }}</p>
      <ImageUploader
        id="PageIdVerificationFormIdHandHeld"
        class="w-[251px]"
        icon="handhelddoc"
        @changed="(e) => (form.handHeldDocument = e)"
      />
    </div>

    <i18n-t
      class="col-span-full"
      keypath="PageIdentityVerification.IdAdditionalNotes"
      tag="p"
      scope="global"
    >
      <template #br>
        <br />
      </template>
    </i18n-t>

    <button
      class="w-full rounded-[8px] py-3 px-4 bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1 mx-auto block"
      @click="router.go(-1)"
    >
      <BaseIcon
        name="arrow-left"
        class="absolute fill-white-v-1 left-4 my-auto top-0 bottom-0"
      />
      <div class="text-size-5 font-bold">{{ $t('Button.Back') }}</div>
    </button>

    <button
      class="w-full rounded-[8px] py-3 px-4 text-white-v-1 mx-auto block"
      :class="nextButtonStyle"
      @click="emit('submitted', form)"
    >
      <div class="text-size-5 font-bold">{{ $t('Button.Next') }}</div>
      <BaseIcon
        name="arrow-right"
        class="absolute right-4 my-auto top-0 bottom-0"
        :class="[isReadyToGoNext ? 'fill-white-v-1' : 'fill-grey-v-1']"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  idNumber: '',
  frontDocument: '',
  backDocument: '',
  handHeldDocument: ''
})

const emit = defineEmits(['submitted'])

const isReadyToGoNext = computed(() =>
  Object.values(form).every((v) => Boolean(v))
)

const nextButtonStyle = computed(() =>
  isReadyToGoNext.value
    ? 'bg-gradient-orange shadow-outer-orange-v-1 text-white-v-1'
    : 'bg-gradient-dark shadow-outer-dark-v-2 text-grey-v-1 pointer-events-none'
)
</script>

<style scoped></style>
