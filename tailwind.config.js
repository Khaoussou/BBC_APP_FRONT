/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundColor: {
        'gradient' : 'linear-gradient(rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))'
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
