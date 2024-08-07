<template>
  <div v-if="flashcards.length" class="flex flex-wrap gap-4 justify-center">
    <Queries />
    <FlashcardItem
      v-for="flashcard in flashcards"
      :key="flashcard.id"
      :flashcard="flashcard"
      @click="navigateToFlashcard(flashcard.id)"
    />
  </div>
  <p v-else>No flashcards added yet</p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import FlashcardItem from "~/components/Library/FlashcardItem.vue";
import Queries from "~/components/Queries.vue";

const props = defineProps({
  flashcards: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["click"]);
const router = useRouter();

const navigateToFlashcard = (id: string) => {
  router.push(`/flashcards/${id}`);
};
</script>
