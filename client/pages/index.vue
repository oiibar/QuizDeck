<template>
  <div>
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const login = async () => {
  try {
    await userStore.login({
      username: "oiibar",
      password: "Beaver@4556",
    });

    if (userStore.user) {
      await router.push("/profile");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<style scoped></style>
