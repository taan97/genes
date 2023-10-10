/* eslint-env node */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-1': 'var(--root-white-1)',
        'white-2': 'var(--root-white-2)',

        'black-opacity-1': 'var(--root-black-opacity-1)',
        'black-opacity-2': 'var(--root-black-opacity-2)',
        'black-opacity-3': 'var(--root-black-opacity-3)',

        'black-1': 'var(--root-black-1)',
        'black-2': 'var(--root-black-2)',

        'orange-1': 'var(--root-orange-1)',
        'orange-2': 'var(--root-orange-2)',
        'orange-3': 'var(--root-orange-3)',

        'yellow-1': 'var(--root-yellow-1)',

        'red-1': 'var(--root-red-1)',
        'red-2': 'var(--root-red-2)',

        'pink-1': 'var(--root-pink-1)',

        'green-1': 'var(--root-green-1)',
        'green-2': 'var(--root-green-2)',
        'green-3': 'var(--root-green-3)',

        'grey-1': 'var(--root-grey-1)',
        'grey-2': 'var(--root-grey-2)',
        'grey-3': 'var(--root-grey-3)',
        'grey-4': 'var(--root-grey-4)',
        'grey-5': 'var(--root-grey-5)',

        'opacity-1': 'var(--root-opacity-1)'
      },
      fontSize: {
        'size-1': 'var(--root-size-1)',
        'size-2': 'var(--root-size-2)',
        'size-3': 'var(--root-size-3)',
        'size-4': 'var(--root-size-4)',
        'size-5': 'var(--root-size-5)',
        'size-6': 'var(--root-size-6)',
        'size-7': 'var(--root-size-7)',
        'size-8': 'var(--root-size-8)',
        'size-9': 'var(--root-size-9)'
      },
      backgroundImage: {
        'gradient-white':
          'linear-gradient(to right, red, rgba(0, 0, 0, 0)) 1 100%',
        'gradient-dark':
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, #15191C 100%)',
        'gradient-brown':
          'linear-gradient(180deg, #FBF3AC 0%, #DBC230 25.85%, #BE9246 50.15%, #AC772C 69.71%, #CEA342 92.61%, #F8D95E 100%)'
      },
      boxShadow: {
        'outer-orange-dark-1':
          '-5px -5px 6px 0 #FF8A00, 5px 5px 6px 0 rgba(21,25,28,0.45)',
        'outer-orange-dark-2':
          '0px 0px 12px 7px #FF8A00, 5px 5px 6px 0 rgba(21,25,28,0.45)',
        'inner-orange-1':
          'inset 0 2px 1px 0 rgba(21,25,28,0.23), inset -2px -1px 4px 0 rgba(21,25,28,0.22), inset 2px 1px 2px 0 rgba(21,25,28,0.44)',
        'light-yellow-1':
          'inset -1px -1px 0 0 rgba(0,0,0,0.5), -2px -2px 4px 0 #FFD900, 2px 2px 4px 0 #FED900'
      },
      screens: {
        tiny: '321px'
      }
    }
  },
  plugins: []
}
