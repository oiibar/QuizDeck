<template>
  <div>
    <div class="flex flex-wrap gap-4 justify-center">
      <LibraryQueries @search="handleSearch" @sort="handleSort" />

      <div v-if="filteredFlashcards.length" class="flex flex-wrap gap-4 w-full">
        <LibraryItem
          v-for="item in filteredFlashcards"
          :key="item.id"
          :flashcard="item"
          @click="showModeSelector(item.id)"
        />
      </div>

      <p v-else class="text-center text-lg font-medium mt-8">
        No flashcards found
      </p>
    </div>

    <ModeSelectorModal
      :visible="isModalVisible"
      @close="closeModal"
      @choose="navigateToMode"
    />
  </div>
</template>

<script setup lang="ts">
import type { flashcardGroups } from "~/types/types";

const props = defineProps<{
  flashcards: flashcardGroups[];
}>();

const { flashcards } = props;
const searchQuery = ref("");
const selectedSort = ref("relevance");
const isModalVisible = ref(false);
const currentFlashcardId = ref<number | null>(null);

const filteredFlashcards = computed(() => {
  const searchFiltered = props.flashcards.filter((flashcard) =>
    flashcard.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  const pinnedFlashcards = searchFiltered.filter(
    (flashcard) => flashcard.pinned
  );
  const nonPinnedFlashcards = searchFiltered.filter(
    (flashcard) => !flashcard.pinned
  );

  const sortFlashcards = (flashcardsToSort: flashcardGroups[]) => {
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

const showModeSelector = (id: number) => {
  currentFlashcardId.value = id;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const navigateToMode = (mode: string) => {
  if (currentFlashcardId.value) {
    const route =
      mode === "test"
        ? `/test/${currentFlashcardId.value}`
        : `/flashcards/${currentFlashcardId.value}`;
    navigateTo(route);
  }
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleSort = (sort: string) => {
  selectedSort.value = sort;
};
</script>
