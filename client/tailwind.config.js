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
      perspective: {
        1000: "1000px",
      },
      rotate: {
        "x-180": "rotateX(180deg)",
      },
      colors: {
        darkBg: "#0A092D",
        blueAc: "#423ED8",
        grayBg: "#2E3856",
        purpleAc: "#A8B1FF",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-x-180": {
          transform: "rotateX(180deg)",
        },
      });
    },
  ],
};
