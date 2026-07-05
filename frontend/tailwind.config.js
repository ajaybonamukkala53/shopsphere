/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Add this

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        flipkartBlue: "#2874f0",
        flipkartOrange: "#fb641b",
        flipkartYellow: "#ff9f00",
        flipkartBg: "#f1f2f6",
        flipkartGreen: "#388e3c",
      },
    },
  },

  plugins: [],
}