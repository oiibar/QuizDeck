/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {}
    },

    plugins: { tailwindcss: {}, autoprefixer: {} }
  }
}
