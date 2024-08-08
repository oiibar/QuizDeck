<template>
  <div class="container text-center">
    <h1 class="text-5xl font-bold text-center">Welcome to QuizDeck</h1>
    <p class="text-lg">
      We're glad to have you here. Click the button below to get started!
    </p>
    <div class="flex justify-center items-center gap-4">
      <button
        @click="handleCreate"
        class="bg-blueAc py-2 px-4 rounded-md flex gap-2 items-center"
      >
        <img src="~/assets/create.svg" class="w-6" alt="Create" />
        <p>Create</p>
      </button>
      <button
        @click="handleLibrary"
        class="bg-blueAc py-2 px-4 rounded-md flex gap-2 items-center"
      >
        <img src="~/assets/library.svg" class="w-6" alt="Create" />
        <p>Library</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const handleCreate = () => {
  if (userStore.user) {
    router.push("/edit");
  } else {
    router.push("/auth/login");
  }
};
const handleLibrary = () => {
  if (userStore.user) {
    router.push("/library");
  } else {
    router.push("/auth/login");
  }
};
</script>

<style scoped></style>
