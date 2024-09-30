/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#d91717',
        'secondary': '#B42013',
        'accent': '#FBF4F4',
      },
    },
  },
  plugins: [],
};
