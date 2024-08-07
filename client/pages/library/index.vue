<template>
  <div class="flex flex-col gap-8 container h-screen pt-16">
    <h1 class="title">Your library</h1>
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
