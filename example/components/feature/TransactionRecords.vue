<template>
  <div class="pb-4">
    <div class="flex justify-end">
      <p class="text-grey-v-2 text-size-2">
        {{
          $t('PageWallet.Transactions', {
            count: props.recordsList.length
          })
        }}
      </p>
    </div>

    <div
      v-for="(item, index) in props.recordsList"
      :key="index"
      class="shadow-inner-dark-v-1 rounded-3xl py-6 px-4 mt-4"
    >
      <div class="flex px-6 gap-2">
        <div class="break-words w-1/2">
          <p class="text-yellow-v-1 font-bold">
            {{ item.balance_type }}
          </p>
          <p>{{ item.act_desc }}</p>
        </div>
        <div class="flex text-end justify-end flex-col">
          <DisplayCurrency :amount="item.amount" />
          <p class="text-size-1 text-grey-v-2">{{ item.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  recordsList: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>

<style scoped></style>
