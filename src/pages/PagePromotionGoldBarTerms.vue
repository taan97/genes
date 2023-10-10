<template>
  <LayoutPromotionGoldBar :setups="layoutSetups">
    <div
      class="p-4 m-4 bg-black-opacity-2 backdrop-blur-[5px] border rounded-xl"
    >
      <h1 class="text-orange-1 text-size-6 font-semibold mb-4">
        {{ $t('PagePromotionGoldBarTerms.Title') }}:
      </h1>

      <p class="text-white-1 whitespace-pre-line">
        {{ $t('PagePromotionGoldBarTerms.Content') }}
      </p>

      <BaseFormInputCheckbox
        v-model="termsCheckbox"
        name="terms"
        color="var(--root-orange-1)"
        class="mt-6"
      >
        <p class="text-orange-1">
          {{ $t('PagePromotionGoldBarTerms.AgreeTermsNote') }}
        </p>
      </BaseFormInputCheckbox>
    </div>
  </LayoutPromotionGoldBar>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const termsCheckbox = ref(false)

const layoutSetups = reactive([
  {
    activeIcon: 'active-close',
    inactiveIcon: 'inactive-close',
    active: true,
    label: 'PagePromotionGoldBar.ButtonClose',
    handler: () => {
      router.go(-1)
    }
  },
  {
    activeIcon: 'active-deposit',
    inactiveIcon: 'inactive-deposit',
    active: false,
    label: 'PagePromotionGoldBar.ButtonDeposit',
    handler: () => {}
  },
  {
    activeIcon: 'active-listing',
    inactiveIcon: 'inactive-listing',
    active: false,
    label: 'PagePromotionGoldBar.ButtonListing',
    handler: () => {}
  },
  {
    activeIcon: 'active-confirm',
    inactiveIcon: 'inactive-confirm',
    active: true,
    label: 'PagePromotionGoldBar.ButtonConfirm',
    handler: () => {
      router.push({
        name: 'PagePromotionGoldBarClaimRewardForm',
        query: route.query,
        replace: true
      })
    }
  }
])

watch(
  termsCheckbox,
  (newValue) => {
    const confirmButton = layoutSetups.find(
      (l) => l.activeIcon === 'active-confirm'
    )
    confirmButton.active = newValue
  },
  { immediate: true }
)
</script>

<style scoped></style>
