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
        },
        "on-surface": {
          DEFAULT: "#eeeeee",
          dark: "#999999",
        },
      },
    },
  },
  plugins: [],
};
