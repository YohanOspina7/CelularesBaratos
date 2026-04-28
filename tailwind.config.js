/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  
],
  theme: {

    extend: {
        container: {
            center: true,
            padding: '1rem'
        },
        fontFamily: {
        // 'montserrat' será la clase Tailwind que usarás (font-montserrat)
        'montserrat': ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}