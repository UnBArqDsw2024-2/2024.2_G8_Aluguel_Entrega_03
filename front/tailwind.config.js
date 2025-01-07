/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        // Defini a Lato como padrão, de acordo com o Design System
        sans: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
