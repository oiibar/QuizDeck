import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {};

  nuxtApp.vueApp.use(Toast, options);
});
