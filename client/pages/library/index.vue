<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">Your library</h1>
    <div class="flex flex-col gap-6">
      <LibraryList :flashcards="userFlashcards" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { flashcardGroups } from "~/types/types";

const flashcardStore = useFlashcardStore();
const userFlashcards = ref<flashcardGroups[]>([]);

onMounted(async () => {
  await flashcardStore.fetchFlashcards();
  userFlashcards.value = flashcardStore.flashcards;
});
</script>
