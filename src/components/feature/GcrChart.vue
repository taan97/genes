<template>
  <div class="px-1.5 pt-2.5 pb-2">
    <canvas ref="chartRef" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
  Chart,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js'

import { $formatCurrency } from '@/plugins/global-methods'

const props = defineProps({
  dataSets: {
    /**
     * type dataSets = {
     *  date: string[],
     *  price: number[],
     *  nav: number,
     * }
     */
    type: Object,
    required: true
  }
})

Chart.register(
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
)
Chart.defaults.font = { size: 6 }

const config = computed(() => ({
  type: 'line',

  data: {
    labels: [...props.dataSets.date].reverse(),

    datasets: [
      {
        type: 'line',
        borderWidth: 2,
        borderColor: '#00FF2D',
        data: props.dataSets.price,
        pointRadius: 0.5,
        fill: false
      }
    ]
  },

  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#f37021'
        },
        grid: {
          display: false,
          lineWidth: 10,
          borderWidth: 1,
          borderColor: '#f37021'
        }
      },
      y: {
        ticks: {
          color: '#fff',
          callback: (val) => '$' + $formatCurrency(val)
        },
        grid: {
          display: true,
          lineWidth: 1,
          tickWidth: 0,
          color: '#f37021',
          borderDash: [1, 3],
          borderWidth: 1,
          borderColor: '#f37021'
        }
      }
    }
  }
}))

const chartRef = ref(null)
const chart = ref(null)

watch(
  () => config.value,
  async (newValue) => {
    await nextTick()
    chart.value && chart.value.destroy()
    chart.value = new Chart(chartRef.value, newValue)
  },
  { immediate: true }
)
</script>

<style scoped></style>
