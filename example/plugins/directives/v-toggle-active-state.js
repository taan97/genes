const activeColorsMap = {
  orange: 'btn-active-orange',
  green: 'btn-active-green',
  red: 'btn-active-red',
  blue: 'btn-active-blue'
}

export default {
  name: 'toggleActiveState',

  options: {
    mounted(el, { value: isActive, arg: color }) {
      toggleButtonStyle({ el, isActive, color })
    },

    updated(el, { value: isActive, arg: color }) {
      toggleButtonStyle({ el, isActive, color })
    }
  }
}

function toggleButtonStyle({ el, isActive, color = 'orange' }) {
  el.classList.toggle(activeColorsMap[color], isActive)
  el.classList.toggle('btn-inactive', !isActive)

  const svg = el.querySelector('svg')
  svg?.setAttribute(
    'fill',
    isActive ? 'var(--root-white-v-1)' : 'var(--root-grey-v-1)'
  )
}
