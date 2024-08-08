/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0A092D",
        blueAc: "#423ED8",
        grayBg: "#2E3856",
        purpleAc: "#A8B1FF",
      },
    },
  },
  plugins: [],
};
