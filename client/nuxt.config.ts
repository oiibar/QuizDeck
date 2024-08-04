export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },
  routeRules: {
    "/": { prerender: true },
    "/api/*": { cache: { maxAge: 60 * 60 } },
  },
  devtools: { enabled: true },
  css: ["~/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
