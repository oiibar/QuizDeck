<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">Public library</h1>
    <div class="flex flex-col gap-6">
      <LibraryList :flashcards="publicFlashcards" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { flashcardGroups } from "~/types/types";

const flashcardStore = useFlashcardStore();
const publicFlashcards = ref<flashcardGroups[]>([]);

onMounted(async () => {
  await flashcardStore.fetchFlashcards();
  const res = await flashcardStore.fetchPublicFlashcards();
  publicFlashcards.value = res;
});
</script>

<style scoped></style>
