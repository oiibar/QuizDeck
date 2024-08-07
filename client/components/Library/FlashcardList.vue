<template>
  <div class="">
    <div v-if="loading" class="flex justify-center items-center"></div>

    <div v-else class="flex flex-wrap gap-4 justify-center">
      <Queries @search="handleSearch" @sort="handleSort" />

      <div v-if="filteredFlashcards.length" class="flex flex-wrap gap-4 w-full">
        <FlashcardItem
          v-for="flashcard in filteredFlashcards"
          :key="flashcard.id"
          :flashcard="flashcard"
          @click="navigateToFlashcard(flashcard.id)"
        />
      </div>

      <p v-else class="text-center text-lg font-medium mt-8">
        No flashcards found
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import FlashcardItem from "~/components/Library/FlashcardItem.vue";
import Queries from "~/components/Library/Queries.vue";

const props = defineProps({
  flashcards: {
    type: Array,
    required: true,
  },
});

const loading = ref(true);
const flashcards = ref(props.flashcards);
const searchQuery = ref("");
const selectedSort = ref("relevance");
const router = useRouter();

const filteredFlashcards = computed(() => {
  const searchFiltered = flashcards.value.filter((flashcard) =>
    flashcard.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const pinnedFlashcards = searchFiltered.filter(
    (flashcard) => flashcard.pinned
  );
  const nonPinnedFlashcards = searchFiltered.filter(
    (flashcard) => !flashcard.pinned
  );

  const sortFlashcards = (flashcardsToSort: Flashcard[]) => {
    return flashcardsToSort.sort((a, b) => {
      switch (selectedSort.value) {
        case "date-desc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "date-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const sortedPinnedFlashcards = sortFlashcards(pinnedFlashcards);
  const sortedNonPinnedFlashcards = sortFlashcards(nonPinnedFlashcards);

  return [...sortedPinnedFlashcards, ...sortedNonPinnedFlashcards];
});

const navigateToFlashcard = (id: string) => {
  router.push(`/flashcards/${id}`);
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleSort = (sort: string) => {
  selectedSort.value = sort;
};

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  flashcards.value = props.flashcards;
  loading.value = false;
});
</script>
