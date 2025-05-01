/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bce1fd',
          300: '#8acefb',
          400: '#54b6f8',
          500: '#2b9af1',
          600: '#1a7cdd',
          700: '#1665bd',
          800: '#17559b',
          900: '#19487e',
          950: '#132d4d',
        },
        sand: {
          50: '#fbf9f2',
          100: '#f7f3e4',
          200: '#eee7c9',
          300: '#e2d5a3',
          400: '#d4bd78',
          500: '#c7a455',
          600: '#b78b45',
          700: '#97703a',
          800: '#7b5c35',
          900: '#654b2f',
          950: '#36271a',
        },
        cream: '#FCFAF8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-75': '75vh',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};