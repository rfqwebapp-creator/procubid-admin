/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#43624A",
        secondary: "#7A9C83",
        dark: "#2A2A2A",
        light: "#F5F2EA",
      }
    },
  },
  plugins: [],
}