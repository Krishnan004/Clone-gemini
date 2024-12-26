/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          Poppins: [ 'Poppins', 'sans-serif'],
        },
      keyframes:{
        typing:{
          'from':{width:'0%'},
          'to':{width:'100%'},
        },
        loading: {
          '0%': { backgroundPosition: '-800px 0px' },
          '100%': { backgroundPosition: '800px 0px' },
        },
      },
      animation:{
        typing: 'typing 1s steps(30, end)  both',
        loading: 'loading 2s linear infinite '
      }
    },
  },
  plugins: [],
}