/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        surface: "#222222",
        "on-surface": "#eeeeee",
      },
    },
  },
  plugins: [],
};
