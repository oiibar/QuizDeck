import { useUserStore } from "~/stores/user";

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.profile();
  }
});
