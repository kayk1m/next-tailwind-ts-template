/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        4.5: '18px',
      },
      colors: {
        primary: colors.lightBlue[400],
        'black-opacity-30': '#0000004D',
        lightBlue: colors.lightBlue,
      },
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      textColor: ['disabled', 'focus-visible'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      ringColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringWidth: ['focus-visible'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
