const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto', 'serif'],
    },
    extend: {
      colors: {
        primary: '#f76c6c',
        secondary: colors.white,
      },
    },
  },
  variants: {
    extend: {
      placeholderOpacity: ['hover', 'focus'],
      placeholderColor: ['hover', 'focus'],
    },
  },
  plugins: [],
}
