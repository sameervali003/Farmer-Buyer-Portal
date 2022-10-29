/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'md': '980px',
      '2xs': '250px',
      'xs': '300px',
      'sm': '420px',
      '2sm': '700px',
    }
  },
  plugins: [],
}
