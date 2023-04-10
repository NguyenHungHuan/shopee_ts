// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        'footer-registered': `url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/3ce17addcf90b8cd3952b8ae0ffc1299.png')`,
        'bg-social': `url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/cab134ca96b0829b591cfaff892ae62c.png')`
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          minWidth: '1200px',
          width: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px'
        }
      })
    })
  ]
}
