/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('../public/live.jpg')"
      },
      colors: {
        "back": "#E4DDD4",
        "main": "#263165",
        "accent": "#F6B968",
        "instagram": "#c13584",
        "matching": '#6390CB'
      },
    },
    plugins: [require("tw-elements/dist/plugin.cjs")],
  }
}
