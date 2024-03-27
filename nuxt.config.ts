// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["~/stores"],
  },
  css: ["~/assets/css/globals.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      IMAGE_UPLOAD_URL: process.env.IMAGE_UPLOAD_URL,
    }
  },
})