/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    screens: {
      xs: '376px',
      sm: '480px',
      md: '768px',
      lg: '907px', // Change this to 907px
      xl: '1440px',
      '2xl': '1920px', 
    },
    extend: {
      colors: {
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      fontSize: {
        inputs: '24px',
      },
      fontFamily: {
        body: ['Space Mono', 'monospace'],
      },
      fontWeight: {
        700: '700',
      },
    },
  },
  plugins: [],
}

