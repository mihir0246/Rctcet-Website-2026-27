const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #B8806A 0%, #6E9F9F 50%, #CDE3E2 100%)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          hover: 'rgb(var(--primary-hover) / <alpha-value>)',
          light: 'rgb(var(--primary-light) / <alpha-value>)',
        },
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        'header-end': 'rgb(var(--header-end) / <alpha-value>)',
        'footer-start': 'rgb(var(--footer-start) / <alpha-value>)',
        'footer-end': 'rgb(var(--footer-end) / <alpha-value>)',
        'avenue-grad-start': 'rgb(var(--avenue-grad-start) / <alpha-value>)',
        'avenue-grad-end': 'rgb(var(--avenue-grad-end) / <alpha-value>)',
        'avenue-btn': 'rgb(var(--avenue-btn) / <alpha-value>)',
        'avenue-card': 'rgb(var(--avenue-card) / <alpha-value>)',
        'avenue-border': 'rgb(var(--avenue-border) / <alpha-value>)',
        'avenue-active': 'rgb(var(--avenue-active) / <alpha-value>)',
        'achievement-bg': 'rgb(var(--achievement-bg) / <alpha-value>)',
        'magazine-bg': 'rgb(var(--magazine-bg) / <alpha-value>)',
        'layout-bg': 'rgb(var(--layout-bg) / <alpha-value>)',
      },
      keyframes: {
        slider: {
          'from': { transform: 'translateX(40px)' },
          'to': { transform: 'translateX(-2188px)' },
        },
        slider_mobile: {
          'from': { transform: 'translateX(40px)' },
          'to': { transform: 'translateX(-1935px)' },
        },
      },
      animation: {
        slider: 'slider 30s linear infinite',
        slider_mobile: 'slider_mobile 30s linear infinite',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xs': '425px',
        'xxl': '1680px',
        'xxl2': '2800px',
      },
    },
  },
  plugins: [],
}
