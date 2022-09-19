const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryWhite: '#F6F6F6',
        secondaryWhite: '#fcfcfc',
        lightBg: '#fcfcfc',
        black: '#131313',
        textColor: '#6B6B6D',
        btnColor: '#f2c94c',
      },
    },
    screens: {
      xsm: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
});
