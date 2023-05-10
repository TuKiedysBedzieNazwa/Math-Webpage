/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
        '3xl': '1700px',
      },
      center: true,
    },
    extend: {
      colors:{
        // 'bg': '#EDA12F'
      },
      height:{
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '8vh': '800vh',
        '2vh': '200vh'
      },
      width:{
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem'
      },
      spacing:{
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '156': '39rem',
        '160': '40rem',
        '164': '41rem',
        '172': '43rem',
        '176': '44rem',
        '192': '48rem',
        '1vh': '100vh',
        '3vh': '300vh',
        '0.5vh': '50vh',
        '3.5vh': '350vh',
        '4vh': '400vh'
      },

    },
  },
  plugins: [],
}