/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: {
          DEFAULT: "#242424",
          light: "#363636",
          dark: "#121212",
        },
        "on-surface": {
          DEFAULT: "#dddddd",
          dark: "#999999",
        },
      },
    },
  },
  plugins: [],
};
