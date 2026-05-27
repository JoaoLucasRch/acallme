/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#ffffff',
          babyBlue: '#e6f2fc',
          softGray: '#b8cce4',
          mediumGray: '#8196b1',
          mediumBlue: '#8fbdf1',
          accentBlue: '#6AD8FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
