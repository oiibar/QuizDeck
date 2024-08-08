<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center">Your library</h1>
    <FlashcardList :flashcards="flashcardStore.flashcards" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFlashcardStore } from "~/stores/flashcards";
import FlashcardList from "~/components/Library/FlashcardList.vue";

definePageMeta({
  middleware: ["auth"],
});

const flashcardStore = useFlashcardStore();

onMounted(async () => {
  await flashcardStore.fetchFlashcards();
});
</script>
