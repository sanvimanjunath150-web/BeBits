/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitsBlue: '#0A2540',
        bitsGrey: '#F5F7FA',
        bitsAction: '#0070F3'
      }
    },
  },
  plugins: [],
}
