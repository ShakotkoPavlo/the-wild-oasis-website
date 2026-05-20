/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e1e8ef",
          100: "#d4dee7",
          200: "#b7c7d7",
          300: "#99b0c7",
          400: "#7c99b6",
          500: "#5e82a6",
          600: "#4c6b8a",
          700: "#3c546c",
          800: "#2c3d4f",
          900: "#1b2631",
          950: "#141c24",
        },
        accent: {
          50: "#faf5f0",
          100: "#f4ece1",
          200: "#e8d6bf",
          300: "#ddc2a2",
          400: "#d2af84",
          500: "#c69963",
          600: "#b78343",
          700: "#926835",
          800: "#6c4d28",
          900: "#4b351b",
          950: "#382814",
        },
      },
    },
  },
  plugins: [],
};
