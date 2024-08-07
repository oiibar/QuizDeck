<template>
  <div
    class="flex flex-col gap-8 items-center container justify-center h-screen"
  >
    <h1 class="title">Welcome to QuizDeck</h1>
    <p class="text-lg">
      We're glad to have you here. Click the button below to get started!
    </p>
    <button
      @click="handleClick"
      class="bg-blueAc py-2 px-4 rounded-md flex gap-2 items-center"
    >
      <img src="~/assets/create.svg" class="w-6" alt="Create" />
      <p>Generate</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "#app";

const userStore = useUserStore();
const router = useRouter();

const handleClick = () => {
  if (userStore.user) {
    router.push("/flashcards/edit");
  } else {
    router.push("/auth/login");
  }
};
</script>

<style scoped></style>
