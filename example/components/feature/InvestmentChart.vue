<template>
  <div
    class="col-span-full shadow-inner-dark-v-1 rounded-2.5xl bg-black-v-5 px-1.5 pt-2.5 pb-2"
  >
    <canvas ref="chartRef"></canvas>
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
import { useI18n } from 'vue-i18n'

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
Chart.defaults.color = '#9EA7BB'
Chart.defaults.font = { size: 6 }

const props = defineProps({
  dataSets: {
    /**
     * type dataSets = {
     *  date_at: string[],
     *  balance: number[],
     *  investment: number[],
     *  management: number[],
     * }
     */
    type: Object,
    required: true
  }
})

const { t } = useI18n()

const DAYS_LIMIT = 7

const labels = computed(() => props.dataSets.date_at)

const balance = computed(() =>
  props.dataSets.balance.filter((d, index) => index < DAYS_LIMIT)
)

const investment = computed(() =>
  props.dataSets.investment.filter((d, index) => index < DAYS_LIMIT)
)

const management = computed(() =>
  props.dataSets.management.filter((d, index) => index < DAYS_LIMIT)
)

const config = computed(() => ({
  type: 'line',

  data: {
    labels: labels.value,

    datasets: [
      {
        type: 'line',
        label: t('PageInvestment.ChartNIGTInvestment'),
        backgroundColor: '#DEB311',
        borderWidth: 1,
        borderColor: '#DEB311',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        borderCapStyle: 'round',
        data: balance.value
      },
      {
        type: 'bar',
        label: t('PageInvestment.ChartInvestmentreturn'),
        backgroundColor: '#09B39C',
        barThickness: 8,
        data: investment.value
      },
      {
        type: 'bar',
        label: t('PageInvestment.ChartManagementIncome'),
        backgroundColor: '#5073B8',
        barThickness: 8,
        data: management.value
      }
    ]
  },

  options: {
    scales: {
      x: {
        grid: {
          display: false,
          lineWidth: 10,
          borderWidth: 1,
          borderColor: '#47505E'
        }
      },
      y: {
        grid: {
          display: true,
          lineWidth: 1,
          tickWidth: 0,
          color: '#363E4E',
          borderDash: [1, 3],
          borderWidth: 1,
          borderColor: '#47505E'
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
