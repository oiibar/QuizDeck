<template>
  <header class="p-8 bg-yellow-600">
    <nav class="flex gap-4 justify-center items-center container">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/library">Library</NuxtLink>

      <template v-if="userStore.user">
        <NuxtLink to="/profile">Profile</NuxtLink>
        <button @click="signout">Logout</button>
      </template>
      <template v-else>
        <NuxtLink to="/auth/signup">Sign Up</NuxtLink>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const signout = () => {
  userStore.logout();
  router.push("/auth/login");
};
</script>

<style scoped></style>
