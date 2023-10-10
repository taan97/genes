<template>
  <div
    id="countdown"
    class="relative h-[40px] w-[40px] flex items-center justify-center"
  >
    <div
      id="countdown-number"
      class="z-[1] text-[12px] text-black-2"
    >
      {{ displayCurrentTime }}
    </div>

    <svg class="absolute top-0 left-0 w-[40px] h-[40px]">
      <circle
        r="18"
        cx="20"
        cy="20"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCountDown } from '@vant/use'

const props = defineProps({
  timeLeftInSeconds: {
    type: [String, Number],
    required: true
  },

  timeoutInMinutes: {
    type: Number,
    default: 10
  },

  autoStart: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['finished'])

const totalTimeLeftInMilliseconds = computed(() => {
  return props.timeLeftInSeconds * 1000
})

const currentTimePassedInSeconds = ref('')
const displayCurrentTime = ref('')

const countDown = useCountDown({
  time: totalTimeLeftInMilliseconds.value,

  onChange: ({ minutes, seconds }) => {
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')
    displayCurrentTime.value = `${mm}:${ss}`

    currentTimePassedInSeconds.value =
      (props.timeoutInMinutes - minutes) * 60 - seconds
  },

  onFinish: () => {
    emit('finished')
  }
})

// css variables: start
const portionPassed = computed(() => {
  return currentTimePassedInSeconds.value / (props.timeoutInMinutes * 60)
})

const totalTimeLeftInCssFormat = computed(
  () => totalTimeLeftInMilliseconds.value / 1000 + 's'
)
// css variables: end

props.autoStart && countDown.start()

defineExpose({
  start: countDown.start
})
</script>

<style scoped>
svg {
  transform: rotateY(-180deg) rotateZ(-90deg);
  --radius: 18px;
  --circumference: calc(2 * 3.14 * var(--radius));
}

svg circle {
  stroke-dasharray: var(--circumference);
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: var(--root-green-1);
  fill: var(--root-white-1);
  animation: countdown v-bind(totalTimeLeftInCssFormat) linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: calc(v-bind(portionPassed) * var(--circumference));
  }
  to {
    stroke-dashoffset: var(--circumference);
  }
}
</style>
