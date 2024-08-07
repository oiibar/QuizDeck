<template>
  <header
    class="flex justify-between items-center font-bold p-4 bg-slate-800 shadow-md"
  >
    <NuxtLink to="/" class="text-2xl">QuizDeck</NuxtLink>

    <nav class="flex gap-10">
      <NuxtLink
        to="/"
        class="hover:border-b-2 hover:border-purpleAc py-1 transition-all duration-100"
        exact-active-class="border-b-2 border-purpleAc"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/library"
        class="hover:border-b-2 hover:border-purpleAc py-1 transition-all duration-100"
        exact-active-class="border-b-2 border-purpleAc"
      >
        Library
      </NuxtLink>
    </nav>

    <div v-if="userStore.user" class="flex gap-4">
      <div
        class="w-10 h-10 flex items-center justify-center rounded-full bg-purpleAc cursor-pointer"
        @click="navigateToProfile"
      >
        {{ userStore.user.username.charAt(0).toUpperCase() }}
      </div>

      <button
        @click="signout"
        class="bg-red-500 py-1 px-3 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Logout
      </button>
    </div>

    <div v-else class="flex gap-4">
      <NuxtLink to="/auth/signup" class="bg-blueAc py-2 px-3 rounded-md"
        >Sign Up</NuxtLink
      >

      <NuxtLink to="/auth/login" class="bg-blueAc py-2 px-3 rounded-md"
        >Login</NuxtLink
      >
    </div>
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

const navigateToProfile = () => {
  router.push("/profile");
};
</script>

<style scoped></style>
