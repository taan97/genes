<template>
  <BaseHeader
    :title="$t('PageSetAlert.Title')"
    class="!bg-none !bg-black-2 text-white-1 pb-20 pt-8"
  />

  <BaseForm
    class="flex-1 flex flex-col gap-y-5 mx-8 my-10"
    @submitted="onSubmitAlert"
  >
    <fieldset>
      <p class="text-white-1">{{ $t('PageSetAlert.Content') }}</p>
      <BaseFormInputText
        v-model="alertForm.number"
        name="number"
        type="number"
      />
    </fieldset>

    <div class="flex-1" />

    <button
      type="submit"
      class="items-end rounded-full py-3 px-4 text-orange-1 border-gradient-1 text-center shadow-outer-orange-dark-1"
    >
      <BaseIcon
        name="alert"
        class="absolute fill-orange-1"
      />
      <span class="font-bold text-size-5">{{ $t('Button.CreateAlert') }}</span>
    </button>
  </BaseForm>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import UserService from '@/services/user-service.js'

const router = useRouter()
const userStore = useUserStore()

const alertForm = reactive({
  number: userStore.alert
})

async function onSubmitAlert() {
  try {
    await UserService.setAlert(alertForm.number)

    userStore.setUser({ replace: true })

    router.go(-1)
  } catch {}
}
</script>

<style scoped></style>
