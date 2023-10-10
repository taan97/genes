<template>
  <button
    type="button"
    class="h-[25px] min-w-[68px] rounded-md overflow-hidden text-white-v-1"
  >
    <div
      v-if="currentInSeconds === props.timeoutInSeconds"
      class="w-full h-full flex items-center justify-center bg-gradient-orange"
      :class="{
        'pointer-events-none bg-gradient-dark text-grey-v-2': disabled
      }"
      @click="onClick"
    >
      {{ $t('Button.GetCode') }}
    </div>
    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-gradient-dark cursor-not-allowed"
    >
      {{ currentInSeconds + 1 }}s
    </div>
  </button>
</template>

<script>
const TOTAL_COUNTDOWN_IN_SECONDS = 60
</script>

<script setup>
import { computed, ref } from 'vue'
import { useCountDown } from '@vant/use'
import AuthService from '@/services/auth-service'

const props = defineProps({
  timeoutInSeconds: {
    type: Number,
    default: TOTAL_COUNTDOWN_IN_SECONDS
  },

  email: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['started', 'finished', 'empty-email-detected'])

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

const disabled = computed(() => !props.email)

async function onClick() {
  if (!props.email) return emit('empty-email-detected')

  try {
    await AuthService.sendCodeToEmail(props.email, props.type)

    countDown.start()
    emit('started')
  } catch {}
}
</script>

<style scoped></style>
