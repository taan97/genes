<template>
  <button
    type="button"
    class="bg-black-1 h-[30px] min-w-[92px] overflow-hidden rounded-2xl"
    :class="{
      ' shadow-outer-orange-dark-1': currentInSeconds === props.timeoutInSeconds
    }"
  >
    <div
      v-if="currentInSeconds === props.timeoutInSeconds"
      class="h-full flex items-center justify-center rounded-2xl text-size-3 font-medium text-orange-1 border-gradient-1"
      @click="onClick"
    >
      {{ $t('Button.GetCode') }}
    </div>
    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-black-2 cursor-not-allowed text-red-2"
    >
      {{ currentInSeconds + 1 + 's' }}
    </div>
  </button>
</template>

<script>
const TOTAL_COUNTDOWN_IN_SECONDS = 60
</script>

<script setup>
import { ref } from 'vue'
import { useCountDown } from '@vant/use'
import AuthService from '@/services/auth-service'

const props = defineProps({
  timeoutInSeconds: {
    type: Number,
    default: TOTAL_COUNTDOWN_IN_SECONDS
  },

  email: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'clicked',
  'started',
  'finished',
  'empty-email-detected'
])

const currentInSeconds = ref(props.timeoutInSeconds)

const countDown = useCountDown({
  time: props.timeoutInSeconds * 1000,

  onChange: ({ seconds }) => {
    currentInSeconds.value = seconds
  },

  onFinish: () => {
    currentInSeconds.value = props.timeoutInSeconds
    emit('finished')
    countDown.reset()
  }
})

async function onClick() {
  emit('clicked', () => {
    countDown.start()
  })

  if (!props.email) return emit('empty-email-detected')

  try {
    await AuthService.sendCodeToEmail(props.email, props.type)

    countDown.start()
    emit('started')
  } catch {}
}
</script>

<style scoped></style>
