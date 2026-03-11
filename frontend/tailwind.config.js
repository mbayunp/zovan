/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        geoTeal: '#146C72',
        geoOrange: '#F7941D',
        geoOrangeDark: '#F36F21',
        geoGreen: '#2E7D32',
        geoGray: '#F4F6F7',
      }
    },
  },
  plugins: [],
}