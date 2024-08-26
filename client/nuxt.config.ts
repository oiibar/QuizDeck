export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  plugins: ["@/plugins/toastification"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  css: ["@/main.css"],
  typescript: {
    typeCheck: true,
    strict: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
