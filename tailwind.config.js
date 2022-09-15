module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryWhite: '#F6F6F6',
        secondaryWhite: '#FFFFFF',
        grayWhite: '#f2f2f2',
        black: '#131313',
        textColor: '#6B6B6D',
        textColor_1: '#585858de',
        textHighlight: '#5c5c5c',
        textDark: '#2e2e2eef',
        btnColor: '#f2c94c',
      },
    },
    screens: {
      xsm: '500px',
      sm: '640px',
      md: '768px',
      mdLg800: '850px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
