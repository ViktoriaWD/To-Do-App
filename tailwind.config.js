/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
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
        brightBlue: 'hsl(220, 98%, 61%)', // Main Background: hsl(220, 98%, 61%)
        checkBackgroundLinearGgradient1: 'hsl(192, 100%, 67%)',
        checkBackgroundLinearGgradient2:  'hsl(280, 87%, 65%)',
        //light theme
        veryLightGray: 'hsl(0, 0%, 98%)',
        veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
        lightGrayishBlue: 'hsl(233, 11%, 84%)',
        darkGrayishBlue: 'hsl(236, 9%, 61%)',
        veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
        //dark theme
        veryDarkBlue: 'hsl(235, 21%, 11%)',
        veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
        lightGrayishBlue: 'hsl(234, 39%, 85%)',
        lightGrayishBlueHover: 'hsl(236, 33%, 92%)',
        darkGrayishBlue: 'hsl(234, 11%, 52%)',
        veryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
        veryDarkGrayishBlue: 'hsl(237, 14%, 26%)',
    
      },
      fontSize: {
        inputs: '18px',
      },
      fontFamily: {
        body: ['Josefin Sans', 'sans-serif'],
      },
      fontWeight: {
        700: '700',
        400: '400',
      },
    },
  },
  plugins: [],
}

