/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ['11px', '1rem'],
      sm: ['13px', '1.25rem'],
      base: ['15px', '1.5rem'],
      lg: ['17px', '1.75rem'],
      xl: ['22px', '1.75rem'],
      '2xl': ['25px', '2rem'],
      '3xl': ['32px', '2.25rem'],
      '4xl': ['40px', '2.5rem'],
      '5xl': ['48px', '3rem'],
      '6xl': ['60px', '3.75rem'],
      '7xl': ['72px', '4.5rem'],
      '8xl': ['96px', '6rem'],
      '9xl': ['128px', '8rem'],
    },
    fontFamily: {
      sans: [
        'Apple SD Gothic Neo',
        'Noto Sans CJK KR',
        '맑은 고딕',
        'Malgun Gothic',
        'sans-serif',
      ],
    },
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
