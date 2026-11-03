/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          'gold-dark': '#aa820a',
          noir: '#0a0a0c',
          card: '#121217',
          border: '#23232c',
          bronze: '#b76e79',
          cream: '#fbfbf8'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
