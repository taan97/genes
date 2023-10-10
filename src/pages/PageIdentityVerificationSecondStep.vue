<template>
  <BaseHeader
    :title="
      isTypeId
        ? $t('PageIdentityVerification.IdCardVerification')
        : $t('PageIdentityVerification.PassportVerification')
    "
    :back-option="{ name: 'PageIdentityVerificationFirstStep' }"
  />

  <BaseForm
    v-if="isTypeId"
    class="p-6 pb-10 grid grid-cols-2 gap-x-6 gap-y-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="form.firstName"
      name="firstName"
      :placeholder="$t('PageIdentityVerification.FirstName')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="name" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="form.lastName"
      name="lastName"
      :placeholder="$t('PageIdentityVerification.LastName')"
      :rules="['required']"
    />

    <BaseFormInputText
      v-model="form.idNumber"
      name="idNumber"
      container-class="col-span-full"
      :placeholder="$t('PageIdentityVerification.IdNumber')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="id-card" />
      </template>
    </BaseFormInputText>

    <fieldset class="col-span-full grid gap-4">
      <h3 class="text-size-4 font-bold">
        {{ $t('PageIdentityVerification.UploadYourIdCard') }}
      </h3>

      <ImageUploader
        id="FrontSideIdCard"
        v-model="form.frontDocument"
      >
        <template #add-button>
          <p class="flex gap-2">
            <BaseIcon
              name="camera"
              render-as-image
            />
            <span class="underline">{{
              $t('PageIdentityVerification.FrontSideIdCard')
            }}</span>
          </p>
        </template>
      </ImageUploader>

      <ImageUploader
        id="BackSideIdCard"
        v-model="form.backDocument"
      >
        <template #add-button>
          <p class="flex gap-2">
            <BaseIcon
              name="camera"
              render-as-image
            />
            <span class="underline">{{
              $t('PageIdentityVerification.BackSideIdCard')
            }}</span>
          </p>
        </template>
      </ImageUploader>
    </fieldset>

    <ul class="col-span-full flex flex-col gap-4">
      <p class="font-semibold text-size-5">
        {{ $t('PageIdentityVerification.IdAdditionalNotesTitle') }}
      </p>

      <li
        v-for="message in $tm(
          'PageIdentityVerification.IdAdditionalNotesContent'
        )"
        :key="message"
        class="list-disc ml-4"
      >
        {{ message }}
      </li>
    </ul>

    <button
      type="button"
      class="self-center rounded-full py-3 px-10 text-orange-1 text-center bg-white-1 shadow-outer-orange-dark-1 border-gradient-dark-1"
      @click="$router.go(-1)"
    >
      <span class="font-bold text-size-5">{{ $t('Button.Cancel') }}</span>
    </button>

    <button
      type="submit"
      class="self-center rounded-full py-3 px-10 text-orange-1 text-center bg-black-1 shadow-outer-orange-dark-1 border-gradient-1"
    >
      <span class="font-bold text-size-5">{{ $t('Button.Submit') }}</span>
    </button>
  </BaseForm>

  <BaseForm
    v-else
    class="p-6 pb-10 grid grid-cols-2 gap-x-6 gap-y-10"
    @submitted="doSubmitted"
  >
    <BaseFormInputText
      v-model="form.firstName"
      name="firstName"
      :placeholder="$t('PageIdentityVerification.FirstName')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="name" />
      </template>
    </BaseFormInputText>

    <BaseFormInputText
      v-model="form.lastName"
      name="lastName"
      :placeholder="$t('PageIdentityVerification.LastName')"
      :rules="['required']"
    />

    <BaseFormInputText
      v-model="form.idNumber"
      name="idNumber"
      container-class="col-span-full"
      :placeholder="$t('PageIdentityVerification.PassportNumber')"
      :rules="['required']"
    >
      <template #left-icon>
        <BaseIcon name="id-card" />
      </template>
    </BaseFormInputText>

    <fieldset class="col-span-full grid gap-4">
      <h3 class="text-size-4 font-bold">
        {{ $t('PageIdentityVerification.UploadYourPassport') }}
      </h3>

      <ImageUploader
        id="PassportInformationPage"
        v-model="form.frontDocument"
        @changed="(e) => (form.backDocument = e)"
      >
        <template #add-button>
          <p class="flex gap-2">
            <BaseIcon
              name="camera"
              render-as-image
            />
            <span class="underline">{{
              $t('PageIdentityVerification.PassportInformationPage')
            }}</span>
          </p>
        </template>
      </ImageUploader>
    </fieldset>

    <ul class="col-span-full flex flex-col gap-4">
      <p class="font-semibold text-size-5">
        {{ $t('PageIdentityVerification.PassportAdditionalNotesTitle') }}
      </p>

      <li
        v-for="message in $tm(
          'PageIdentityVerification.PassportAdditionalNotesContent'
        )"
        :key="message"
        class="list-disc ml-4"
      >
        {{ message }}
      </li>
    </ul>

    <button
      type="button"
      class="self-center rounded-full p-3 text-orange-1 text-center bg-white-1 shadow-outer-orange-dark-1 border-gradient-dark-1"
      @click="$router.go(-1)"
    >
      <span class="font-bold text-size-5">{{ $t('Button.Cancel') }}</span>
    </button>

    <button
      type="submit"
      class="self-center rounded-full p-3 text-orange-1 text-center bg-black-1 shadow-outer-orange-dark-1 border-gradient-1"
    >
      <span class="font-bold text-size-5">{{ $t('Button.Submit') }}</span>
    </button>
  </BaseForm>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { DOCUMENT_TYPE } from '@/utils/const.js'
import { computed, reactive } from 'vue'
import UserCenterService from '@/services/user-center-service'
import { useUserStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isTypeId = computed(() => Number(route.params.type) === DOCUMENT_TYPE.ID)

const form = reactive({
  firstName: '',
  lastName: '',
  idNumber: '',
  frontDocument: '',
  backDocument: ''
})

async function doSubmitted() {
  const requestBody = {
    country: route.params.country,
    type: Number(route.params.type),
    first_name: form.firstName,
    last_name: form.lastName,
    id_number: form.idNumber,
    front: form.frontDocument,
    reverse: form.backDocument,
    hand: form.frontDocument,
    review: true
  }

  try {
    await UserCenterService.verifyIdentity(requestBody)
    handleVerificationSubmitSuccess()
  } catch {}
}

async function handleVerificationSubmitSuccess() {
  await userStore.setUser({ replace: true })
  router.replace({ name: 'PageIdentityVerificationStatus' })
}
</script>

<style scoped></style>
