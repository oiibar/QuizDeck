export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  if (!!userStore.user) {
    return await navigateTo("/library");
  }
});
