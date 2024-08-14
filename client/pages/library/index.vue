<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">Your library</h1>
    <div class="flex flex-col gap-6">
      <FlashcardList :flashcards="userFlashcards" />
      <FlashcardList :flashcards="publicFlashcards" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFlashcardStore } from "~/stores/flashcards";
import FlashcardList from "~/components/Library/FlashcardList.vue";

const flashcardStore = useFlashcardStore();
const userFlashcards = ref<Flashcard[]>([]);
const publicFlashcards = ref<Flashcard[]>([]);

onMounted(async () => {
  await flashcardStore.fetchFlashcards();
  userFlashcards.value = flashcardStore.flashcards;

  publicFlashcards.value = await flashcardStore.fetchPublicFlashcards();
});
</script>
