<template>
  <div class="flex flex-col gap-8">
    <TestItem
      v-for="flashcard in flashcards"
      :key="flashcard.question"
      :flashcard="flashcard"
    />
  </div>
</template>

<script setup lang="ts">
import TestItem from "./TestItem.vue";
import type { Flashcard } from "~/types/types";

const props = defineProps({
  flashcards: {
    type: Array as () => Flashcard[],
    required: true,
  },
});
</script>

<style scoped></style>
